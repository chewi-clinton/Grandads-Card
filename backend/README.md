# Grandad's Cards — Backend

Django REST Framework API for the storefront and admin.

## Local setup

```
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
cp .env.example .env   # fill in DATABASE_URL etc.
python manage.py migrate
python manage.py createsuperuser
python manage.py import_catalog   # loads the scraped catalog (frontend/src/data/products-all.jsonl)
python manage.py runserver 8000
```

## Environment variables

See `.env.example`. Key ones:

- `DATABASE_URL` — Postgres connection string.
- `USE_S3` — set `True` to store media in MinIO/S3 instead of local disk; requires `MINIO_*` vars.
- `CORS_ALLOWED_ORIGINS` — must include the frontend's origin.

## API

- `POST /api/auth/register/`, `POST /api/auth/token/`, `POST /api/auth/token/refresh/`, `GET /api/auth/me/`
- `GET/POST /api/products/`, `GET/PUT/PATCH/DELETE /api/products/<handle>/`
- `GET/POST /api/categories/`, `GET/PUT/PATCH/DELETE /api/categories/<handle>/`
- `GET/POST /api/orders/`, `GET/PUT/PATCH/DELETE /api/orders/<id>/`
- `GET /api/docs/` — Swagger UI
- `/admin/` — Django admin

Writes require an authenticated staff user (JWT bearer token). Reads are public.

## Importing the catalog

`python manage.py import_catalog` reads `../frontend/src/data/products-all.jsonl` and the
locally scraped images in `../frontend/public/images/products/`, and is resumable — rerunning
it skips handles already in the database. Categorization mirrors the regex rules in
`frontend/src/data/products.js`; keep the two in sync if either changes.

## Deployment

See `../docker-compose.yml` at the repo root — bundles this backend, the frontend, and MinIO.
The compose file expects `backend/.env` to exist (git-ignored) with the real `DATABASE_URL`.
