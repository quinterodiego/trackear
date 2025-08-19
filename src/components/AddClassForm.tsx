"use client";

import { useState } from "react";
import { Class } from "@/types";

interface AddClassFormProps {
  courseId: string;
  onClassAdded: (newClass: Class) => void;
}

export function AddClassForm({ courseId, onClassAdded }: AddClassFormProps) {
  const [title, setTitle] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    setLoading(true);

    try {
      const response = await fetch("/api/classes", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          courseId,
          title: title.trim(),
        }),
      });

      if (response.ok) {
        const newClass = await response.json();
        onClassAdded(newClass);
        setTitle("");
      } else {
        const error = await response.json();
        alert("Error al crear clase: " + (error.error || "Error desconocido"));
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Error al crear clase");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-4">
      <div className="flex-1">
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          placeholder="Título de la clase"
          required
        />
      </div>
      <button
        type="submit"
        disabled={loading || !title.trim()}
        className="px-4 py-2 bg-trackear-primary text-trackear-gray-darkest rounded-md bg-trackear-primary-hover focus:outline-none focus:ring-2 focus:ring-trackear-primary-400 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200 font-medium trackear-shadow"
      >
        {loading ? "Agregando..." : "Agregar"}
      </button>
    </form>
  );
}
