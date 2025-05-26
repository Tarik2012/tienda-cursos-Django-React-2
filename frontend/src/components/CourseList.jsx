import React from "react";
import { useQuery } from "@tanstack/react-query";
import axiosInstance from "../api/axiosInstance";
import { Link } from "react-router-dom";

const fetchCourses = async () => {
  const response = await axiosInstance.get("/courses/");
  return response.data;
};

const CourseList = () => {
  const {
    data: courses,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["courses"],
    queryFn: fetchCourses,
  });

  if (isLoading) return <p className="text-center mt-10">Cargando cursos...</p>;
  if (error)
    return (
      <p className="text-center text-red-500 mt-10">Error al cargar cursos</p>
    );

  return (
    <>
      <div className="w-full min-h-screen bg-gray-50 py-10 px-4">
        <h2 className="text-3xl font-bold mb-8 text-center text-blue-700">
          Listado de Cursos
        </h2>

        {/* Grid responsive */}
        <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 max-w-7xl mx-auto">
          {courses.map((course) => (
            <Link to={`/courses/${course.id}`} key={course.id}>
              <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-all">
                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                  {course.title}
                </h3>
                <p className="text-gray-600 text-sm mb-3">
                  {course.description.length > 100
                    ? course.description.slice(0, 100) + "..."
                    : course.description}
                </p>
                <p className="text-blue-600 font-bold">{course.price} €</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
};

export default CourseList;
