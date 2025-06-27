import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";

const Courses = () => {
  const navigate = useNavigate();
  const { user } = useAuth()
  const [cursos, setCursos] = useState([]);

  const [nuevoCurso, setNuevoCurso] = useState("");

  const agregarCurso = async () => {
    if (!nuevoCurso.trim()) return;

    try {
      const token = localStorage.getItem("token-trackear");

      const res = await fetch("http://localhost:5000/api/courses", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ title: nuevoCurso }),
      });

      if (!res.ok) {
        throw new Error("Error al crear curso");
      }
      const nuevo = await res.json();
      setCursos([...cursos, { ...nuevo, clases: [] }]); // solo tiene id y titulo por ahora
      console.log(cursos)
      setNuevoCurso("");
    } catch (err) {
      console.error("Error al agregar curso:", err);
      alert("Hubo un problema al guardar el curso");
    }
  };

  useEffect(() => {
    console.log('user', user)
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
    <div className="p-6 w-2xl mx-auto pt-24">
      <div className="mb-6">
        <h2 className="text-lg text-gray-600 font-semibold mb-2">Agregar nuevo curso</h2>
        <div className="flex gap-2">
          <input
            type="text"
            id="title"
            name="title"
            placeholder="Nombre del curso"
            value={nuevoCurso}
            onChange={(e) => setNuevoCurso(e.target.value)}
            className="border border-gray-300 rounded px-3 py-2 w-full"
          />
          <button
            onClick={agregarCurso}
            className="bg-tertiary hover:bg-tertiary-hover hover:cursor-pointer text-white px-4 py-2 rounded hover:bg-emerald-700 transition"
          >
            Agregar
          </button>
        </div>
      </div>
      <hr className="mb-4 border border-gray-300" />
      <h1 className="text-2xl text-gray-600 font-bold mb-6">Mis Cursos</h1>
      <div className="grid gap-4">
        {cursos.length > 0 && cursos.map((curso) => {
          const total = curso.clases?.length || 0;
          const hechas = curso.clases?.filter((c) => c.hecha).length || 0;
          const progreso = hechas === 0 && total === 0 ? 0 : Math.round((hechas / total) * 100);
          
          return (
            <div
              key={curso.id}
              className="bg-white p-4 rounded-xl shadow-md border border-gray-300"
            >
              <div className="flex justify-between items-center">
                <div>
                  <h2 className="text-xl text-gray-600 font-semibold">{curso.title}</h2>
                  <p className="text-sm text-gray-600">
                    {hechas} de {total} clases hechas ({progreso}%)
                  </p>
                </div>
                <button onClick={() => navigate(`/curso/${curso.id}`)} className="bg-secondary text-white px-4 py-2 rounded-lg hover:bg-primary-hover transition hover:cursor-pointer">
                  Ver clases
                </button>
              </div>
              <div className="mt-3 bg-gray-200 rounded-full h-3 w-full">
                <div
                  className="bg-secondary h-3 rounded-full transition-all"
                  style={{ width: `${progreso}%` }}
                ></div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Courses