import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { useContext } from "react";
import axiosInstance from "../api/axiosInstance";
import { CartContext } from "../context/CartContext";
import { AuthContext } from "../context/AuthContext";
import ReviewList from "../components/ReviewList";
import ReviewForm from "../components/ReviewForm";

const fetchCourseDetail = async (id) => {
  const response = await axiosInstance.get(`/courses/${id}/`);
  return response.data;
};

const CourseDetail = () => {
  const { id } = useParams();
  const { addToCart } = useContext(CartContext);
  const { isAuthenticated } = useContext(AuthContext);

  const {
    data: course,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["course", id],
    queryFn: () => fetchCourseDetail(id),
  });

  if (isLoading) return <p className="text-center mt-10">Cargando curso...</p>;
  if (error)
    return (
      <p className="text-center text-red-500 mt-10">Error al cargar el curso</p>
    );

  return (
    <div className="max-w-5xl mx-auto p-6 bg-white rounded-xl shadow-sm mt-10">
      {/* Cabecera del curso */}
      <div className="flex flex-col md:flex-row gap-6">
        {course.image && (
          <img
            src={course.image}
            alt={course.title}
            className="w-full md:w-1/2 h-64 object-cover rounded-lg"
          />
        )}

        <div className="flex-1">
          <h1 className="text-2xl font-semibold text-gray-800 mb-2">
            {course.title}
          </h1>
          <p className="text-sm text-gray-600 mb-4">{course.description}</p>

          <p className="text-lg font-bold text-green-600 mb-2">
            {course.price} €
          </p>

          {course.category && (
            <p className="text-sm text-gray-500 mb-1">
              <span className="font-medium">Categoría:</span>{" "}
              {course.category_name}
            </p>
          )}

          {course.tags?.length > 0 && (
            <div className="mt-2 flex flex-wrap gap-2">
              {course.tags.map((tag) => (
                <span
                  key={tag.id}
                  className="bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded-full"
                >
                  {tag.name}
                </span>
              ))}
            </div>
          )}

          <div className="mt-4 flex gap-4">
            <button
              onClick={() => addToCart(course)}
              className="bg-green-600 hover:bg-green-700 text-white text-sm px-4 py-2 rounded"
            >
              🛒 Comprar curso
            </button>
            <a
              href="/courses"
              className="text-sm text-gray-600 hover:underline"
            >
              ← Volver
            </a>
          </div>
        </div>
      </div>

      {/* Reseñas */}
      <div className="mt-10 border-t pt-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Reseñas</h2>
        <ReviewList courseId={id} />
        {isAuthenticated ? (
          <div className="mt-6">
            <h3 className="text-md font-medium text-gray-700 mb-2">
              Deja tu reseña
            </h3>
            <ReviewForm courseId={id} />
          </div>
        ) : (
          <p className="text-gray-500 text-sm mt-4">
            Inicia sesión para dejar una reseña.
          </p>
        )}
      </div>
    </div>
  );
};

export default CourseDetail;
