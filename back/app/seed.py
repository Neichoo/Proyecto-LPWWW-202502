"""
Seed script to create an admin user, categories, and sample products.

Run from repo root (where docker-compose lives):
    cd back
    python -m app.seed
"""

from sqlalchemy.orm import Session

import auth
from database import SessionLocal, engine
import models

# Ensure tables exist
models.Base.metadata.create_all(bind=engine)


def get_or_create_category(db: Session, name: str, slug: str) -> models.Category:
    cat = db.query(models.Category).filter_by(slug=slug).first()
    if cat:
        return cat
    cat = models.Category(name=name, slug=slug)
    db.add(cat)
    db.commit()
    db.refresh(cat)
    return cat


def get_or_create_product(
    db: Session,
    title: str,
    price: int,
    category_id: int | None,
    description: str = "",
    ingredients: str | None = None,
    image: str | None = None,
    slug: str | None = None,
):
    prod = db.query(models.Product).filter_by(title=title).first()
    if prod:
        return prod
    prod = models.Product(
        title=title,
        price=price,
        category_id=category_id,
        description=description,
        ingredients=ingredients,
        image=image,
        slug=slug,
    )
    db.add(prod)
    db.commit()
    db.refresh(prod)
    return prod


def get_or_create_admin(db: Session):
    admin = db.query(models.User).filter_by(username="admin").first()
    if admin:
        return admin
    admin = models.User(
        username="admin",
        email="admin@example.com",
        full_name="Admin",
        hashed_password=auth.get_password_hash("admin123"),
        role="admin",
    )
    db.add(admin)
    db.commit()
    db.refresh(admin)
    return admin


def run():
    db = SessionLocal()
    try:
        admin = get_or_create_admin(db)
        print(f"Admin listo: username=admin, password=admin123 (id={admin.id})")

        cat_sushi = get_or_create_category(db, "Sushi", "sushi")
        cat_bebidas = get_or_create_category(db, "Bebidas", "bebidas")
        cat_salsas = get_or_create_category(db, "Salsas", "salsas")

        rolls = [
          ("California Roll", 4500, "Arroz, alga nori, cangrejo, palta, pepino.", "https://c.animaapp.com/mgy9hocl11ZIi8/img/image-14.png", "california-roll"),
          ("Spicy Tuna Roll", 5500, "Arroz, alga nori, atún picante, pepino, cebollín.", "https://c.animaapp.com/mgy9hocl11ZIi8/img/image-14.png", "spicy-tuna-roll"),
          ("Philadelphia Roll", 5000, "Arroz, alga nori, salmón, queso crema, palta.", "https://c.animaapp.com/mgy9hocl11ZIi8/img/image-14.png", "philadelphia-roll"),
          ("Tempura Shrimp Roll", 6000, "Arroz, alga nori, camarón tempura, palta, mayo spicy.", "https://c.animaapp.com/mgy9hocl11ZIi8/img/image-14.png", "tempura-shrimp-roll"),
          ("Dragon Roll", 6500, "Arroz, alga nori, anguila, pepino, palta, salsa unagi.", "https://c.animaapp.com/mgy9hocl11ZIi8/img/image-14.png", "dragon-roll"),
          ("Crunchy Roll", 6000, "Arroz, alga nori, cangrejo, palta, tempura flakes.", "https://c.animaapp.com/mgy9hocl11ZIi8/img/image-14.png", "crunchy-roll"),
        ]
        for title, price, ingredients, image, slug in rolls:
            get_or_create_product(
                db,
                title=title,
                price=price,
                category_id=cat_sushi.id,
                description=ingredients,
                ingredients=ingredients,
                image=image,
                slug=slug,
            )

        bebidas = [
            ("Té verde frío", 1500, "Agua, hojas de té verde, azúcar, hielo.", "https://c.animaapp.com/mgy9hocl11ZIi8/img/image-3.png", "te-verde-frio"),
            ("Cerveza Japonesa", 3000, "Agua, malta, lúpulo, levadura.", "https://c.animaapp.com/mgy9hocl11ZIi8/img/image-4.png", "cerveza-japonesa"),
            ("Lychee Soda", 2000, "Agua carbonatada, extracto de lichi, azúcar.", "https://c.animaapp.com/mgy9hocl11ZIi8/img/image-5.png", "lychee-soda"),
        ]
        for title, price, desc, image, slug in bebidas:
            get_or_create_product(
                db,
                title=title,
                price=price,
                category_id=cat_bebidas.id,
                description=desc,
                ingredients=desc,
                image=image,
                slug=slug,
            )

        salsas = [
            ("Salsa Soja Premium", 1500, "Soja fermentada, trigo, sal, conservante natural.", "https://c.animaapp.com/mgy9hocl11ZIi8/img/image-8.png", "salsa-soja"),
            ("Salsa Spicy Mayo", 2000, "Mayonesa y pasta de ají picante.", "https://c.animaapp.com/mgy9hocl11ZIi8/img/image-8.png", "salsa-spicy-mayo"),
            ("Salsa Unagi", 2500, "Salsa de soja, azúcar, mirin, maicena.", "https://c.animaapp.com/mgy9hocl11ZIi8/img/image-8.png", "salsa-unagi"),
        ]
        for title, price, desc, image, slug in salsas:
            get_or_create_product(
                db,
                title=title,
                price=price,
                category_id=cat_salsas.id,
                description=desc,
                ingredients=desc,
                image=image,
                slug=slug,
            )

        print("Seed completo.")
    finally:
        db.close()


if __name__ == "__main__":
    run()
