// src/materias.ts
import { supabase } from "@/src/supabaseClient";

export type Materia = {
  id?: number;
  usuario_id?: string;
  materia: string;
  nota_final: number;
};

// Crear materia con nota final
export async function crearMateria(
  usuario_id: string | null,
  materia: string,
  nota_final: number
) {
  const { data, error } = await supabase
    .from("materias")
    .insert([{ usuario_id, materia, nota_final }]);
  if (error) throw error;
  return data;
}

// Eliminar materia
export async function eliminarMateria(id: number) {
  const { data, error } = await supabase.from("materias").delete().eq("id", id);
  if (error) throw error;
  return data;
}

// Obtener todas las materias
export async function obtenerMaterias() {
  const { data, error } = await supabase.from("materias").select("*");
  if (error) throw error;
  return data;
}
