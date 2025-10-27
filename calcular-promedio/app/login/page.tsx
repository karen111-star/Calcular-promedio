"use client";
import { useState } from "react";
import { supabase } from "@/src/supabaseClient";
import "./login.css";

type Props = {
  onLogin: (session: any) => void;
  onClose: () => void;
};

export default function LoginPage({ onLogin, onClose }: Props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const registrar = async () => {
    const { data, error } = await supabase.auth.signUp({ email, password });
    if (error) return alert("❌ " + error.message);

    const { error: insertError } = await supabase.from("usuarios").insert([
      {
        id: data.user?.id,
        nombre: email.split("@")[0],
        correo: email,
      },
    ]);

    if (insertError) alert("⚠️ " + insertError.message);
    else alert("✅ Usuario registrado correctamente");
  };

  const iniciarSesion = async () => {
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) return alert("❌ " + error.message);
    onLogin(data.session);
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h1>🔐 Registro / Login</h1>

        <input
          type="email"
          placeholder="Correo electrónico"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <div className="button-group">
          <button className="btn-registrar" onClick={registrar}>
            Registrar
          </button>
          <button className="btn-login" onClick={iniciarSesion}>
            Iniciar Sesión
          </button>
        </div>

        <button className="btn-close" onClick={onClose}>
          Cerrar
        </button>
      </div>
    </div>
  );
}
