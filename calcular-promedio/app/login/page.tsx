"use client";
import { useState } from "react";
import { supabase } from "@/src/supabaseClient";
import "./login.css"; // 👈 Importamos los estilos

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const registrar = async () => {
    const { error } = await supabase.auth.signUp({ email, password });
    if (error) alert("❌ Error en registro: " + error.message);
    else alert("✅ Usuario registrado correctamente");
  };

  const iniciarSesion = async () => {
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) alert("❌ Error al iniciar sesión: " + error.message);
    else alert("✅ Sesión iniciada");
  };

  return (
    <main className="login-container">
      <div className="login-box">
        <h1 className="login-title">🔐 Registro / Login</h1>

        <input
          className="login-input"
          placeholder="Correo electrónico"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          className="login-input"
          placeholder="Contraseña"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <div className="login-buttons">
          <button className="btn btn-register" onClick={registrar}>
            Registrar
          </button>
          <button className="btn btn-login" onClick={iniciarSesion}>
            Iniciar Sesión
          </button>
        </div>
      </div>
    </main>
  );
}
