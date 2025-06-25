import { useState } from "react";

export const AddClassForm = () => {
   const [titulo, setTitulo] = useState("");
  const [loading, setLoading] = useState(false);

  const handleAgregar = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("http://localhost:5000/api/classes", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token-trackear")}`,
        },
        body: JSON.stringify({ cursoId, titulo }),
      });

      const data = await res.json();
      if (res.ok) {
        setTitulo("");
        onClaseAgregada?.(data.clase);
      } else {
        alert(data.error || "Error al agregar clase");
      }
    } catch (err) {
      console.error("Error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleAgregar} className="flex gap-2 mb-4">
      <input
        type="text"
        className="border p-2 rounded w-full"
        value={titulo}
        onChange={(e) => setTitulo(e.target.value)}
        placeholder="Título de la clase"
        required
      />
      <button
        type="submit"
        className="bg-emerald-500 text-white px-4 py-2 rounded"
        disabled={loading}
      >
        {loading ? "Agregando..." : "Agregar"}
      </button>
    </form>
  );
}
