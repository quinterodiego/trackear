"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Course, Class } from "@/types";
import { CourseProgress } from "@/components/CourseProgress";
import { AddClassForm } from "@/components/AddClassForm";
import { ClassList } from "@/components/ClassList";

interface CourseDetailProps {
  params: {
    id: string;
  };
}

export default function CourseDetail({ params }: CourseDetailProps) {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [course, setCourse] = useState<Course | null>(null);
  const [classes, setClasses] = useState<Class[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (status === "loading") return;
    if (!session) {
      router.push("/auth/signin");
      return;
    }

    fetchCourse();
    fetchClasses();
  }, [session, status, router, params.id]);

  const fetchCourse = async () => {
    try {
      const response = await fetch(`/api/courses/${params.id}`);
      if (response.ok) {
        const data = await response.json();
        setCourse(data);
      } else if (response.status === 404) {
        router.push("/dashboard");
      }
    } catch (error) {
      console.error("Error al cargar curso:", error);
    }
  };

  const fetchClasses = async () => {
    try {
      const response = await fetch(`/api/classes?courseId=${params.id}`);
      if (response.ok) {
        const data = await response.json();
        setClasses(data);
      }
    } catch (error) {
      console.error("Error al cargar clases:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleClassAdded = (newClass: Class) => {
    setClasses([...classes, newClass]);
  };

  const handleClassToggle = (classId: string) => {
    setClasses(classes.map(cls => 
      cls.id === classId ? { ...cls, done: !cls.done } : cls
    ));
  };

  if (status === "loading" || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl text-trackear-gray-darkest">Cargando...</div>
      </div>
    );
  }

  if (!session || !course) {
    return null;
  }

  return (
    <div className="min-h-screen bg-trackear-white">
      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          {/* Header del curso */}
          <div className="bg-white shadow-lg rounded-lg p-6 mb-8 border border-trackear-gray-light">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
              <div className="flex-1">
                <button
                  onClick={() => router.push("/dashboard")}
                  className="text-trackear-primary hover:text-trackear-primary-dark mb-4 inline-flex items-center transition-colors"
                >
                  ← Volver al Dashboard
                </button>
                <h1 className="text-3xl font-bold text-trackear-gray-darkest mb-2">
                  {course.title}
                </h1>
                {course.description && (
                  <p className="text-trackear-gray-dark mb-4">
                    {course.description}
                  </p>
                )}
              </div>
              <div className="lg:ml-8">
                <CourseProgress courseId={course.id} />
              </div>
            </div>
          </div>

          {/* Formulario para agregar clase */}
          <div className="bg-white shadow-lg rounded-lg p-6 mb-8 border border-trackear-gray-light">
            <h2 className="text-xl font-semibold text-trackear-gray-darkest mb-4">
              Agregar Nueva Clase
            </h2>
            <AddClassForm courseId={course.id} onClassAdded={handleClassAdded} />
          </div>

          {/* Lista de clases */}
          <div className="bg-white shadow-lg rounded-lg p-6 border border-trackear-gray-light">
            <h2 className="text-xl font-semibold text-trackear-gray-darkest mb-4">
              Clases del Curso
            </h2>
            <ClassList 
              classes={classes} 
              courseId={course.id}
              onClassToggle={handleClassToggle}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
