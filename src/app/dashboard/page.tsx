"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Course } from "@/types";
import { CourseProgress } from "@/components/CourseProgress";
import { AddCourseForm } from "@/components/AddCourseForm";
import Link from "next/link";

export default function Dashboard() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (status === "loading") return;
    if (!session) {
      router.push("/auth/signin");
      return;
    }

    fetchCourses();
  }, [session, status, router]);

  const fetchCourses = async () => {
    try {
      const response = await fetch("/api/courses");
      if (response.ok) {
        const data = await response.json();
        setCourses(data);
      }
    } catch (error) {
      console.error("Error al cargar cursos:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleCourseAdded = (newCourse: Course) => {
    setCourses([...courses, newCourse]);
  };

  if (status === "loading" || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl text-trackear-gray-darkest">Cargando...</div>
      </div>
    );
  }

  if (!session) {
    return null;
  }

  return (
    <div className="min-h-screen bg-trackear-white">
      <div className="max-w-7xl mx-auto py-4 sm:py-6 px-4 sm:px-6 lg:px-8">
        <div className="py-4 sm:py-6">
          <div className="mb-6 sm:mb-8">
            <h1 className="text-2xl sm:text-3xl font-bold text-trackear-gray-darkest">
              ¡Hola, {session.user?.name}!
            </h1>
            <p className="mt-2 text-sm sm:text-base text-trackear-gray-dark">
              Aquí tienes un resumen de tus cursos y progreso.
            </p>
          </div>

          {/* Formulario para agregar curso */}
          <div className="bg-white shadow-lg rounded-lg p-4 sm:p-6 mb-6 sm:mb-8 border border-trackear-gray-light">
            <h2 className="text-lg sm:text-xl font-semibold text-trackear-gray-darkest mb-4">
              Agregar Nuevo Curso
            </h2>
            <AddCourseForm onCourseAdded={handleCourseAdded} />
          </div>

          {/* Lista de cursos */}
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6">
            {courses.length === 0 ? (
              <div className="col-span-full">
                <div className="text-center py-8 sm:py-12">
                  <h3 className="text-base sm:text-lg font-medium text-trackear-gray-darkest mb-2">
                    No tienes cursos aún
                  </h3>
                  <p className="text-sm sm:text-base text-trackear-gray-dark px-4">
                    Comienza creando tu primer curso para hacer seguimiento de tu aprendizaje.
                  </p>
                </div>
              </div>
            ) : (
              courses.map((course) => (
                <div
                  key={course.id}
                  className="bg-white shadow-lg rounded-lg p-4 sm:p-6 hover:shadow-xl transition-shadow border border-trackear-gray-light"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <h3 className="text-base sm:text-lg font-semibold text-trackear-gray-darkest mb-2">
                        {course.title}
                      </h3>
                      {course.description && (
                        <p className="text-trackear-gray-dark text-xs sm:text-sm mb-4">
                          {course.description}
                        </p>
                      )}
                    </div>
                  </div>

                  <CourseProgress courseId={course.id} />

                  <div className="mt-4 flex justify-between items-center">
                    <Link
                      href={`/courses/${course.id}`}
                      className="text-sm sm:text-base text-trackear-primary hover:text-trackear-primary-dark font-medium transition-colors"
                    >
                      Ver detalles →
                    </Link>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
