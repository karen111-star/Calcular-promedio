"use client";

import React, { useState } from "react";
import "./calcular.css";
import Link from "next/link";

export default function CalculoPage() {
  const [asignatura, setAsignatura] = useState("");
  const [filas, setFilas] = useState([{ nota: "", porcentaje: "", etiqueta: "" }]);
  const [resultado, setResultado] = useState<number | null>(null);
  const [mostrarEtiquetas, setMostrarEtiquetas] = useState(false);

  const agregarFila = () => {
    setFilas([...filas, { nota: "", porcentaje: "", etiqueta: "" }]);
  };

  const eliminarFila = (index: number) => {
    const nuevas = filas.filter((_, i) => i !== index);
    setFilas(nuevas);
  };

  const calcularPromedio = () => {
    let total = 0;
    let sumaPesos = 0;

    filas.forEach((fila) => {
      const nota = parseFloat(fila.nota) || 0;
      const peso = parseFloat(fila.porcentaje) || 0;
      total += nota * peso;
      sumaPesos += peso;
    });

    const promedio = sumaPesos > 0 ? total / sumaPesos : 0;
    setResultado(Number(promedio.toFixed(3)));
  };

  const borrarTodo = () => {
    setAsignatura("");
    setFilas([{ nota: "", porcentaje: "", etiqueta: "" }]);
    setResultado(null);
  };

  const actualizarFila = (index: number, campo: string, valor: string) => {
    const nuevas = [...filas];
    nuevas[index] = { ...nuevas[index], [campo]: valor };
    setFilas(nuevas);
  };

  return (
    <main className="contenedor">
      <div className="barra-superior">
        <div className="barra-top">
          <Link href="/" className="volver">←</Link>
          <div className="acciones-superior">
            <Link href="/login" className="iniciar-sesion">Iniciar sesión</Link>
            <Link href="/guardar" className="guardar">
              <img src="/icons/guardar.png" alt="Guardar" className="icono" />
              Guardar
            </Link>
          </div>
        </div>
        <h1 className="nota-final">{resultado !== null ? resultado : "0.00"}</h1>
      </div>

      <div className="asignatura">
        <label>Asignatura:</label>
        <input
          type="text"
          value={asignatura}
          onChange={(e) => setAsignatura(e.target.value)}
          placeholder="Ej: Matemáticas"
        />
      </div>

      <table>
        <thead>
          <tr>
            <th>Nota</th>
            <th>Porcentaje (%)</th>
            {mostrarEtiquetas && <th>Etiqueta</th>}
            <th></th>
          </tr>
        </thead>
        <tbody>
          {filas.map((fila, index) => (
            <tr key={index}>
              <td>
                <input
                  type="number"
                  value={fila.nota}
                  onChange={(e) => actualizarFila(index, "nota", e.target.value)}
                  placeholder="0.0"
                  min="0"
                  max="100"
                  step="0.01"
                />
              </td>
              <td>
                <input
                  type="number"
                  value={fila.porcentaje}
                  onChange={(e) => actualizarFila(index, "porcentaje", e.target.value)}
                  placeholder="0.2"
                  min="0"
                  max="1"
                  step="0.01"
                />
              </td>
              {mostrarEtiquetas && (
                <td>
                  <input
                    type="text"
                    value={fila.etiqueta}
                    onChange={(e) => actualizarFila(index, "etiqueta", e.target.value)}
                    placeholder="Ej: Parcial 1"
                  />
                </td>
              )}
              <td>
                <button className="eliminar" onClick={() => eliminarFila(index)}>❌</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="barra-botones">
        <button className="flotante" onClick={agregarFila}>➕</button>

        <div className="botonera">
          <div className="izquierda">
            <label className="etiquetas-toggle">
              <input
                type="checkbox"
                checked={mostrarEtiquetas}
                onChange={(e) => setMostrarEtiquetas(e.target.checked)}
              />
              Etiquetas
            </label>
            <button className="borrar" onClick={borrarTodo}>BORRAR TODO</button>
          </div>

          <div className="derecha">
            <button className="calcular-nota" onClick={calcularPromedio}>CALCULAR NOTA</button>
            <button className="calcular" onClick={calcularPromedio}>CALCULAR</button>
          </div>
        </div>
      </div>

      <div className="barra-inferior"></div>
    </main>
  );
}
