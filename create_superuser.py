import os
from django.contrib.auth import get_user_model

User = get_user_model()

if os.getenv("ENV") == "production":  # Solo en Railway
    username = os.getenv("DJANGO_SUPERUSER_USERNAME")
    email = os.getenv("DJANGO_SUPERUSER_EMAIL")
    password = os.getenv("DJANGO_SUPERUSER_PASSWORD")

    if not User.objects.filter(username=username).exists():
        print("🛠️ Creating superuser...")
        User.objects.create_superuser(username=username, email=email, password=password)
    else:
        print("✅ Superuser already exists.")
