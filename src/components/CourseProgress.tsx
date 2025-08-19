"use client";

import { useEffect, useState } from "react";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";
import { CourseProgress as CourseProgressType } from "@/types";

interface CourseProgressProps {
  courseId: string;
}

const COLORS = ["#BAFF39", "#6E6E6E"]; // Yellow-green for completed, gray for remaining

export function CourseProgress({ courseId }: CourseProgressProps) {
  const [progress, setProgress] = useState<CourseProgressType | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProgress();
  }, [courseId]);

  const fetchProgress = async () => {
    try {
      const response = await fetch(`/api/courses/${courseId}/progress`);
      if (response.ok) {
        const data = await response.json();
        setProgress(data);
      }
    } catch (error) {
      console.error("Error al cargar progreso:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-24">
        <div className="text-sm text-trackear-gray">Cargando progreso...</div>
      </div>
    );
  }

  if (!progress) {
    return (
      <div className="flex items-center justify-center h-24">
        <div className="text-sm text-trackear-gray">Error al cargar progreso</div>
      </div>
    );
  }

  const data = [
    { name: "Completadas", value: progress.hechas },
    { name: "Pendientes", value: progress.totalClases - progress.hechas },
  ];

  return (
    <div className="flex flex-col items-center">
      <div className="w-24 h-24">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={30}
              outerRadius={40}
              paddingAngle={2}
              dataKey="value"
            >
              {data.map((_, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
      </div>
      
      <div className="text-center mt-2">
        <div className="text-2xl font-bold text-trackear-gray-darkest">
          {progress.progreso}%
        </div>
        <div className="text-sm text-trackear-gray">
          {progress.hechas} de {progress.totalClases} clases
        </div>
      </div>
    </div>
  );
}
