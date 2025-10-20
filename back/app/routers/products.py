from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.orm import Session
from typing import Optional

import schemas, crud, auth, models
from database import SessionLocal
from fastapi.security import OAuth2PasswordBearer
from jose import JWTError

router = APIRouter(prefix="/api", tags=["products"])


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/api/auth/login")


def get_current_user(token: str = Depends(oauth2_scheme), db: Session = Depends(get_db)):
    if not token:
        raise HTTPException(status_code=401, detail="Not authenticated")
    try:
        payload = auth.jwt_decode(token)
    except Exception:
        # fallback: try direct decode in case helper isn't present
        try:
            from jose import jwt
            payload = jwt.decode(token, auth.SECRET_KEY, algorithms=[auth.ALGORITHM])
        except JWTError:
            raise HTTPException(status_code=401, detail="Invalid authentication credentials")
    username = payload.get("sub")
    if username is None:
        raise HTTPException(status_code=401, detail="Invalid authentication credentials")
    user = crud.get_user_by_username(db, username=username)
    if not user:
        raise HTTPException(status_code=401, detail="User not found")
    return user


@router.get("/products", response_model=schemas.PaginatedProducts)
def list_products(category: Optional[str] = None, q: Optional[str] = None, page: int = Query(1, ge=1), db: Session = Depends(get_db)):
    skip = (page - 1) * 20
    total, results = crud.list_products(db, skip=skip, limit=20, category=category, q=q)
    return {"count": total, "results": results}


@router.get("/products/{product_id}", response_model=schemas.ProductOut)
def get_product(product_id: int, db: Session = Depends(get_db)):
    p = crud.get_product(db, product_id)
    if not p:
        raise HTTPException(status_code=404, detail="Product not found")
    return p


@router.post("/products", response_model=schemas.ProductOut)
def create_product(product: schemas.ProductCreate, db: Session = Depends(get_db)):
    p = crud.create_product(db, product)
    return p


@router.put("/products/{product_id}", response_model=schemas.ProductOut)
def update_product(product_id: int, changes: dict, db: Session = Depends(get_db)):
    p = crud.get_product(db, product_id)
    if not p:
        raise HTTPException(status_code=404, detail="Product not found")
    return crud.update_product(db, p, changes)


@router.delete("/products/{product_id}", status_code=204)
def delete_product(product_id: int, db: Session = Depends(get_db)):
    p = crud.get_product(db, product_id)
    if not p:
        raise HTTPException(status_code=404, detail="Product not found")
    crud.delete_product(db, p)
    return None


@router.get("/products/{product_id}/reviews", response_model=list[schemas.ReviewOut])
def list_reviews(product_id: int, db: Session = Depends(get_db)):
    return crud.list_reviews(db, product_id)


@router.post("/products/{product_id}/reviews", response_model=schemas.ReviewOut)
def create_review(product_id: int, review: schemas.ReviewCreate, db: Session = Depends(get_db), current_user: models.User = Depends(get_current_user)):
    return crud.create_review(db, product_id, current_user.id, review)
