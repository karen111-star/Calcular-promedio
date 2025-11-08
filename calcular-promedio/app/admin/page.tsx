"use client";
import { useEffect, useState } from "react";
import { supabase } from "@/src/supabaseClient";
import "./AdminPage.css";

export default function AdminPage() {
  const [usuarios, setUsuarios] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUsuarios = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        alert("Debes iniciar sesión");
        window.location.href = "/login";
        return;
      }

      // Verificar si el usuario es admin
      const { data: userData } = await supabase
        .from("usuarios")
        .select("role")
        .eq("id", user.id)
        .single();

      if (userData?.role !== "admin") {
        alert("Acceso denegado");
        window.location.href = "/";
        return;
      }

      // Obtener todos los usuarios
      const { data: usuarios, error } = await supabase
        .from("usuarios")
        .select("nombre, correo, role");
      if (error) alert("Error al obtener usuarios");
      else setUsuarios(usuarios);
      setLoading(false);
    };

    fetchUsuarios();
  }, []);

  if (loading) return <p>Cargando usuarios...</p>;

  return (
    <div style={{ padding: "2rem" }}>
      <h1>👑 Panel de Administración</h1>
      <table border={1} cellPadding={8}>
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Correo</th>
            <th>Rol</th>
          </tr>
        </thead>
        <tbody>
          {usuarios.map((u) => (
            <tr key={u.correo}>
              <td>{u.nombre}</td>
              <td>{u.correo}</td>
              <td>{u.role}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
