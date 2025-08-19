"use client";

import { useState } from "react";
import { Course } from "@/types";

interface AddCourseFormProps {
  onCourseAdded: (course: Course) => void;
}

export function AddCourseForm({ onCourseAdded }: AddCourseFormProps) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    setLoading(true);

    try {
      const response = await fetch("/api/courses", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: title.trim(),
          description: description.trim() || undefined,
        }),
      });

      if (response.ok) {
        const newCourse = await response.json();
        onCourseAdded(newCourse);
        setTitle("");
        setDescription("");
      } else {
        const error = await response.json();
        alert("Error al crear curso: " + (error.error || "Error desconocido"));
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Error al crear curso");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
            Título del curso *
          </label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="Ej: Curso de React"
            required
          />
        </div>
        
        <div>
          <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
            Descripción (opcional)
          </label>
          <input
            type="text"
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="Descripción del curso"
          />
        </div>
      </div>
      
      <div className="flex justify-end">
        <button
          type="submit"
          disabled={loading || !title.trim()}
          className="px-4 py-2 bg-trackear-primary text-trackear-gray-darkest rounded-md bg-trackear-primary-hover focus:outline-none focus:ring-2 focus:ring-trackear-primary-400 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200 font-medium trackear-shadow"
        >
          {loading ? "Creando..." : "Crear Curso"}
        </button>
      </div>
    </form>
  );
}
