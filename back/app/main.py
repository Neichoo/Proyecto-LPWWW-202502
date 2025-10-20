from fastapi import FastAPI
import models
from database import engine

from routers import auth_router as auth, products, uploads, internal_logs


models.Base.metadata.create_all(bind=engine)

app = FastAPI(title="LPWWW FastAPI Base")

app.include_router(auth.router)
app.include_router(products.router)
app.include_router(uploads.router)
app.include_router(internal_logs.router)

