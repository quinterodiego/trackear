import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import CourseProgress from "../components/CourseProgress";

const Dashboard = () => {

  const [cursos, setCursos] = useState([]);
  
  useEffect(() => {
    const fetchCursos = async () => {
      const token = localStorage.getItem("token-trackear");
      if (!token) return;

      try {
        const res = await fetch("http://localhost:5000/api/courses", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (!res.ok) throw new Error("Error al obtener cursos");
        const data = await res.json();
        setCursos(data);
      } catch (err) {
        console.error("Error cargando cursos:", err);
        alert("No se pudieron cargar los cursos");
      }
    };

    fetchCursos();
  }, []);

  return (
    <div className="p-6">
      <div className="mb-6">
        <h2 className="text-lg text-gray-600 font-semibold mb-2">DASHBOARD</h2>
        
        {cursos.map((curso) => (
          <div key={curso.id}>
            <h2>{curso.title}</h2>
            <CourseProgress cursoId={curso.id} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;