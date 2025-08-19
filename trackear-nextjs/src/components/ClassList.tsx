"use client";

import { Class } from "@/types";
import { CheckIcon } from "@heroicons/react/24/outline";

interface ClassListProps {
  classes: Class[];
  courseId: string;
  onClassToggle: (classId: string) => void;
}

export function ClassList({ classes, courseId, onClassToggle }: ClassListProps) {
  const handleToggle = async (classId: string) => {
    try {
      const response = await fetch(`/api/classes/${classId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ courseId }),
      });

      if (response.ok) {
        onClassToggle(classId);
      } else {
        const error = await response.json();
        alert("Error al actualizar clase: " + (error.error || "Error desconocido"));
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Error al actualizar clase");
    }
  };

  if (classes.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-trackear-gray">
          No hay clases en este curso aún. ¡Agrega la primera clase!
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-2">
      {classes.map((classItem) => (
        <div
          key={classItem.id}
          className={`flex items-center p-4 border rounded-lg cursor-pointer transition-colors ${
            classItem.done
              ? "bg-trackear-primary bg-opacity-10 border-trackear-primary border-opacity-30"
              : "bg-white border-trackear-gray-light hover:bg-trackear-gray-light hover:bg-opacity-30"
          }`}
          onClick={() => handleToggle(classItem.id)}
        >
          <div className="flex items-center justify-center w-6 h-6 mr-3">
            {classItem.done ? (
              <div className="w-6 h-6 bg-trackear-primary rounded-full flex items-center justify-center">
                <CheckIcon className="w-4 h-4 text-trackear-gray-darkest" />
              </div>
            ) : (
              <div className="w-6 h-6 border-2 border-trackear-gray-light rounded-full"></div>
            )}
          </div>
          
          <div className="flex-1">
            <h3
              className={`font-medium ${
                classItem.done ? "text-trackear-gray-darkest line-through" : "text-trackear-gray-darkest"
              }`}
            >
              {classItem.title}
            </h3>
          </div>

          <div className="text-sm text-trackear-gray">
            {classItem.done ? "Completada" : "Pendiente"}
          </div>
        </div>
      ))}

      <div className="mt-6 p-4 bg-trackear-primary bg-opacity-10 border border-trackear-primary border-opacity-30 rounded-lg">
        <div className="flex justify-between items-center text-sm">
          <span className="font-medium text-trackear-gray-darkest">Progreso total:</span>
          <span className="text-trackear-gray-dark">
            {classes.filter(c => c.done).length} de {classes.length} clases completadas
          </span>
        </div>
        <div className="mt-2 w-full bg-trackear-gray-light rounded-full h-2">
          <div
            className="bg-trackear-primary h-2 rounded-full transition-all duration-300"
            style={{
              width: `${classes.length > 0 ? (classes.filter(c => c.done).length / classes.length) * 100 : 0}%`
            }}
          ></div>
        </div>
      </div>
    </div>
  );
}
