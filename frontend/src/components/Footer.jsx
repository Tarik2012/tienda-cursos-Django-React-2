import React from "react";

const Footer = () => {
  return (
    <footer className="bg-gray-100 border-t border-gray-300 py-6 mt-12 text-center text-sm text-gray-700">
      <div className="container mx-auto px-4">
        <p>
          &copy; {new Date().getFullYear()} Tienda de Cursos. Todos los derechos
          reservados.
        </p>
        <p className="mt-2">
          Desarrollado por{" "}
          <span className="font-semibold text-gray-800">Tarek</span>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
