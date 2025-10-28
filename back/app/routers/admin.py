from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.orm import Session

import schemas, crud, models
from database import SessionLocal
import auth as auth_module

router = APIRouter(prefix="/api/admin", tags=["admin"])


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


def require_admin(user: models.User = Depends(auth_module.get_current_user)):
    if getattr(user, "role", "cliente") != "admin":
        raise HTTPException(status_code=403, detail="Admin privileges required")
    return user


@router.get("/users", response_model=list[schemas.UserOut])
def list_users(role: str | None = None, search: str | None = None, page: int = Query(1, ge=1), db: Session = Depends(get_db), admin: models.User = Depends(require_admin)):
    skip = (page - 1) * 20
    users = crud.list_users(db, role=role, search=search, skip=skip, limit=20)
    return users


@router.get("/users/{user_id}", response_model=schemas.UserOut)
def get_user(user_id: int, db: Session = Depends(get_db), admin: models.User = Depends(require_admin)):
    u = crud.get_user_by_id(db, user_id)
    if not u:
        raise HTTPException(status_code=404, detail="User not found")
    return u


@router.post("/users", response_model=schemas.UserOut)
def create_user(user_in: dict, db: Session = Depends(get_db), admin: models.User = Depends(require_admin)):
    u = crud.create_user_admin(db, user_in)
    return u


@router.put("/users/{user_id}", response_model=schemas.UserOut)
def update_user(user_id: int, changes: dict, db: Session = Depends(get_db), admin: models.User = Depends(require_admin)):
    u = crud.get_user_by_id(db, user_id)
    if not u:
        raise HTTPException(status_code=404, detail="User not found")
    return crud.update_user_admin(db, u, changes)


@router.delete("/users/{user_id}", status_code=204)
def delete_user(user_id: int, db: Session = Depends(get_db), admin: models.User = Depends(require_admin)):
    u = crud.get_user_by_id(db, user_id)
    if not u:
        raise HTTPException(status_code=404, detail="User not found")
    crud.delete_user_admin(db, u)
    return None


@router.get("/user-roles", response_model=list[str])
def list_roles(admin: models.User = Depends(require_admin)):
    return ["admin", "cajero", "delivery", "cliente"]


@router.get("/orders", response_model=list[dict])
def admin_list_orders(status: str | None = None, db: Session = Depends(get_db), admin: models.User = Depends(require_admin)):
    orders = crud.list_all_orders(db, status=status)
    return [{"id": o.id, "status": o.status, "order_details_url": f"/api/admin/orders/{o.id}"} for o in orders]



@router.get('/orders/pending', response_model=list[dict])
def admin_list_pending(db: Session = Depends(get_db), admin: models.User = Depends(require_admin)):
    orders = crud.list_all_orders(db, status='pending_payment')
    return [{"id": o.id, "status": o.status, "order_details_url": f"/api/admin/orders/{o.id}"} for o in orders]


@router.get("/orders/{order_id}", response_model=dict)
def admin_order_detail(order_id: int, db: Session = Depends(get_db), admin: models.User = Depends(require_admin)):
    o, items = crud.get_order_detail(db, order_id)
    if not o:
        raise HTTPException(status_code=404, detail="Order not found")
    return {"id": o.id, "status": o.status, "user": crud.get_user(db, o.user_id).username if crud.get_user(db, o.user_id) else None, "items": [{"name": it.name, "qty": it.quantity} for it in items]}


@router.put("/orders/{order_id}/status", response_model=dict)
def admin_update_order_status(order_id: int, payload: dict, db: Session = Depends(get_db), admin: models.User = Depends(require_admin)):
    o = db.query(models.Order).filter(models.Order.id == order_id).first()
    if not o:
        raise HTTPException(status_code=404, detail="Order not found")
    o = crud.update_order_status(db, o, payload.get("status"))
    return {"id": o.id, "status": o.status}


@router.post("/orders/{order_id}/cancel", response_model=dict)
def admin_cancel_order(order_id: int, db: Session = Depends(get_db), admin: models.User = Depends(require_admin)):
    o = db.query(models.Order).filter(models.Order.id == order_id).first()
    if not o:
        raise HTTPException(status_code=404, detail="Order not found")
    o = crud.cancel_order(db, o)
    return {"message": f"Pedido {o.id} cancelado."}


@router.get("/products", response_model=list[dict])
def admin_list_products(db: Session = Depends(get_db), admin: models.User = Depends(require_admin)):
    prods = crud.list_products_admin(db)
    return [{"id": p.id, "name": p.title, "price": p.price, "is_available": p.is_available} for p in prods]


@router.post("/products", response_model=dict)
def admin_create_product(payload: dict, db: Session = Depends(get_db), admin: models.User = Depends(require_admin)):
    p = crud.create_product(db, schemas.ProductCreate(**payload))
    return {"id": p.id, "name": p.title, "price": p.price}


@router.put("/products/{product_id}", response_model=dict)
def admin_update_product(product_id: int, changes: dict, db: Session = Depends(get_db), admin: models.User = Depends(require_admin)):
    p = db.query(models.Product).filter(models.Product.id == product_id).first()
    if not p:
        raise HTTPException(status_code=404, detail="Product not found")
    p = crud.update_product(db, p, changes)
    return {"id": p.id, "name": p.title, "price": p.price, "is_available": p.is_available}


@router.delete("/products/{product_id}", status_code=204)
def admin_delete_product(product_id: int, db: Session = Depends(get_db), admin: models.User = Depends(require_admin)):
    p = db.query(models.Product).filter(models.Product.id == product_id).first()
    if not p:
        raise HTTPException(status_code=404, detail="Product not found")
    crud.delete_product(db, p)
    return None


@router.put("/products/{product_id}/availability", response_model=dict)
def admin_set_availability(product_id: int, payload: dict, db: Session = Depends(get_db), admin: models.User = Depends(require_admin)):
    p = db.query(models.Product).filter(models.Product.id == product_id).first()
    if not p:
        raise HTTPException(status_code=404, detail="Product not found")
    p = crud.update_product(db, p, {"is_available": payload.get("is_available")})
    return {"id": p.id, "is_available": p.is_available}
