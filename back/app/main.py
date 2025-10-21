from fastapi import FastAPI
import models
from database import engine
from fastapi.staticfiles import StaticFiles
import os

from routers import auth_router as auth, products, uploads, internal_logs, cart, orders
from routers import admin as admin


models.Base.metadata.create_all(bind=engine)

app = FastAPI(title="LPWWW FastAPI Base")

app.include_router(auth.router)
app.include_router(products.router)
app.include_router(uploads.router)
app.include_router(internal_logs.router)
app.include_router(cart.router)
app.include_router(orders.router)
app.include_router(admin.router)

# mount media directory
upload_dir = os.getenv('UPLOAD_DIR', '/app/media')
os.makedirs(upload_dir, exist_ok=True)
app.mount('/media', StaticFiles(directory=upload_dir), name='media')

