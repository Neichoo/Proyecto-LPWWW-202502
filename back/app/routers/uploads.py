from fastapi import APIRouter, UploadFile, File, HTTPException, Depends
from sqlalchemy.orm import Session
import shutil, os

import schemas
from database import SessionLocal
import models, auth as auth_module, crud

router = APIRouter(prefix="/api", tags=["uploads"])


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


@router.post("/uploads/image", response_model=schemas.UploadOut)
def upload_image(file: UploadFile = File(...), db: Session = Depends(get_db)):
    upload_dir = os.getenv("UPLOAD_DIR", "/app/media")
    os.makedirs(upload_dir, exist_ok=True)
    filename = file.filename
    dest = os.path.join(upload_dir, filename)
    try:
        with open(dest, "wb") as buffer:
            shutil.copyfileobj(file.file, buffer)
    except Exception as e:
        raise HTTPException(status_code=500, detail="Failed to save file")
    file_url = f"/media/{filename}"
    up = crud.create_upload(db, file_url=file_url, mime_type=file.content_type, size=os.path.getsize(dest))
    return up



@router.get('/uploads', response_model=list[schemas.UploadOut])
def list_uploads(page: int = 1, db: Session = Depends(get_db), admin: models.User = Depends(auth_module.get_current_user)):
    if getattr(admin, 'role', 'cliente') != 'admin':
        raise HTTPException(status_code=403, detail='Admin privileges required')
    skip = (page - 1) * 50
    ups = db.query(models.Upload).offset(skip).limit(50).all()
    return ups


@router.get('/uploads/{upload_id}', response_model=schemas.UploadOut)
def get_upload(upload_id: int, db: Session = Depends(get_db), admin: models.User = Depends(auth_module.get_current_user)):
    if getattr(admin, 'role', 'cliente') != 'admin':
        raise HTTPException(status_code=403, detail='Admin privileges required')
    up = db.query(models.Upload).filter(models.Upload.id == upload_id).first()
    if not up:
        raise HTTPException(status_code=404, detail='Upload not found')
    return up



@router.delete('/uploads/{upload_id}', status_code=204)
def delete_upload(upload_id: int, db: Session = Depends(get_db), current_user: models.User = Depends(auth_module.get_current_user)):
    # only admin can delete uploads
    if getattr(current_user, 'role', 'cliente') != 'admin':
        raise HTTPException(status_code=403, detail='Admin privileges required')
    up = db.query(models.Upload).filter(models.Upload.id == upload_id).first()
    if not up:
        raise HTTPException(status_code=404, detail='Upload not found')
    # attempt to remove file from disk if present
    upload_dir = os.getenv('UPLOAD_DIR', '/app/media')
    path = up.file_url
    # file_url is expected to be /media/filename
    filename = path.split('/')[-1]
    file_path = os.path.join(upload_dir, filename)
    try:
        if os.path.exists(file_path):
            os.remove(file_path)
    except Exception:
        # ignore filesystem errors but still remove DB row
        pass
    db.delete(up)
    db.commit()
    return None
