"use client";
import "./Home.css";

export default function Home() {
  return (
    <main className="pestaña-principal">
      <div className="botones-grid">
        <a href="/calcular" className="boton-cuadro">
          <div className="icono-circulo rojo">🧮</div>
          <span>Cálculo Rápido</span>
        </a>

        <a href="/notas" className="boton-cuadro">
          <div className="icono-circulo amarillo">📒</div>
          <span>Mis Notas</span>
        </a>

        <a href="/configuracion" className="boton-cuadro">
          <div className="icono-circulo azul">⚙️</div>
          <span>Configuración</span>
        </a>

        <a href="/login" className="boton-cuadro">
          <div className="icono-circulo verde">🚪</div>
          <span>Salir</span>
        </a>
      </div>
    </main>
  );
}
