import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

const CourseDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [curso, setCurso] = useState(null);
  const [clases, setClases] = useState(curso?.clases || []);

  const toggleClase = (index) => {
    const nuevas = [...clases];
    nuevas[index].hecha = !nuevas[index].hecha;
    setClases(nuevas);
  };

  const total = clases.length;
  const hechas = clases.filter((c) => c.hecha).length;
  const progreso = Math.round((hechas / total) * 100);

  useEffect(() => {
    const fetchCurso = async () => {
      const token = localStorage.getItem("token-trackear");
      if (!token) return;
      try {
        const res = await fetch(`http://localhost:5000/api/classes/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (!res.ok) throw new Error("Error al obtener el curso");
        const data = await res.json();
        setCurso(data);
      } catch (err) {
        console.error("Error cargando curso:", err);
        alert("No se pudo cargar el curso");
      }
    };

    fetchCurso();
  }, []);

  if (!curso) return <p>Curso no encontrado.</p>;

  return (
    <div className="p-6">
      <button
        onClick={() => navigate(-1)}
        className="text-sm text-secondary mb-4 flex gap-2 hover:text-primary-hover hover:cursor-pointer border border-secondary hover:border-primary-hover px-3 py-2 rounded-lg transition"
      >
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-4">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 15 3 9m0 0 6-6M3 9h12a6 6 0 0 1 0 12h-3" />
        </svg>
        Volver
      </button>

      <h1 className="text-2xl font-bold mb-2">{curso.titulo}</h1>
      <p className="text-gray-600 mb-4">
        {hechas} de {total} clases hechas ({progreso}%)
      </p>

      <div className="mt-2 bg-gray-200 rounded-full h-3 w-full mb-6">
        <div
          className="bg-secondary h-3 rounded-full transition-all"
          style={{ width: `${progreso}%` }}
        ></div>
      </div>

      <ul className="space-y-2">
        {clases.map((clase, index) => (
          <li
            key={index}
            className="flex items-center justify-between bg-white p-3 rounded-lg shadow border border-secondary hover:border-primary-hover transition"
          >
            <span>{clase.titulo}</span>
            <input
              id="checkbox"
              type="checkbox" 
              checked={clase.hecha}
              onChange={() => toggleClase(index)}
              className="w-5 h-5 accent-primary bg-gray-100 border-gray-300 rounded-sm focus:ring-blue-500 dark:focus:ring-primary dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600 hover:cursor-pointer" />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CourseDetail;