from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

import schemas, crud, models
import auth as auth_module
from database import SessionLocal

router = APIRouter(prefix="/api", tags=["orders"])


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


@router.post("/shipping/calculate", response_model=schemas.ShippingCalcOut)
def shipping_calculate(payload: schemas.ShippingCalcIn, db: Session = Depends(get_db)):
    cost, days = crud.simulate_shipping_cost(payload.postal_code, [it.dict() for it in payload.items])
    return schemas.ShippingCalcOut(shipping_cost=cost, estimated_days=days)


@router.post("/contact", response_model=dict)
def contact(payload: schemas.ContactIn, db: Session = Depends(get_db)):
    obj = crud.save_contact_message(db, payload)
    return {"message": "Mensaje recibido, gracias por contactarnos.", "status": "sent"}


@router.post("/cart/checkout", response_model=dict)
def checkout(payment: dict, user_id: int | None = None, db: Session = Depends(get_db), current_user: models.User = Depends(auth_module.get_current_user)):
    target_user_id = user_id if user_id is not None else getattr(current_user, "id", None)
    if target_user_id is None:
        raise HTTPException(status_code=400, detail="No target user specified")
    # only admin/cajero may checkout for a different user; cliente only for own cart
    if getattr(current_user, "role", "cliente") not in ("admin", "cajero") and current_user.id != target_user_id:
        raise HTTPException(status_code=403, detail="Forbidden")
    order = crud.create_order_from_cart(db, target_user_id, payment)
    if not order:
        raise HTTPException(status_code=400, detail="Could not create order")
    return {"order_id": order.id, "total_paid": order.total, "status": order.status, "payment_reference": getattr(order, "payment_reference", None)}
# ...existing code...

@router.get("/orders", response_model=list[schemas.OrderOut])
def list_orders(db: Session = Depends(get_db), current_user: models.User = Depends(auth_module.get_current_user)):
    # cajero/admin/delivery can list all orders; others see only their own
    role = getattr(current_user, "role", "cliente")
    if role in ("admin", "cajero", "delivery"):
        orders_q = db.query(models.Order).order_by(models.Order.created_at.desc()).all()
    else:
        user_id = getattr(current_user, "id", None)
        if user_id is None:
            raise HTTPException(status_code=400, detail="No user id available")
        orders_q = db.query(models.Order).filter(models.Order.user_id == user_id).order_by(models.Order.created_at.desc()).all()

    out: list[schemas.OrderOut] = []
    for o in orders_q:
        oi_list = db.query(models.OrderItem).filter(models.OrderItem.order_id == o.id).all()
        items = [schemas.OrderItemOut(product=it.name, quantity=it.quantity) for it in oi_list]
        subtotal = getattr(o, "subtotal", None)
        if subtotal is None:
            subtotal = sum(getattr(it, "subtotal", (getattr(it, "price", 0) * getattr(it, "quantity", 0))) for it in oi_list)
        out.append(schemas.OrderOut(id=o.id, date=o.created_at, total=getattr(o, "total", 0), status=o.status, items=items, subtotal=subtotal))
    return out

@router.get("/orders/track/{order_id}", response_model=schemas.TrackOut)
def track_order(order_id: int, db: Session = Depends(get_db)):
    # simulated tracking
    order = db.query(models.Order).filter(models.Order.id == order_id).first()
    if not order:
        raise HTTPException(status_code=404, detail="Order not found")
    items = [{"name": oi.name, "qty": oi.quantity} for oi in db.query(models.OrderItem).filter(models.OrderItem.order_id == order.id).all()]
    return schemas.TrackOut(order_id=order.id, status=order.status, last_update=order.created_at, estimated_delivery="30 mins", items=items)


@router.post("/orders/{order_id}/issue-receipt", response_model=dict)
def issue_receipt(order_id: int, db: Session = Depends(get_db), current_user: models.User = Depends(auth_module.get_current_user)):
    order = db.query(models.Order).filter(models.Order.id == order_id).first()
    if not order:
        raise HTTPException(status_code=404, detail="Order not found")
    # simulate
    return {"order_id": order.id, "status": "Pago Aceptado", "receipt_number": f"B-{order.id}"}


@router.post('/orders/{order_id}/cancel', response_model=dict)
def user_cancel_order(order_id: int, db: Session = Depends(get_db), current_user: models.User = Depends(auth_module.get_current_user)):
    o = db.query(models.Order).filter(models.Order.id == order_id).first()
    if not o:
        raise HTTPException(status_code=404, detail='Order not found')
    # allow owner, admin or cajero to cancel
    if o.user_id != current_user.id and getattr(current_user, 'role', 'cliente') not in ('admin', 'cajero'):
        raise HTTPException(status_code=403, detail='Not allowed')
    # only allow cancel if status is not delivered or cancelled
    if o.status in ('delivered', 'cancelled'):
        raise HTTPException(status_code=400, detail='Cannot cancel this order')
    o = crud.cancel_order(db, o)
    return {"message": f"Order {o.id} cancelled"}


@router.put('/orders/{order_id}/cook', response_model=dict)
def send_to_cook(order_id: int, db: Session = Depends(get_db), admin: models.User = Depends(auth_module.get_current_user)):
    # allow admin or kitchen roles to change status to cooking
    if getattr(admin, 'role', 'cliente') not in ('admin', 'cajero'):
        raise HTTPException(status_code=403, detail='Admin/Cashier privileges required')
    o = db.query(models.Order).filter(models.Order.id == order_id).first()
    if not o:
        raise HTTPException(status_code=404, detail='Order not found')
    o.status = 'in_kitchen'
    db.add(o)
    db.commit()
    db.refresh(o)
    return {"order_id": o.id, "status": o.status}


@router.put('/orders/{order_id}/dispatch', response_model=dict)
def mark_as_dispatched(order_id: int, db: Session = Depends(get_db), admin: models.User = Depends(auth_module.get_current_user)):
    # allow dispatching by admin or delivery role
    if getattr(admin, 'role', 'cliente') not in ('admin', 'delivery', 'cajero'):
        raise HTTPException(status_code=403, detail='Not allowed')
    o = db.query(models.Order).filter(models.Order.id == order_id).first()
    if not o:
        raise HTTPException(status_code=404, detail='Order not found')
    o.status = 'dispatched'
    # simulate delivery time
    delivery_time = '20:45'
    db.add(o)
    db.commit()
    db.refresh(o)
    return {"order_id": o.id, "status": o.status, "delivery_time": delivery_time}



@router.get('/delivery/status/{address}', response_model=dict)
def delivery_status(address: str):
    # simple simulated availability by hash of address length
    available = len(address) % 2 == 0
    est = 30 if available else 99
    return {"address": address, "available": available, "estimated_time": est}


