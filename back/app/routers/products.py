from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.orm import Session
from typing import Optional

import schemas, crud, auth, models
from database import SessionLocal
from fastapi.security import OAuth2PasswordBearer
from jose import JWTError
import auth as auth_module

router = APIRouter(prefix="/api", tags=["products"])


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/api/auth/login")


def get_current_user(token: str = Depends(oauth2_scheme), db: Session = Depends(get_db)):
    return auth_module.get_current_user(token=token, db=db)


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


@router.get("/categories", response_model=list[schemas.CategoryOut])
def list_categories(db: Session = Depends(get_db)):
    return crud.list_categories(db)


@router.get("/categories/{slug}/products", response_model=list[schemas.ProductOut])
def products_by_category(slug: str, db: Session = Depends(get_db)):
    return crud.list_products_by_category(db, slug)


@router.post("/categories", response_model=schemas.CategoryOut)
def create_category(cat: schemas.CategoryCreate, db: Session = Depends(get_db), current_user: models.User = Depends(get_current_user)):
    if getattr(current_user, "role", "cliente") != "admin":
        raise HTTPException(status_code=403, detail="Admin privileges required")
    return crud.create_category(db, cat)


@router.put("/categories/{category_id}", response_model=schemas.CategoryOut)
def update_category(category_id: int, changes: schemas.CategoryUpdate, db: Session = Depends(get_db), current_user: models.User = Depends(get_current_user)):
    if getattr(current_user, "role", "cliente") != "admin":
        raise HTTPException(status_code=403, detail="Admin privileges required")
    cat = db.query(models.Category).filter(models.Category.id == category_id).first()
    if not cat:
        raise HTTPException(status_code=404, detail="Category not found")
    return crud.update_category(db, cat, changes.dict())


@router.delete("/categories/{category_id}", status_code=204)
def delete_category(category_id: int, db: Session = Depends(get_db), current_user: models.User = Depends(get_current_user)):
    if getattr(current_user, "role", "cliente") != "admin":
        raise HTTPException(status_code=403, detail="Admin privileges required")
    cat = db.query(models.Category).filter(models.Category.id == category_id).first()
    if not cat:
        raise HTTPException(status_code=404, detail="Category not found")
    crud.delete_category(db, cat)
    return None


@router.get("/products/{product_id}/detail", response_model=schemas.ProductDetail)
def product_detail(product_id: int, db: Session = Depends(get_db)):
    p, related = crud.get_product_detail(db, product_id)
    if not p:
        raise HTTPException(status_code=404, detail="Product not found")
    # attach related products
    out = schemas.ProductDetail.from_orm(p)
    out.related_products = [schemas.ProductOut.from_orm(r) for r in related]
    return out


@router.post("/products", response_model=schemas.ProductOut)
def create_product(product: schemas.ProductCreate, db: Session = Depends(get_db), current_user: models.User = Depends(get_current_user)):
    if getattr(current_user, "role", "cliente") != "admin":
        raise HTTPException(status_code=403, detail="Admin privileges required")
    p = crud.create_product(db, product)
    return p


@router.put("/products/{product_id}", response_model=schemas.ProductOut)
def update_product(product_id: int, changes: dict, db: Session = Depends(get_db), current_user: models.User = Depends(get_current_user)):
    if getattr(current_user, "role", "cliente") != "admin":
        raise HTTPException(status_code=403, detail="Admin privileges required")
    p = crud.get_product(db, product_id)
    if not p:
        raise HTTPException(status_code=404, detail="Product not found")
    return crud.update_product(db, p, changes)


@router.delete("/products/{product_id}", status_code=204)
def delete_product(product_id: int, db: Session = Depends(get_db), current_user: models.User = Depends(get_current_user)):
    if getattr(current_user, "role", "cliente") != "admin":
        raise HTTPException(status_code=403, detail="Admin privileges required")
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


@router.put("/products/{product_id}/reviews/{review_id}", response_model=schemas.ReviewOut)
def update_review(product_id: int, review_id: int, changes: schemas.ReviewUpdate, db: Session = Depends(get_db), current_user: models.User = Depends(get_current_user)):
    rev = crud.get_review(db, review_id)
    if not rev or rev.product_id != product_id:
        raise HTTPException(status_code=404, detail="Review not found")
    # only owner or admin
    if rev.user_id != current_user.id and getattr(current_user, "role", "cliente") != "admin":
        raise HTTPException(status_code=403, detail="Not allowed")
    return crud.update_review(db, rev, changes.dict())


@router.delete("/products/{product_id}/reviews/{review_id}", status_code=204)
def delete_review(product_id: int, review_id: int, db: Session = Depends(get_db), current_user: models.User = Depends(get_current_user)):
    rev = crud.get_review(db, review_id)
    if not rev or rev.product_id != product_id:
        raise HTTPException(status_code=404, detail="Review not found")
    if rev.user_id != current_user.id and getattr(current_user, "role", "cliente") != "admin":
        raise HTTPException(status_code=403, detail="Not allowed")
    crud.delete_review(db, rev)
    return None
