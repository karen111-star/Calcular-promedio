'use client';
import { useState, useEffect } from 'react';
import { supabase } from "@/src/supabaseClient";

export default function Configuracion() {
  const [usuarios, setUsuarios] = useState<any[]>([]);

  async function cargarUsuarios() {
    const { data, error } = await supabase.from('usuarios').select('*');
    if (error) console.error(error);
    else setUsuarios(data);
  }

  async function eliminarUsuario(id: number) {
    const confirmacion = confirm('¿Seguro que quieres eliminar este usuario?');
    if (!confirmacion) return;

    const { error } = await supabase.from('usuarios').delete().eq('id', id);
    if (error) alert('Error al eliminar');
    else {
      alert('Usuario eliminado');
      cargarUsuarios(); // recargar la lista
    }
  }

  // ✅ usar useEffect para cargar usuarios al montar el componente
  useEffect(() => {
    cargarUsuarios();
  }, []);

  return (
    <main className="p-4">
      <h1>⚙️ Configuración</h1>
      <h2>Lista de usuarios</h2>

      {usuarios.length === 0 ? (
        <p>No hay usuarios</p>
      ) : (
        <ul>
          {usuarios.map((u) => (
            <li key={u.id}>
              {u.nombre}{' '}
              <button onClick={() => eliminarUsuario(u.id)}>🗑 Eliminar</button>
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}
