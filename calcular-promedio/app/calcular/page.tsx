"use client";

import { useState } from "react";
import { supabase } from "@/src/supabaseClient";
import { crearMateria } from "@/src/materias";
import Link from "next/link";
import "./calcular.css";

export default function CalcularPage() {
  const [asignatura, setAsignatura] = useState("");
  const [notas, setNotas] = useState([{ etiqueta: "", valor: "", porcentaje: "" }]);
  const [promedio, setPromedio] = useState<number | null>(null);

  // 🔹 Calcular el promedio y guardar en "materias"
  const calcularPromedio = async () => {
    const notasNumericas = notas.map((n) => ({
      valor: parseFloat(n.valor) || 0,
      porcentaje: parseFloat(n.porcentaje) || 0,
    }));

    const totalPorcentaje = notasNumericas.reduce((a, n) => a + n.porcentaje, 0);
    const total = notasNumericas.reduce(
      (a, n) => a + n.valor * (n.porcentaje / 100),
      0
    );

    const promedioFinal =
      isNaN(total) || isNaN(totalPorcentaje) || totalPorcentaje === 0
        ? 0
        : parseFloat(total.toFixed(2));

    setPromedio(promedioFinal);

    try {
      await crearMateria(null, asignatura || "Sin asignatura", promedioFinal);
      console.log("✅ Promedio guardado en materias");
    } catch (error) {
      console.error("❌ Error al guardar promedio:", error);
    }
  };

  // 🔹 Agregar una nueva nota
  const agregarNota = () =>
    setNotas([...notas, { etiqueta: "", valor: "", porcentaje: "" }]);

  // 🔹 Borrar todas las notas
  const borrarNotas = () => {
    setNotas([{ etiqueta: "", valor: "", porcentaje: "" }]);
    setPromedio(null);
  };

  // 🔹 Guardar notas individuales en Supabase
  const guardarEnSupabase = async () => {
    try {
      for (const n of notas) {
        const valorNum = parseFloat(n.valor);
        const porcentajeNum = parseFloat(n.porcentaje);
        if (!isNaN(valorNum) && !isNaN(porcentajeNum)) {
          const { error } = await supabase.from("notas").insert([
            {
              materia: asignatura || "Sin asignatura",
              etiqueta: n.etiqueta || "Sin etiqueta",
              nota: valorNum,
              porcentaje: porcentajeNum,
            },
          ]);
          if (error) console.error("❌ Error al guardar nota:", error.message);
        }
      }

      alert("✅ Notas guardadas correctamente en Supabase");
    } catch (err) {
      console.error("⚠️ Error general:", err);
    }
  };

  // 🔹 Eliminar una fila individual
  const eliminarNota = (index: number) => {
    const nuevas = notas.filter((_, i) => i !== index);
    setNotas(nuevas);
  };

  return (
    <main className="contenedor">
      {/* 🔹 Barra superior con nota final */}
      <div className="barra-superior">
        <div className="barra-top">
          <Link href="/" className="volver">←</Link>
          <div className="acciones-superior">
            <span
              className="guardar-emoji"
              onClick={guardarEnSupabase}
              title="Guardar notas"
            >
              💾
            </span>
            <Link href="/login" className="iniciar-sesion">Iniciar sesión</Link>
          </div>
        </div>
        <h1 className="nota-final">
          {promedio !== null ? promedio.toFixed(2) : "0.00"}
        </h1>
      </div>

      {/* 🔹 Asignatura */}
      <div className="asignatura">
        <label>Asignatura:</label>
        <input
          type="text"
          value={asignatura}
          onChange={(e) => setAsignatura(e.target.value)}
          placeholder="Ej: Matemáticas"
        />
      </div>

      {/* 🔹 Tabla de notas */}
      <table>
        <thead>
          <tr>
            <th>Etiqueta</th>
            <th>Nota</th>
            <th>Porcentaje (%)</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {notas.map((n, i) => (
            <tr key={i}>
              <td>
                <input
                  type="text"
                  value={n.etiqueta}
                  onChange={(e) => {
                    const copia = [...notas];
                    copia[i].etiqueta = e.target.value;
                    setNotas(copia);
                  }}
                  placeholder="Ej: Parcial 1"
                />
              </td>
              <td>
                <input
                  type="number"
                  value={n.valor}
                  onChange={(e) => {
                    const copia = [...notas];
                    copia[i].valor = e.target.value;
                    setNotas(copia);
                  }}
                  placeholder="4.5"
                  min="0"
                  max="5"
                  step="0.01"
                />
              </td>
              <td>
                <input
                  type="number"
                  value={n.porcentaje}
                  onChange={(e) => {
                    const copia = [...notas];
                    copia[i].porcentaje = e.target.value;
                    setNotas(copia);
                  }}
                  placeholder="20"
                  min="0"
                  max="100"
                  step="1"
                />
              </td>
              <td>
                <button
                  className="eliminar"
                  onClick={() => eliminarNota(i)}
                >
                  ❌
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* 🔹 Barra inferior con botones */}
      <div className="barra-botones">
        <button className="flotante" onClick={agregarNota}>➕</button>

        <div className="botonera">
          <div className="izquierda">
            <button className="borrar" onClick={borrarNotas}>BORRAR TODO</button>
          </div>

          <div className="derecha">
            <button className="calcular-nota" onClick={calcularPromedio}>CALCULAR NOTA</button>
          </div>
        </div>
      </div>

      <div className="barra-inferior"></div>
    </main>
  );
}
