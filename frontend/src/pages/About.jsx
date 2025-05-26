import React from "react";

const About = () => {
  return (
    <div className="px-4 sm:px-8 py-10 max-w-5xl mx-auto text-gray-800">
      <h1 className="text-3xl sm:text-4xl font-bold mb-6 text-center">
        Sobre <span className="text-indigo-600">TariTech</span>
      </h1>

      {/* Introducción */}
      <p className="mb-6 text-lg leading-relaxed text-justify">
        <strong>TariTech</strong> es una plataforma de aprendizaje online
        especializada en cursos de programación y desarrollo web. Nuestra misión
        es ofrecer formación práctica, accesible y moderna para personas que
        desean iniciar o avanzar su carrera en tecnología.
      </p>

      {/* Qué ofrecemos */}
      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-3">🚀 ¿Qué ofrecemos?</h2>
        <ul className="list-disc list-inside space-y-2">
          <li>Cursos actualizados de desarrollo web y backend</li>
          <li>Panel de usuario con historial de compras</li>
          <li>Diseño responsive y experiencia intuitiva</li>
          <li>Autenticación segura con JSON Web Tokens (JWT)</li>
          <li>
            Dashboard interactivo con visualización de datos en tiempo real
          </li>
        </ul>
      </div>

      {/* Tecnologías */}
      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-3">💻 Tecnologías usadas</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-gray-700">
          <span>✅ Django & Django REST Framework</span>
          <span>✅ React + Vite</span>
          <span>✅ Tailwind CSS</span>
          <span>✅ JWT Authentication</span>
          <span>✅ Recharts para gráficas</span>
          <span>✅ PostgreSQL (opcional)</span>
        </div>
      </div>

      {/* Visión futura */}
      <div className="mb-12">
        <h2 className="text-2xl font-semibold mb-3">📈 Visión futura</h2>
        <p className="leading-relaxed text-justify">
          El objetivo a largo plazo de TariTech es convertirse en una referencia
          para estudiantes de tecnología de habla hispana. Planeamos integrar
          funcionalidades avanzadas como pagos en línea, sistema de
          recomendaciones personalizadas, y nuevos módulos de Data Science,
          DevOps, y más.
        </p>
      </div>

      {/* Sobre el desarrollador */}
      <div className="border-t pt-8">
        <h2 className="text-2xl font-semibold mb-3">
          👨‍💻 Sobre el desarrollador
        </h2>
        <p className="text-justify leading-relaxed text-gray-700">
          Este proyecto fue desarrollado por <strong>Tarek</strong>, un
          apasionado por la programación con experiencia en tecnologías como{" "}
          <strong>Python</strong>,<strong> Django</strong>,{" "}
          <strong>React</strong> y <strong>Tailwind CSS</strong>. Actualmente
          está ampliando sus conocimientos en <strong>análisis de datos</strong>{" "}
          con herramientas como <strong>Pandas</strong>, <strong>NumPy</strong>{" "}
          y <strong>scikit-learn</strong>.
        </p>

        <p className="mt-4 text-justify text-gray-700">
          Este proyecto forma parte de su portafolio personal, con el objetivo
          de mostrar sus habilidades como{" "}
          <strong>desarrollador fullstack</strong> y futuro{" "}
          <strong>analista de datos</strong>. Tarek es autodidacta, perseverante
          y está en constante aprendizaje, buscando oportunidades para crecer en
          el mundo tech.
        </p>
      </div>
    </div>
  );
};

export default About;
