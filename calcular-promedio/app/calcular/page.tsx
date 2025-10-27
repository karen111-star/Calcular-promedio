"use client";
import { useState } from "react";
import { supabase } from "@/src/supabaseClient";
import "./calcular.css";

export default function CalcularPage() {
  const [asignatura, setAsignatura] = useState("");
  const [notas, setNotas] = useState([
    { etiqueta: "", valor: "", porcentaje: "" },
  ]);
  const [promedio, setPromedio] = useState<number | null>(null);

  // 🔹 Calcular el promedio
  const calcularPromedio = () => {
    const notasNumericas = notas.map((n) => ({
      valor: parseFloat(n.valor) || 0,
      porcentaje: parseFloat(n.porcentaje) || 0,
    }));

    const totalPorcentaje = notasNumericas.reduce((a, n) => a + n.porcentaje, 0);
    const total = notasNumericas.reduce(
      (a, n) => a + n.valor * (n.porcentaje / 100),
      0
    );

    if (isNaN(total) || isNaN(totalPorcentaje) || totalPorcentaje === 0) {
      setPromedio(0);
    } else {
      setPromedio(parseFloat(total.toFixed(2)));
    }
  };

  // 🔹 Agregar una nueva nota
  const agregarNota = () =>
    setNotas([...notas, { etiqueta: "", valor: "", porcentaje: "" }]);

  // 🔹 Borrar todas las notas
  const borrarNotas = () =>
    setNotas([{ etiqueta: "", valor: "", porcentaje: "" }]);

  // 🔹 Guardar notas y promedio en Supabase
  const guardarEnSupabase = async () => {
    try {
      // 1️⃣ Guardar cada nota en la tabla "notas"
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

      // 2️⃣ Calcular el promedio final
      const notasNumericas = notas.map((n) => ({
        valor: parseFloat(n.valor) || 0,
        porcentaje: parseFloat(n.porcentaje) || 0,
      }));
      const totalPorcentaje = notasNumericas.reduce(
        (a, n) => a + n.porcentaje,
        0
      );
      const total = notasNumericas.reduce(
        (a, n) => a + n.valor * (n.porcentaje / 100),
        0
      );
      const promedioFinal =
        isNaN(total) || isNaN(totalPorcentaje) || totalPorcentaje === 0
          ? 0
          : parseFloat(total.toFixed(2));

      // 3️⃣ Insertar o actualizar en la tabla "materias"
      const nombreMateria = asignatura || "Sin asignatura";

      const { data: existente, error: selectError } = await supabase
        .from("materias")
        .select("id")
        .eq("materia", nombreMateria)
        .maybeSingle();

      if (selectError) {
        console.error("❌ Error al verificar materia existente:", selectError.message);
      }

      if (existente) {
        // Si ya existe, actualizar la nota_final
        const { error: updateError } = await supabase
          .from("materias")
          .update({ nota_final: promedioFinal })
          .eq("id", existente.id);
        if (updateError)
          console.error("❌ Error al actualizar materia:", updateError.message);
      } else {
        // Si no existe, insertar una nueva
        const { error: insertError } = await supabase.from("materias").insert([
          {
            materia: nombreMateria,
            nota_final: promedioFinal,
          },
        ]);
        if (insertError)
          console.error("❌ Error al insertar materia:", insertError.message);
      }

      alert(`✅ Notas y promedio guardados (${nombreMateria}: ${promedioFinal})`);
    } catch (err) {
      console.error("⚠️ Error general:", err);
    }
  };

  // 🔹 Interfaz
  return (
    <main className="pantalla p-6 text-center bg-blue-100 min-h-screen">
      <div className="encabezado flex justify-between items-center mb-6">
        <h1 className="titulo text-2xl font-bold">Cálculo Rápido</h1>
        <button
          onClick={guardarEnSupabase}
          className="boton-guardar bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
          title="Guardar notas"
        >
          💾
        </button>
      </div>

      {/* Asignatura */}
      <div className="mb-4">
        <input
          placeholder="Asignatura (opcional)"
          className="entrada border p-2 rounded w-full"
          value={asignatura}
          onChange={(e) => setAsignatura(e.target.value)}
        />
      </div>

      {/* Campos para cada nota */}
      {notas.map((n, i) => (
        <div key={i} className="fila mb-4 border p-4 rounded bg-white shadow">
          <input
            placeholder="Etiqueta (ej. Parcial 1)"
            className="entrada border p-2 m-1 rounded w-full"
            value={n.etiqueta}
            onChange={(e) => {
              const copia = [...notas];
              copia[i].etiqueta = e.target.value;
              setNotas(copia);
            }}
          />
          <input
            placeholder="Nota"
            className="entrada border p-2 m-1 rounded w-full"
            value={n.valor}
            onChange={(e) => {
              const copia = [...notas];
              copia[i].valor = e.target.value;
              setNotas(copia);
            }}
          />
          <input
            placeholder="Porcentaje (%)"
            className="entrada border p-2 m-1 rounded w-full"
            value={n.porcentaje}
            onChange={(e) => {
              const copia = [...notas];
              copia[i].porcentaje = e.target.value;
              setNotas(copia);
            }}
          />
        </div>
      ))}

      {/* Botones */}
      <div className="botones mt-4">
        <button
          className="btn bg-yellow-500 text-white px-4 py-2 rounded m-2"
          onClick={agregarNota}
        >
          + Agregar
        </button>

        <button
          className="btn bg-blue-500 text-white px-4 py-2 rounded m-2"
          onClick={calcularPromedio}
        >
          Calcular
        </button>

        <button
          className="btn bg-red-500 text-white px-4 py-2 rounded m-2"
          onClick={borrarNotas}
        >
          Borrar todo
        </button>
      </div>

      {/* Promedio final */}
      {promedio !== null && (
        <h2 className="resultado text-xl mt-6">Promedio Final: {promedio}</h2>
      )}

      {/* Volver */}
      <div className="mt-8">
        <a
          href="/"
          className="volver bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
        >
          ⬅️ Volver al inicio
        </a>
      </div>
    </main>
  );
}
