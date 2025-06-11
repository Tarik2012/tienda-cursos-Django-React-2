import os
from django.contrib.auth import get_user_model

User = get_user_model()

username = os.getenv("DJANGO_SU_NAME", "admin")
email = os.getenv("DJANGO_SU_EMAIL", "admin@example.com")
password = os.getenv("DJANGO_SU_PASSWORD", "admin123")

if not User.objects.filter(username=username).exists():
    print("🛠️ Creating superuser...")
    User.objects.create_superuser(username=username, email=email, password=password)
else:
    print("✅ Superuser already exists.")
