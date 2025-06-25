import { PieChart, Pie, Cell } from "recharts";
import { useEffect, useState } from "react";

const COLORS = ["#68c3b7", "#f0f0f0"];

const CourseProgress = ({ cursoId }) => {
  const [progreso, setProgreso] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return;

    fetch(`http://localhost:3000/courses/${cursoId}/progress`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then(setProgreso)
      .catch((err) => console.error("Error al cargar progreso", err));
  }, [cursoId]);

  if (!progreso) return <p>Cargando progreso...</p>;

  const data = [
    { name: "Hechas", value: progreso.hechas },
    { name: "Restantes", value: progreso.total - progreso.hechas },
  ];

  return (
    <div className="flex flex-col items-center gap-2">
      <PieChart width={120} height={120}>
        <Pie
          data={data}
          innerRadius={40}
          outerRadius={60}
          paddingAngle={2}
          dataKey="value"
        >
          {data.map((_, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
      </PieChart>
      <p className="text-sm">{progreso.porcentaje}% completado</p>
    </div>
  );
}

export default CourseProgress