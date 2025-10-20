from sqlalchemy.orm import Session
import models, schemas
from sqlalchemy import func


def get_user(db: Session, user_id: int):
    return db.query(models.User).filter(models.User.id == user_id).first()


def get_user_by_email(db: Session, email: str):
    return db.query(models.User).filter(models.User.email == email).first()


def get_user_by_username(db: Session, username: str):
    return db.query(models.User).filter(models.User.username == username).first()


def create_user(db: Session, user: schemas.UserCreate):
    hashed = user.password
    # deprecated: prefer using auth.get_password_hash before calling create_user
    db_user = models.User(username=user.username, email=user.email, full_name=user.full_name, hashed_password=hashed)
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user


# Categories / Products
def get_category_by_slug(db: Session, slug: str):
    return db.query(models.Category).filter(models.Category.slug == slug).first()


def list_products(db: Session, skip: int = 0, limit: int = 50, category: str = None, q: str = None):
    query = db.query(models.Product)
    if category:
        # join category
        query = query.join(models.Category).filter(func.lower(models.Category.slug) == category.lower())
    if q:
        query = query.filter(models.Product.title.ilike(f"%{q}%"))
    total = query.count()
    results = query.offset(skip).limit(limit).all()
    return total, results


def get_product(db: Session, product_id: int):
    return db.query(models.Product).filter(models.Product.id == product_id).first()


def create_product(db: Session, product: schemas.ProductCreate):
    db_prod = models.Product(**product.dict())
    db.add(db_prod)
    db.commit()
    db.refresh(db_prod)
    return db_prod


def update_product(db: Session, db_prod: models.Product, changes: dict):
    for k, v in changes.items():
        setattr(db_prod, k, v)
    db.add(db_prod)
    db.commit()
    db.refresh(db_prod)
    return db_prod


def delete_product(db: Session, db_prod: models.Product):
    db.delete(db_prod)
    db.commit()


# Reviews
def list_reviews(db: Session, product_id: int):
    return db.query(models.Review).filter(models.Review.product_id == product_id).all()


def create_review(db: Session, product_id: int, user_id: int, review: schemas.ReviewCreate):
    db_rev = models.Review(product_id=product_id, user_id=user_id, rating=review.rating, text=review.text)
    db.add(db_rev)
    db.commit()
    db.refresh(db_rev)
    return db_rev


# Uploads
def create_upload(db: Session, file_url: str, mime_type: str, size: int):
    up = models.Upload(file_url=file_url, mime_type=mime_type, size=size)
    db.add(up)
    db.commit()
    db.refresh(up)
    return up


# Logs
def create_log_entry(db: Session, log: schemas.LogEntryIn):
    obj = models.LogEntry(service=log.service, action=log.action, resource_id=log.resource_id, user_id=log.user_id, payload=log.payload)
    db.add(obj)
    db.commit()
    db.refresh(obj)
    return obj
