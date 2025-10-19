from pydantic import BaseModel, EmailStr
from typing import Optional


class OrmConfig:
    orm_mode = True

class UserBase(BaseModel):
    email: EmailStr
    full_name: Optional[str] = None


class UserCreate(UserBase):
    pass


class User(UserBase):
    id: int

    class Config(OrmConfig):
        pass
