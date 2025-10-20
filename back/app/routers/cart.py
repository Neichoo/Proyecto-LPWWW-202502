from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

import schemas, crud, models
from database import SessionLocal
import auth as auth_module

router = APIRouter(prefix="/api/cart", tags=["cart"])


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()




@router.post("/add", response_model=schemas.CartItemOut)
def add_item(payload: schemas.AddToCartIn, db: Session = Depends(get_db), current_user: models.User = Depends(auth_module.get_current_user)):
    # current_user dependency is provided by other routers; during integration the dependency will be resolved
    user_id = getattr(current_user, "id", 1)
    item = crud.add_to_cart(db, user_id, payload.product_id, payload.quantity)
    if not item:
        raise HTTPException(status_code=404, detail="Product not found")
    return item


@router.get("", response_model=schemas.CartOut)
def get_cart(db: Session = Depends(get_db), current_user: models.User = Depends(auth_module.get_current_user)):
    user_id = getattr(current_user, "id", 1)
    res = crud.get_cart(db, user_id)
    if not res:
        raise HTTPException(status_code=404, detail="Cart not found")
    cart, items, subtotal, shipping, total = res
    # map items
    out_items = []
    for it in items:
        prod = crud.get_product(db, it.product_id)
        out_items.append(schemas.CartItemOut(id=it.id, product_id=it.product_id, name=(prod.title if prod else ""), price=it.price, quantity=it.quantity, subtotal=it.subtotal))
    return schemas.CartOut(id=cart.id, user_id=cart.user_id, items=out_items, subtotal=subtotal, shipping=shipping, total=total)


@router.put("/item/{item_id}", response_model=schemas.CartItemOut)
def update_item(item_id: int, payload: schemas.UpdateCartItemIn, db: Session = Depends(get_db), current_user: models.User = Depends(auth_module.get_current_user)):
    item = crud.update_cart_item(db, item_id, payload.quantity)
    if not item:
        raise HTTPException(status_code=404, detail="Item not found")
    prod = crud.get_product(db, item.product_id)
    return schemas.CartItemOut(id=item.id, product_id=item.product_id, name=(prod.title if prod else ""), price=item.price, quantity=item.quantity, subtotal=item.subtotal)


@router.delete("/item/{item_id}", status_code=204)
def delete_item(item_id: int, db: Session = Depends(get_db), current_user: models.User = Depends(auth_module.get_current_user)):
    ok = crud.remove_cart_item(db, item_id)
    if not ok:
        raise HTTPException(status_code=404, detail="Item not found")
    return None


@router.delete("/clear", response_model=dict)
def clear(db: Session = Depends(get_db), current_user: models.User = Depends(auth_module.get_current_user)):
    user_id = getattr(current_user, "id", 1)
    ok = crud.clear_cart(db, user_id)
    if not ok:
        raise HTTPException(status_code=404, detail="Cart not found")
    return {"message": "Carrito vacío"}
