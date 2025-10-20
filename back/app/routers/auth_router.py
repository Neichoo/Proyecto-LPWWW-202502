from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from datetime import timedelta

import schemas, models, auth, crud
from database import SessionLocal

router = APIRouter(prefix="/api/auth", tags=["auth"])


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


@router.post("/register", response_model=schemas.UserOut)
def register(user: schemas.UserCreate, db: Session = Depends(get_db)):
    existing = crud.get_user_by_email(db, email=user.email)
    if existing:
        raise HTTPException(status_code=400, detail="Email already registered")
    if crud.get_user_by_username(db, username=user.username):
        raise HTTPException(status_code=400, detail="Username already taken")
    hashed = auth.get_password_hash(user.password)
    db_user = models.User(username=user.username, email=user.email, full_name=user.full_name, hashed_password=hashed)
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user


@router.post("/login", response_model=schemas.Token)
def login(form_data: dict, db: Session = Depends(get_db)):
    # form_data expected: {"username": "..", "password": ".."}
    username = form_data.get("username")
    password = form_data.get("password")
    if not username or not password:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="username and password required")
    user = crud.get_user_by_username(db, username=username)
    if not user or not auth.verify_password(password, user.hashed_password):
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Incorrect credentials")
    access_token_expires = timedelta(minutes=auth.ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = auth.create_access_token(data={"sub": user.username}, expires_delta=access_token_expires)
    return {"access_token": access_token, "token_type": "bearer"}
