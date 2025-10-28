"use client";

import { useEffect, useState } from "react";
import { obtenerNotas, eliminarNota, Nota } from "@/src/notas";
import { obtenerMaterias } from "@/src/materias";
import "./NotasPage.css";

export default function NotasPage() {
  const [notas, setNotas] = useState<Nota[]>([]);
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

  const handleEliminarNota = async (id?: number) => {
    if (!id) return;
    try {
      await eliminarNota(id);
      setNotas(notas.filter((n) => n.id !== id));
    } catch (error) {
      console.error("Error al eliminar nota:", error);
    }
  };

  // 🔹 Agrupar las notas por materia
  const notasPorMateria = notas.reduce((acc, nota) => {
    if (!acc[nota.materia]) acc[nota.materia] = [];
    acc[nota.materia].push(nota);
    return acc;
  }, {} as Record<string, Nota[]>);

  return (
    <main className="notas-container">
      <h1 className="titulo-notas">📒 Mis Notas</h1>

      {Object.keys(notasPorMateria).length === 0 ? (
        <p className="sin-notas">No hay notas guardadas todavía.</p>
      ) : (
        Object.keys(notasPorMateria).map((materia) => {
          const notasMateria = notasPorMateria[materia];
          const promedioMateria = materias.find(
            (m) => m.materia === materia
          );

          return (
            <div key={materia} className="materia-card">
              <h2 className="materia-nombre">{materia}</h2>
              <table className="tabla-notas">
                <thead>
                  <tr>
                    <th>Etiqueta</th>
                    <th>Nota</th>
                    <th>Porcentaje</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {notasMateria.map((n) => (
                    <tr key={n.id}>
                      <td>{n.etiqueta}</td>
                      <td>{n.nota}</td>
                      <td>{n.porcentaje}%</td>
                      <td>
                        <button
                          onClick={() => handleEliminarNota(n.id)}
                          className="btn-eliminar"
                        >
                          ❌
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              {/* 🔹 Mostrar nota final debajo de la tabla */}
              <p className="nota-final-texto">
                <strong>Nota Final:</strong>{" "}
                {promedioMateria ? promedioMateria.nota_final.toFixed(2) : "0.00"}
              </p>
            </div>
          );
        })
      )}

      {/* Botón volver */}
      <div className="volver-container">
        <a href="/" className="btn-volver">⬅️ Volver al inicio</a>
      </div>
    </main>
  );
}
