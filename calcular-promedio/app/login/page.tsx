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

  // Registrar usuario
  const registrar = async () => {
    const { data, error } = await supabase.auth.signUp({ email, password });

    if (error) {
      alert("❌ Error al registrarse: " + error.message);
      return;
    }

    // ✅ Insertar también en la tabla "usuarios" usando el mismo UUID
    const { error: insertError } = await supabase.from("usuarios").insert([
      {
        id: data.user?.id, // usa el mismo id del usuario auth
        nombre: email.split("@")[0], // ejemplo: nombre tomado del correo
        correo: email,
      },
    ]);

    if (insertError) {
      alert("⚠️ Usuario creado en Auth pero no en tabla usuarios: " + insertError.message);
    } else {
      alert("✅ Usuario registrado correctamente");
    }
  };

  // Iniciar sesión
  const iniciarSesion = async () => {
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) {
      alert("❌ Error al iniciar sesión: " + error.message);
      return;
    }
    // devuelve la sesión y avisamos al padre
    onLogin(data.session);
  };

  return (
    <div className="bg-white p-8 rounded-xl shadow-md w-80 flex flex-col items-center">
      <h1 className="text-2xl font-bold mb-4 text-center">🔐 Registro / Login</h1>

      <input
        className="border p-2 mb-2 rounded w-full"
        placeholder="Correo electrónico"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        className="border p-2 mb-4 rounded w-full"
        placeholder="Contraseña"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <div className="flex space-x-2 mb-4">
        <button
          onClick={registrar}
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          Registrar
        </button>
        <button
          onClick={iniciarSesion}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Iniciar Sesión
        </button>
      </div>

      <button onClick={onClose} className="text-gray-500 text-sm hover:text-gray-700">
        Cerrar
      </button>
    </div>
  );
}
