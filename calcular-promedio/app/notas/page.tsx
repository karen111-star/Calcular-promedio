"use client";
import { useEffect, useState } from "react";
import { agregarNota, obtenerNotas, eliminarNota, Nota } from "@/src/notas";

export default function NotasPage() {
  const [notas, setNotas] = useState<Nota[]>([]);
  const [materia, setMateria] = useState("");
  const [etiqueta, setEtiqueta] = useState("");
  const [notaValue, setNotaValue] = useState(0);
  const [porcentaje, setPorcentaje] = useState(0);

  // Cargar las notas al iniciar
  useEffect(() => {
    cargarNotas();
  }, []);

  const cargarNotas = async () => {
    try {
      const data = await obtenerNotas();
      setNotas(data);
    } catch (error) {
      console.error("Error al obtener notas:", error);
    }
  };

  const handleAgregarNota = async () => {
    if (!materia || !etiqueta) {
      alert("Debes completar materia y etiqueta");
      return;
    }
    try {
      await agregarNota(materia, etiqueta, notaValue, porcentaje);
      await cargarNotas();
      setMateria("");
      setEtiqueta("");
      setNotaValue(0);
      setPorcentaje(0);
    } catch (error) {
      console.error("Error al agregar nota:", error);
    }
  };

  const handleEliminarNota = async (id?: number) => {
    if (!id) return;
    try {
      await eliminarNota(id);
      setNotas(notas.filter((n) => n.id !== id));
    } catch (error) {
      console.error("Error al eliminar nota:", error);
    }
  };

  return (
    <main className="p-8 bg-yellow-50 min-h-screen text-center">
      <h1 className="text-2xl font-bold mb-6">📒 Mis Notas</h1>

      {/* Formulario para agregar nota */}
      <div className="mb-6 bg-white shadow rounded p-4 inline-block">
        <input
          type="text"
          placeholder="Materia"
          value={materia}
          onChange={(e) => setMateria(e.target.value)}
          className="border px-2 py-1 mr-2"
        />
        <input
          type="text"
          placeholder="Etiqueta"
          value={etiqueta}
          onChange={(e) => setEtiqueta(e.target.value)}
          className="border px-2 py-1 mr-2"
        />
        <input
          type="number"
          placeholder="Nota"
          value={notaValue}
          onChange={(e) => setNotaValue(Number(e.target.value))}
          className="border px-2 py-1 mr-2 w-20"
        />
        <input
          type="number"
          placeholder="Porcentaje"
          value={porcentaje}
          onChange={(e) => setPorcentaje(Number(e.target.value))}
          className="border px-2 py-1 mr-2 w-20"
        />
        <button
          onClick={handleAgregarNota}
          className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
        >
          ➕ Agregar
        </button>
      </div>

      {/* Lista de notas */}
      {notas.length === 0 ? (
        <p>No hay notas guardadas todavía.</p>
      ) : (
        <ul className="space-y-4">
          {notas.map((n) => (
            <li
              key={n.id}
              className="bg-white shadow rounded p-4 flex justify-between items-center"
            >
              <span>
                <strong>Materia:</strong> {n.materia} <br />
                <strong>Etiqueta:</strong> {n.etiqueta} <br />
                <strong>Nota:</strong> {n.nota} <br />
                <strong>Porcentaje:</strong> {n.porcentaje}%
              </span>
              <button
                onClick={() => handleEliminarNota(n.id)}
                className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
              >
                🗑️
              </button>
            </li>
          ))}
        </ul>
      )}

      <div className="mt-8">
        <a
          href="/"
          className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
        >
          ⬅️ Volver al inicio
        </a>
      </div>
    </main>
  );
}