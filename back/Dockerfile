FROM node:18 AS frontend-builder
WORKDIR /src
# copy frontend sources and install deps to build
COPY Frontend/package.json Frontend/package-lock.json* ./
COPY Frontend ./
RUN npm install --silent && npm run build

FROM python:3.11-slim
# set up python app
WORKDIR /app
# copy requirements from repository subfolder
COPY back/app/requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# copy application code
COPY back/app/ .
# copy built frontend from builder stage (will be empty if build failed)
COPY --from=frontend-builder /src/dist ./static

CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]
