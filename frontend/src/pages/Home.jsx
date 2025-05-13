import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <main className="bg-gray-50 min-h-screen pt-24 px-4">
      {/* HERO PRINCIPAL */}
      <section className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-extrabold text-gray-800 mb-4">
          🎓 Bienvenido a la Tienda de Cursos
        </h1>
        <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto mb-6">
          Mejora tus habilidades con nuestros cursos prácticos y accesibles.
        </p>
        <Link
          to="/courses"
          className="bg-gray-800 hover:bg-black text-white font-semibold py-2 px-6 rounded-full transition duration-300"
        >
          📚 Ver Cursos
        </Link>
      </section>

      {/* SECCIÓN DE NAVEGACIÓN RÁPIDA */}
      <section className="max-w-4xl mx-auto mb-12 grid gap-4 grid-cols-1 sm:grid-cols-3 text-center">
        <Link
          to="/courses"
          className="bg-white shadow p-4 rounded-xl hover:bg-gray-100 transition"
        >
          <h3 className="font-bold text-gray-800 mb-2">📘 Cursos</h3>
          <p className="text-sm text-gray-600">
            Explora todos los cursos disponibles
          </p>
        </Link>
        <Link
          to="/noticias"
          className="bg-white shadow p-4 rounded-xl hover:bg-gray-100 transition"
        >
          <h3 className="font-bold text-gray-800 mb-2">📰 Noticias</h3>
          <p className="text-sm text-gray-600">
            Actualizaciones y novedades del proyecto
          </p>
        </Link>
        <Link
          to="/user-panel"
          className="bg-white shadow p-4 rounded-xl hover:bg-gray-100 transition"
        >
          <h3 className="font-bold text-gray-800 mb-2">👤 Panel</h3>
          <p className="text-sm text-gray-600">
            Accede a tu cuenta y tus pedidos
          </p>
        </Link>
      </section>

      {/* BENEFICIOS */}
      <section className="max-w-4xl mx-auto text-center mb-12">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">
          ¿Por qué elegirnos?
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-gray-700">
          <p>✅ Cursos prácticos y actualizados</p>
          <p>✅ Aprende a tu ritmo, sin horarios</p>
          <p>✅ Certificado digital al completar</p>
          <p>✅ Acceso de por vida a tus cursos</p>
        </div>
      </section>

      {/* CURSOS DESTACADOS (vacío por ahora) */}
      <section className="max-w-4xl mx-auto text-center">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">
          📌 Cursos Destacados
        </h2>
        <p className="text-gray-500">
          Muy pronto podrás ver aquí los cursos más populares 🔥
        </p>
      </section>
    </main>
  );
};

export default Home;
