"use client";
import { useState } from "react";
import { supabase } from "@/src/supabaseClient";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const registrar = async () => {
    const { error } = await supabase.auth.signUp({ email, password });
    if (error) alert("Error en registro: " + error.message);
    else alert("✅ Usuario registrado correctamente");
  };

  const iniciarSesion = async () => {
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) alert("Error al iniciar sesión: " + error.message);
    else alert("✅ Sesión iniciada");
  };

  return (
    <main className="flex flex-col items-center p-8">
      <h1 className="text-2xl font-bold mb-6">🔐 Registro / Login</h1>

      <input
        className="border p-2 m-2 rounded"
        placeholder="Correo"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <input
        className="border p-2 m-2 rounded"
        placeholder="Contraseña"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <div className="mt-4">
        <button className="bg-green-500 text-white px-4 py-2 m-2 rounded" onClick={registrar}>
          Registrar
        </button>
        <button className="bg-blue-500 text-white px-4 py-2 m-2 rounded" onClick={iniciarSesion}>
          Iniciar Sesión
        </button>
      </div>
    </main>
  );
}
