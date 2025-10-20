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


def list_categories(db: Session):
    return db.query(models.Category).all()


def list_products_by_category(db: Session, slug: str):
    cat = get_category_by_slug(db, slug)
    if not cat:
        return []
    return db.query(models.Product).filter(models.Product.category_id == cat.id).all()


def get_product_detail(db: Session, product_id: int):
    p = get_product(db, product_id)
    if not p:
        return None, []
    # simple related products: same category, limit 4
    related = []
    if p.category_id:
        related = db.query(models.Product).filter(models.Product.category_id == p.category_id, models.Product.id != p.id).limit(4).all()
    return p, related


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


# Cart / Orders
def get_or_create_cart(db: Session, user_id: int):
    cart = db.query(models.Cart).filter(models.Cart.user_id == user_id).first()
    if cart:
        return cart
    cart = models.Cart(user_id=user_id)
    db.add(cart)
    db.commit()
    db.refresh(cart)
    return cart


def add_to_cart(db: Session, user_id: int, product_id: int, quantity: int):
    cart = get_or_create_cart(db, user_id)
    prod = get_product(db, product_id)
    if not prod:
        return None
    item = db.query(models.CartItem).filter(models.CartItem.cart_id == cart.id, models.CartItem.product_id == product_id).first()
    price = prod.price
    if item:
        item.quantity += quantity
        item.subtotal = item.quantity * price
    else:
        item = models.CartItem(cart_id=cart.id, product_id=product_id, quantity=quantity, price=price)
        item.subtotal = quantity * price
        db.add(item)
    db.commit()
    db.refresh(item)
    return item


def get_cart(db: Session, user_id: int):
    cart = db.query(models.Cart).filter(models.Cart.user_id == user_id).first()
    if not cart:
        return None
    items = db.query(models.CartItem).filter(models.CartItem.cart_id == cart.id).all()
    subtotal = sum(i.subtotal for i in items)
    shipping = 3500
    total = subtotal + shipping
    return cart, items, subtotal, shipping, total


def update_cart_item(db: Session, item_id: int, quantity: int):
    item = db.query(models.CartItem).filter(models.CartItem.id == item_id).first()
    if not item:
        return None
    item.quantity = quantity
    item.subtotal = item.quantity * item.price
    db.add(item)
    db.commit()
    db.refresh(item)
    return item


def remove_cart_item(db: Session, item_id: int):
    item = db.query(models.CartItem).filter(models.CartItem.id == item_id).first()
    if not item:
        return False
    db.delete(item)
    db.commit()
    return True


def clear_cart(db: Session, user_id: int):
    cart = db.query(models.Cart).filter(models.Cart.user_id == user_id).first()
    if not cart:
        return False
    db.query(models.CartItem).filter(models.CartItem.cart_id == cart.id).delete()
    db.commit()
    return True


def create_order_from_cart(db: Session, user_id: int, payment_info: dict):
    cart_info = get_cart(db, user_id)
    if not cart_info:
        return None
    cart, items, subtotal, shipping, total = cart_info
    order = models.Order(user_id=user_id, subtotal=subtotal, shipping=shipping, total=total, status="paid", payment_reference="SIMULATED")
    db.add(order)
    db.commit()
    db.refresh(order)
    for it in items:
        oi = models.OrderItem(order_id=order.id, product_id=it.product_id, name=(get_product(db, it.product_id).title if get_product(db, it.product_id) else ""), price=it.price, quantity=it.quantity, subtotal=it.subtotal)
        db.add(oi)
    db.commit()
    # clear cart
    clear_cart(db, user_id)
    return order


def list_orders(db: Session, user_id: int):
    return db.query(models.Order).filter(models.Order.user_id == user_id).all()
