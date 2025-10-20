from fastapi import APIRouter, UploadFile, File, HTTPException, Depends
from sqlalchemy.orm import Session
import shutil, os

import schemas, crud
from database import SessionLocal

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
