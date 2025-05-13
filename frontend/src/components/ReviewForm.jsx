import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axiosInstance from "../api/axiosInstance";

const ReviewForm = ({ courseId }) => {
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  const queryClient = useQueryClient();

  const { mutate, isLoading } = useMutation({
    mutationFn: async () => {
      const response = await axiosInstance.post(
        `/courses/${courseId}/reviews/`,
        {
          rating,
          comment,
        }
      );
      return response.data;
    },
    onSuccess: () => {
      setSuccessMsg("✅ Reseña enviada correctamente.");
      setComment("");
      setRating(5);
      queryClient.invalidateQueries(["reviews", courseId]); // 🔁 Refrescar la lista
    },
    onError: (error) => {
      console.error(error);
      setErrorMsg(
        "❌ Error al enviar la reseña. Ya la has enviado o no tienes acceso."
      );
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrorMsg("");
    setSuccessMsg("");
    mutate();
  };

  return (
    <form onSubmit={handleSubmit} className="bg-gray-50 p-4 rounded shadow-md">
      {errorMsg && <p className="text-red-600 mb-2">{errorMsg}</p>}
      {successMsg && <p className="text-green-600 mb-2">{successMsg}</p>}

      <label className="block mb-2 text-sm font-medium text-gray-700">
        Valoración (1–5):
        <select
          value={rating}
          onChange={(e) => setRating(Number(e.target.value))}
          className="ml-2 p-1 border rounded"
        >
          {[1, 2, 3, 4, 5].map((num) => (
            <option key={num} value={num}>
              {num} ★
            </option>
          ))}
        </select>
      </label>

      <label className="block mb-2 text-sm font-medium text-gray-700">
        Comentario:
        <textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          rows="4"
          className="w-full mt-1 p-2 border rounded resize-none"
          placeholder="¿Qué te pareció este curso?"
        ></textarea>
      </label>

      <button
        type="submit"
        disabled={isLoading}
        className="mt-3 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
      >
        {isLoading ? "Enviando..." : "Enviar Reseña"}
      </button>
    </form>
  );
};

export default ReviewForm;
