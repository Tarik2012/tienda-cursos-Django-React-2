import { useEffect, useState } from "react";
import { useLocation, Link } from "react-router-dom";
import axiosInstance from "../api/axiosInstance";

function SearchResults() {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const location = useLocation();

  const query = new URLSearchParams(location.search).get("q");

  useEffect(() => {
    const fetchResults = async () => {
      try {
        const response = await axiosInstance.get(`/courses/search/?q=${query}`);
        setResults(response.data);
      } catch (error) {
        console.error("Error buscando cursos:", error);
      } finally {
        setLoading(false);
      }
    };

    if (query) {
      fetchResults();
    }
  }, [query]);

  return (
    <div
      style={{ backgroundColor: "#dfe4e6" }}
      className="min-h-screen py-10 px-4"
    >
      <div className="max-w-5xl mx-auto">
        <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">
          Resultados para: "{query}"
        </h2>

        {loading ? (
          <p className="text-center text-gray-600">Cargando...</p>
        ) : results.length === 0 ? (
          <p className="text-center text-gray-500">No se encontraron cursos.</p>
        ) : (
          <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {results.map((course) => (
              <Link
                to={`/courses/${course.id}`}
                key={course.id}
                className="bg-white rounded-xl shadow-md hover:shadow-xl transition-transform hover:scale-[1.02] overflow-hidden"
              >
                <div className="h-48 w-full overflow-hidden">
                  <img
                    src={course.image}
                    alt={course.title}
                    className="object-cover w-full h-full"
                  />
                </div>
                <div className="p-4">
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">
                    {course.title}
                  </h3>
                  <p className="text-sm text-gray-600 mb-3">
                    {course.description.slice(0, 100)}...
                  </p>
                  <p className="font-bold text-blue-600">{course.price} €</p>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default SearchResults;
