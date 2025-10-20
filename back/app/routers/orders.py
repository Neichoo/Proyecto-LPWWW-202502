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


@router.post("/cart/checkout", response_model=dict)
def checkout(payment: dict, db: Session = Depends(get_db), current_user: models.User = Depends(auth_module.get_current_user)):
    user_id = getattr(current_user, "id", 1)
    order = crud.create_order_from_cart(db, user_id, payment)
    if not order:
        raise HTTPException(status_code=400, detail="Could not create order")
    return {"order_id": order.id, "total_paid": order.total, "status": order.status, "payment_reference": order.payment_reference}


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
