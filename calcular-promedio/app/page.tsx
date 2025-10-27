"use client";
import "./Home.css"; 

export default function Home() {
  return (
    <main className="pestaña-principal">
      <a href="/calcular" className="boton-cuadro rojo">
        🧮<br />Cálculo Rápido
      </a>
      <a href="/notas" className="boton-cuadro amarillo">
        💾<br />Mis Notas
      </a>
      <a href="/configuracion" className="boton-cuadro azul">
        ⚙️<br />Configuración
      </a>
      <a href="/login" className="boton-cuadro verde">
        🚪<br />Salir
      </a>
    </main>
  );
}
