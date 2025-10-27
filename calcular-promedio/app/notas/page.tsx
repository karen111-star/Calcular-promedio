"use client";

import { useEffect, useState } from "react";
import {
  agregarNota,
  obtenerNotas,
  eliminarNota,
  Nota,
} from "@/src/notas";
import { obtenerMaterias } from "@/src/materias";
import "./NotasPage.css";

export default function NotasPage() {
  const [notas, setNotas] = useState<Nota[]>([]);
  const [materia, setMateria] = useState("");
  const [etiqueta, setEtiqueta] = useState("");
  const [notaValue, setNotaValue] = useState(0);
  const [porcentaje, setPorcentaje] = useState(0);
  const [materias, setMaterias] = useState<any[]>([]);

  useEffect(() => {
    cargarNotas();
    cargarMaterias();
  }, []);

  const cargarNotas = async () => {
    try {
      const data = await obtenerNotas();
      setNotas(data);
    } catch (error) {
      console.error("Error al obtener notas:", error);
    }
  };

  const cargarMaterias = async () => {
    try {
      const data = await obtenerMaterias();
      setMaterias(data);
    } catch (error) {
      console.error("Error al obtener materias:", error);
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
    <main className="notas-container">
      <h1 className="titulo-notas">📒 Mis Notas</h1>

      {/* Formulario */}
      <div className="form-notas">
        <input
          type="text"
          placeholder="Materia"
          value={materia}
          onChange={(e) => setMateria(e.target.value)}
        />
        <input
          type="text"
          placeholder="Etiqueta"
          value={etiqueta}
          onChange={(e) => setEtiqueta(e.target.value)}
        />
        <input
          type="number"
          placeholder="Nota"
          value={notaValue}
          onChange={(e) => setNotaValue(Number(e.target.value))}
        />
        <input
          type="number"
          placeholder="Porcentaje"
          value={porcentaje}
          onChange={(e) => setPorcentaje(Number(e.target.value))}
        />
        <button onClick={handleAgregarNota}>➕ Agregar</button>
      </div>

      {/* Lista de notas */}
      {notas.length === 0 ? (
        <p className="sin-notas">No hay notas guardadas todavía.</p>
      ) : (
        <ul className="lista-notas">
          {notas.map((n) => (
            <li key={n.id} className="nota-item">
              <div className="info-nota">
                <p><strong>Materia:</strong> {n.materia}</p>
                <p><strong>Etiqueta:</strong> {n.etiqueta}</p>
                <p><strong>Nota:</strong> {n.nota}</p>
                <p><strong>Porcentaje:</strong> {n.porcentaje}%</p>
              </div>
              <button
                onClick={() => handleEliminarNota(n.id)}
                className="btn-eliminar"
              >
                🗑️
              </button>
            </li>
          ))}
        </ul>
      )}

      {/* Promedios finales */}
      <h2 className="titulo-notas">📘 Promedios Finales</h2>
      {materias.length === 0 ? (
        <p className="sin-notas">No hay promedios guardados todavía.</p>
      ) : (
        <ul className="lista-notas">
          {materias.map((m) => (
            <li key={m.id} className="nota-item">
              <div className="info-nota">
                <p><strong>Materia:</strong> {m.materia}</p>
                <p><strong>Nota final:</strong> {m.nota_final}</p>
              </div>
            </li>
          ))}
        </ul>
      )}

      {/* Botón volver */}
      <div className="volver-container">
        <a href="/" className="btn-volver">⬅️ Volver al inicio</a>
      </div>
    </main>
  );
}
