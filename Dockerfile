# Rasmiy Python image
FROM python:3.12-slim

# Ishchi katalog
WORKDIR /app

# Tizimga kerakli paketlar
RUN apt-get update && apt-get install -y \
    build-essential \
    libpq-dev \
    && rm -rf /var/lib/apt/lists/*

# Python pip yangilash
RUN pip install --upgrade pip

# Requirements faylni nusxalash
COPY requirements.txt .

# Kutubxonalarni o‘rnatish
RUN pip install -r requirements.txt

# Butun loyihani nusxalash
COPY . .

# Collect static files (agar Django bo‘lsa)
RUN python manage.py collectstatic --noinput

# Gunicorn orqali ishga tushirish
CMD ["gunicorn", "jony_rich.wsgi:application", "--bind", "0.0.0.0:8000"]
