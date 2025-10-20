from pydantic import BaseModel, EmailStr
from typing import Optional, List, Any
from datetime import datetime


class OrmConfig:
    orm_mode = True


class UserBase(BaseModel):
    username: str
    email: EmailStr
    full_name: Optional[str] = None


class UserCreate(UserBase):
    password: str


class UserOut(UserBase):
    id: int
    role: str
    created_at: datetime

    class Config(OrmConfig):
        pass


# Auth
class Token(BaseModel):
    access_token: str
    token_type: str = "bearer"


class TokenData(BaseModel):
    username: Optional[str] = None


# Category/Product
class CategoryOut(BaseModel):
    id: int
    name: str
    slug: str

    class Config(OrmConfig):
        pass


class ProductBase(BaseModel):
    title: str
    slug: Optional[str]
    description: Optional[str]
    price: int
    category_id: Optional[int]
    ingredients: Optional[str]
    image: Optional[str]


class ProductCreate(ProductBase):
    pass


class ProductOut(ProductBase):
    id: int

    class Config(OrmConfig):
        pass


class PaginatedProducts(BaseModel):
    count: int
    results: List[ProductOut]


# Product detail with related products
class ProductDetail(ProductOut):
    related_products: List[ProductOut] = []

    class Config(OrmConfig):
        pass


# Reviews
class ReviewBase(BaseModel):
    rating: int
    text: Optional[str]


class ReviewCreate(ReviewBase):
    pass


class ReviewOut(ReviewBase):
    id: int
    user: str
    created_at: datetime

    class Config(OrmConfig):
        pass


# Upload
class UploadOut(BaseModel):
    id: int
    file_url: str
    mime_type: Optional[str]
    size: Optional[int]

    class Config(OrmConfig):
        pass


# Log entry
class LogEntryIn(BaseModel):
    service: str
    action: str
    resource_id: Optional[int]
    user_id: Optional[int]
    payload: Optional[Any]


class LogEntryOut(BaseModel):
    id: int
    service: str
    action: str
    resource_id: Optional[int]
    user_id: Optional[int]
    payload: Optional[Any]
    created_at: datetime

    class Config(OrmConfig):
        pass


# Cart / Orders
class CartItemOut(BaseModel):
    id: int
    product_id: int
    name: str
    price: int
    quantity: int
    subtotal: int

    class Config(OrmConfig):
        pass


class CartOut(BaseModel):
    id: int
    user_id: int
    items: List[CartItemOut]
    subtotal: int
    shipping: int
    total: int

    class Config(OrmConfig):
        pass


class AddToCartIn(BaseModel):
    product_id: int
    quantity: int


class UpdateCartItemIn(BaseModel):
    quantity: int


class OrderItemOut(BaseModel):
    product: str
    quantity: int


class OrderOut(BaseModel):
    id: int
    date: datetime
    total: int
    status: str
    items: List[OrderItemOut]

    class Config(OrmConfig):
        pass
