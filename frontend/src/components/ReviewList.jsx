import { useQuery } from "@tanstack/react-query";
import axiosInstance from "../api/axiosInstance";

const fetchReviews = async (courseId) => {
  const response = await axiosInstance.get(`/courses/${courseId}/reviews/`);
  return response.data;
};

const ReviewList = ({ courseId }) => {
  const {
    data: reviews,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["reviews", courseId],
    queryFn: () => fetchReviews(courseId),
  });

  if (isLoading) return <p className="text-gray-500">Cargando reseñas...</p>;
  if (error) return <p className="text-red-500">Error al cargar reseñas</p>;

  if (reviews.length === 0) {
    return <p className="text-gray-600">Este curso aún no tiene reseñas.</p>;
  }

  return (
    <div className="space-y-4">
      {reviews.map((review) => (
        <div
          key={review.id}
          className="bg-gray-50 border p-4 rounded shadow-sm"
        >
          <p className="text-sm text-gray-700 mb-1 font-semibold">
            {review.user_email} —{" "}
            <span className="text-yellow-500">★ {review.rating}</span>
          </p>
          <p className="text-gray-800">{review.comment}</p>
          <p className="text-xs text-gray-500 mt-2">
            {new Date(review.created_at).toLocaleString()}
          </p>
        </div>
      ))}
    </div>
  );
};

export default ReviewList;
