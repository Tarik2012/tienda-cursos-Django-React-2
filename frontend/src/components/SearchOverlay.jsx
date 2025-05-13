import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../api/axiosInstance";

const SearchOverlay = ({ onClose }) => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (query.trim()) {
      navigate(`/search?q=${query}`);
      onClose();
    }
  };

  const goToCourseDetail = (id) => {
    navigate(`/courses/${id}`);
    onClose();
  };

  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      return;
    }

    const delay = setTimeout(async () => {
      try {
        const res = await axiosInstance.get(`/courses/search/?q=${query}`);
        setResults(res.data.slice(0, 5));
      } catch (err) {
        console.error("Error buscando cursos:", err);
      }
    }, 300);

    return () => clearTimeout(delay);
  }, [query]);

  return (
    <div className="fixed inset-0 bg-white z-50 p-6 overflow-y-auto">
      {/* ❌ Botón cerrar */}
      <button
        onClick={onClose}
        className="absolute top-6 right-8 text-3xl text-gray-600 hover:text-black"
      >
        &times;
      </button>

      {/* 🟢 Logo TariTech */}
      <img src="/logo1.png" alt="TariTech" className="h-12 mb-8" />

      {/* 🔍 Barra de búsqueda */}
      <form
        onSubmit={handleSubmit}
        className="flex max-w-3xl mx-auto border-b border-gray-300"
      >
        <input
          type="text"
          placeholder="Buscar cursos..."
          className="flex-grow px-4 py-3 text-xl outline-none"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          autoFocus
        />
        <button
          type="submit"
          className="px-6 py-3 bg-blue-600 text-white text-lg hover:bg-blue-700"
        >
          Buscar
        </button>
      </form>

      {/* 📃 Resultados en vivo */}
      {query && results.length > 0 && (
        <div className="mt-8 max-w-3xl mx-auto">
          <h3 className="text-lg font-semibold mb-3">Resultados:</h3>
          <ul className="space-y-3">
            {results.map((course) => (
              <li
                key={course.id}
                className="border p-4 rounded hover:shadow cursor-pointer"
                onClick={() => goToCourseDetail(course.id)}
              >
                <p className="text-blue-600 font-medium">{course.title}</p>
                <p className="text-gray-600 text-sm">
                  {course.description?.slice(0, 80)}...
                </p>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default SearchOverlay;
