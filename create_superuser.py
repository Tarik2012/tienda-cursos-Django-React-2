import os
from django.contrib.auth import get_user_model

User = get_user_model()

if os.getenv("ENV") == "production":  # Solo en Railway
    email = os.getenv("DJANGO_SUPERUSER_EMAIL")
    password = os.getenv("DJANGO_SUPERUSER_PASSWORD")
    name = os.getenv("DJANGO_SUPERUSER_NAME", "Admin")  # Usa "name" si tienes ese campo

    if not User.objects.filter(email=email).exists():
        print("🛠️ Creating superuser...")
        User.objects.create_superuser(email=email, password=password, name=name)
    else:
        print("✅ Superuser already exists.")
