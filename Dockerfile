# 1. Python bazaviy image
FROM python:3.11-slim

# 2. Django uchun ishchi katalog
WORKDIR /app

# 3. Python outputni buffer qilmasligi uchun
ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1

# 4. Linux paketlarni yangilash va kerakli kutubxonalarni o‘rnatish
RUN apt-get update && apt-get install -y \
    gcc \
    libpq-dev \
    && rm -rf /var/lib/apt/lists/*

# 5. requirements.txt ni o‘rnatish
COPY requirements.txt /app/
RUN pip install --upgrade pip && pip install -r requirements.txt

# 6. Loyihani nusxalash
COPY . /app/

EXPOSE 8000

# 7. Collect static (production uchun)
RUN python manage.py collectstatic --noinput

# 8. Gunicorn orqali serverni ishga tushirish
CMD ["gunicorn", "config.wsgi:application", "--bind", "0.0.0.0:8000"]
