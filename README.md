# 🛒 TariTech - Tienda de Cursos Online

Aplicación web completa para gestionar una tienda de cursos online, con:

- ✅ Registro e inicio de sesión (JWT)
- ✅ Recuperación de contraseña por email
- ✅ Listado y búsqueda de cursos
- ✅ Reseñas y carrito de compras
- ✅ Backend Django REST Framework
- ✅ Frontend React + Vite + TailwindCSS

## 🚀 Tecnologías usadas

- **Frontend:** React, Vite, TailwindCSS, Axios
- **Backend:** Django, Django REST Framework, SimpleJWT
- **Base de datos:** SQLite
- **Email Service:** SMTP Gmail (App Password)

## 📦 Instalación del proyecto

### 1. Clonar el repositorio

```bash
git clone https://github.com/tu-usuario/tu-repositorio.git
cd tu-repositorio


2. Backend (Django)
cd backend
python -m venv env
env\Scripts\activate  # Windows
# source env/bin/activate  # Linux/Mac

pip install -r requirements.txt
python manage.py migrate
python manage.py runserver

3. Frontend (React)
cd ../frontend
npm install
npm run dev

 Configuración SMTP (Gmail)
 En backend/settings.py:
EMAIL_BACKEND = 'django.core.mail.backends.smtp.EmailBackend'
EMAIL_HOST = 'smtp.gmail.com'
EMAIL_PORT = 587
EMAIL_USE_TLS = True
EMAIL_HOST_USER = 'tuemail@gmail.com'
EMAIL_HOST_PASSWORD = 'tu-app-password'
DEFAULT_FROM_EMAIL = 'noreply@taritech.com'

🌐 Rutas de la API
Usuarios
POST /api/users/register/

POST /api/users/token/

POST /api/users/logout/

GET /api/users/me/

POST /api/users/password-reset/

POST /api/users/reset-password/<uid>/<token>/

Cursos
GET /api/courses/

GET /api/courses/search/?q=python

GET /api/courses/<id>/

POST /api/courses/<id>/reviews/

🛒 Funcionalidades completadas
 Login / Logout (JWT)

 Recuperación de contraseña

 Buscador de cursos en tiempo real

 Sistema de reseñas

 Carrito de compras (React Context)

 Panel de usuario (datos y pedidos)

 🗂️ Estructura del proyecto
 tienda/
├── backend/           # Django API (users, courses, settings)
├── frontend/          # React App (components, pages, context)
└── README.md

🛠️ Comandos útiles
# Crear superusuario Django
python manage.py createsuperuser

# Ejecutar backend Django
python manage.py runserver

# Ejecutar frontend React
npm run dev

📝 Desarrollado por
Tarek — 2025
Proyecto educativo para portfolio profesional.

📄 Licencia
MIT License
```
