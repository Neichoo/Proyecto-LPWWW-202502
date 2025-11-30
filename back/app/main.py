from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
import os
import models
from database import engine
from routers import auth_router as auth, products, uploads, internal_logs, cart, orders
from routers import admin as admin


models.Base.metadata.create_all(bind=engine)

app = FastAPI(title="LPWWW FastAPI Base")

# CORS config for frontend development. Set FRONTEND_ORIGINS as comma-separated env var if needed.
origins = os.getenv("FRONTEND_ORIGINS", "http://localhost:5173,http://127.0.0.1:5173").split(",")

app.add_middleware(
	CORSMiddleware,
	allow_origins=origins,
	allow_credentials=True,
	allow_methods=["*"],
	allow_headers=["*"],
)

app.include_router(auth.router)
app.include_router(products.router)
app.include_router(uploads.router)
app.include_router(internal_logs.router)
app.include_router(cart.router)
app.include_router(orders.router)
app.include_router(admin.router)

# Serve a static index at the root (will serve `static/index.html` for `/`)
app.mount('/', StaticFiles(directory='static', html=True), name='static')

# mount media directory
upload_dir = os.getenv('UPLOAD_DIR', '/app/media')
os.makedirs(upload_dir, exist_ok=True)
app.mount('/media', StaticFiles(directory=upload_dir), name='media')
