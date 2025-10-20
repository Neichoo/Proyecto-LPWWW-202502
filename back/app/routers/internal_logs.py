from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

import schemas, crud
from database import SessionLocal

router = APIRouter(prefix="", tags=["internal"])


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


@router.post("/internal/logs", response_model=schemas.LogEntryOut, status_code=201)
def create_log(log: schemas.LogEntryIn, db: Session = Depends(get_db)):
    obj = crud.create_log_entry(db, log)
    return obj
