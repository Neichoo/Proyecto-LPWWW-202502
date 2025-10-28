from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.security import OAuth2PasswordRequestForm
from sqlalchemy.orm import Session
from datetime import timedelta

import schemas, models, auth, crud
from database import SessionLocal
import auth as auth_module

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
async def login(form_data: OAuth2PasswordRequestForm = Depends(), db: Session = Depends(get_db)):
    user = crud.get_user_by_username(db, username=form_data.username)
    if not user or not auth.verify_password(form_data.password, user.hashed_password):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect username or password",
            headers={"WWW-Authenticate": "Bearer"},
        )
    access_token_expires = timedelta(minutes=auth.ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = auth.create_access_token(data={"sub": user.username}, expires_delta=access_token_expires)
    return {"access_token": access_token, "token_type": "bearer"}



@router.get('/me', response_model=schemas.UserOut)
def get_me(current_user: models.User = Depends(auth_module.get_current_user)):
    return current_user


@router.put('/me', response_model=schemas.UserOut)
def update_me(changes: dict, db: Session = Depends(get_db), current_user: models.User = Depends(auth_module.get_current_user)):
    # allow user to update full_name and email
    if 'email' in changes:
        existing = crud.get_user_by_email(db, email=changes['email'])
        if existing and existing.id != current_user.id:
            raise HTTPException(status_code=400, detail='Email already in use')
    if 'username' in changes:
        existing = crud.get_user_by_username(db, username=changes['username'])
        if existing and existing.id != current_user.id:
            raise HTTPException(status_code=400, detail='Username already in use')
    # apply changes
    for k, v in changes.items():
        if k in ('full_name', 'email', 'username') and v is not None:
            setattr(current_user, k, v)
    db.add(current_user)
    db.commit()
    db.refresh(current_user)
    return current_user


@router.put('/change-password', response_model=dict)
def change_password(payload: dict, db: Session = Depends(get_db), current_user: models.User = Depends(auth_module.get_current_user)):
    # payload: {"old_password": "..", "new_password": ".."}
    old = payload.get('old_password')
    new = payload.get('new_password')
    if not old or not new:
        raise HTTPException(status_code=400, detail='old_password and new_password required')
    if not auth_module.verify_password(old, current_user.hashed_password):
        raise HTTPException(status_code=403, detail='Incorrect current password')
    current_user.hashed_password = auth_module.get_password_hash(new)
    db.add(current_user)
    db.commit()
    return {"message": "password updated"}
