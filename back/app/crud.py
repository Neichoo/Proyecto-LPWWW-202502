from sqlalchemy.orm import Session
from sqlalchemy import func
import models, schemas
import auth as auth_module


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


def get_review(db: Session, review_id: int):
    return db.query(models.Review).filter(models.Review.id == review_id).first()


def update_review(db: Session, review_obj: models.Review, changes: dict):
    for k, v in changes.items():
        setattr(review_obj, k, v)
    db.add(review_obj)
    db.commit()
    db.refresh(review_obj)
    return review_obj


def delete_review(db: Session, review_obj: models.Review):
    db.delete(review_obj)
    db.commit()


# Category management
def create_category(db: Session, cat: schemas.CategoryCreate):
    c = models.Category(name=cat.name, slug=cat.slug)
    db.add(c)
    db.commit()
    db.refresh(c)
    return c


def update_category(db: Session, cat_obj: models.Category, changes: dict):
    for k, v in changes.items():
        if v is not None:
            setattr(cat_obj, k, v)
    db.add(cat_obj)
    db.commit()
    db.refresh(cat_obj)
    return cat_obj


def delete_category(db: Session, cat_obj: models.Category):
    db.delete(cat_obj)
    db.commit()


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
    else:
        item = models.CartItem(cart_id=cart.id, product_id=product_id, quantity=quantity, price=price)
        db.add(item)
    db.commit()
    db.refresh(item)
    return item


def get_cart(db: Session, user_id: int):
    cart = db.query(models.Cart).filter(models.Cart.user_id == user_id).first()
    if not cart:
        return None
    items = db.query(models.CartItem).filter(models.CartItem.cart_id == cart.id).all()
    subtotal = sum(i.price * i.quantity for i in items)
    shipping = 3500
    total = subtotal + shipping
    return cart, items, subtotal, shipping, total


def update_cart_item(db: Session, item_id: int, quantity: int):
    item = db.query(models.CartItem).filter(models.CartItem.id == item_id).first()
    if not item:
        return None
    item.quantity = quantity
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
    order = models.Order(user_id=user_id, subtotal=subtotal, shipping=shipping, total=total, status="En espera", payment_reference="SIMULATED")
    db.add(order)
    db.commit()
    db.refresh(order)
    for it in items:
        oi = models.OrderItem(
            order_id=order.id, 
            product_id=it.product_id, 
            name=(get_product(db, it.product_id).title if get_product(db, it.product_id) else ""), 
            price=it.price, 
            quantity=it.quantity, 
            subtotal=it.subtotal
        )
        db.add(oi)
    db.commit()
    # clear cart
    clear_cart(db, user_id)
    return order


def list_orders(db: Session, user_id: int):
    return db.query(models.Order).filter(models.Order.user_id == user_id).all()


### Admin helpers
def list_users(db: Session, role: str = None, search: str = None, skip: int = 0, limit: int = 50):
    query = db.query(models.User)
    if role:
        query = query.filter(models.User.role == role)
    if search:
        query = query.filter(models.User.username.ilike(f"%{search}%") | models.User.email.ilike(f"%{search}%"))
    total = query.count()
    return query.offset(skip).limit(limit).all()


def get_user_by_id(db: Session, user_id: int):
    return db.query(models.User).filter(models.User.id == user_id).first()


def create_user_admin(db: Session, data: dict):
    # expects dict with username,email,password,full_name,role
    raw = data.get("password")
    hashed = raw if raw and raw.startswith("$2") else auth_module.get_password_hash(raw) if raw else None
    user = models.User(username=data["username"], email=data["email"], full_name=data.get("full_name"), hashed_password=hashed or "", role=data.get("role", "cliente"))
    db.add(user)
    db.commit()
    db.refresh(user)
    return user


def update_user_admin(db: Session, user_obj: models.User, changes: dict):
    for k, v in changes.items():
        if v is not None:
            setattr(user_obj, k, v)
    db.add(user_obj)
    db.commit()
    db.refresh(user_obj)
    return user_obj


def delete_user_admin(db: Session, user_obj: models.User):
    db.delete(user_obj)
    db.commit()


# Admin orders
def list_all_orders(db: Session, skip: int = 0, limit: int = 50, status: str = None):
    q = db.query(models.Order)
    if status:
        q = q.filter(models.Order.status == status)
    return q.offset(skip).limit(limit).all()


def update_order_status(db: Session, order_obj: models.Order, status: str):
    order_obj.status = status
    db.add(order_obj)
    db.commit()
    db.refresh(order_obj)
    return order_obj


def cancel_order(db: Session, order_obj: models.Order):
    order_obj.status = "cancelled"
    db.add(order_obj)
    db.commit()
    db.refresh(order_obj)
    return order_obj


# Admin products listing (admin view)
def list_products_admin(db: Session, skip: int = 0, limit: int = 50):
    return db.query(models.Product).offset(skip).limit(limit).all()


def get_order_detail(db: Session, order_id: int):
    order = db.query(models.Order).filter(models.Order.id == order_id).first()
    if not order:
        return None
    items = db.query(models.OrderItem).filter(models.OrderItem.order_id == order.id).all()
    return order, items


def simulate_shipping_cost(postal_code: str, items: list):
    # simplistic rule: base 2000 + 500 per item
    count = sum(i.get("quantity", 1) for i in items)
    cost = 2000 + 500 * count
    days = 2 if count <= 3 else 3
    return cost, days


def save_contact_message(db: Session, contact: schemas.ContactIn):
    # store as log entry for now
    payload = {"nombre": contact.nombre, "apellido": contact.apellido, "email": contact.email, "mensaje": contact.mensaje}
    obj = models.LogEntry(service="contact", action="message", resource_id=None, user_id=None, payload=payload)
    db.add(obj)
    db.commit()
    db.refresh(obj)
    return obj


def update_order_payment_method(db: Session, user_id: int, method: str):
    cart = db.query(models.Cart).filter(models.Cart.user_id == user_id).first()
    if not cart:
        return False
    # store payment choice on cart or on order in real impl; here we return True
    return True
