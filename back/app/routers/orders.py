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
def checkout(payment: dict, db: Session = Depends(get_db), current_user: models.User = Depends(auth_module.get_current_user)):
    user_id = getattr(current_user, "id", 1)
    order = crud.create_order_from_cart(db, user_id, payment)
    if not order:
        raise HTTPException(status_code=400, detail="Could not create order")
    return {"order_id": order.id, "total_paid": order.total, "status": order.status, "payment_reference": order.payment_reference}


@router.get("/orders/{order_id}", response_model=schemas.OrderDetailOut)
def order_detail(order_id: int, db: Session = Depends(get_db), current_user: models.User = Depends(auth_module.get_current_user)):
    order_info = crud.get_order_detail(db, order_id)
    if not order_info:
        raise HTTPException(status_code=404, detail="Order not found")
    order, items = order_info
    if order.user_id != current_user.id and getattr(current_user, "role", "cliente") != "admin":
        raise HTTPException(status_code=403, detail="Not allowed")
    out_items = [{"name": it.name, "price": it.price, "quantity": it.quantity} for it in items]
    return schemas.OrderDetailOut(id=order.id, total=order.total, status=order.status, payment_method=None, created_at=order.created_at, items=out_items)


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
    if o.user_id != current_user.id and getattr(current_user, 'role', 'cliente') != 'admin':
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


@router.get("/orders", response_model=list[schemas.OrderOut])
def list_orders(db: Session = Depends(get_db), current_user: models.User = Depends(auth_module.get_current_user)):
    user_id = getattr(current_user, "id", 1)
    orders = crud.list_orders(db, user_id)
    out = []
    for o in orders:
        items = []
        for oi in db.query(models.OrderItem).filter(models.OrderItem.order_id == o.id).all():
            items.append(schemas.OrderItemOut(product=oi.name, quantity=oi.quantity))
        out.append(schemas.OrderOut(id=o.id, date=o.created_at, total=o.total, status=o.status, items=items))
    return out
