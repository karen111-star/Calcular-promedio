import { supabase } from "@/src/supabaseClient";

export type Nota = {
  id?: number;
  materia: string;
  etiqueta: string;
  nota: number;
  porcentaje: number;
};

// Agregar una nota a la tabla 'notas'
export async function agregarNota(
  materia: string,
  etiqueta: string,
  nota: number,
  porcentaje: number
) {
  const { data, error } = await supabase
    .from("notas")
    .insert([{ materia, etiqueta, nota, porcentaje }]);
  if (error) throw error;
  return data;
}

// Obtener todas las notas guardadas
export async function obtenerNotas() {
  const { data, error } = await supabase
    .from("notas")
    .select("*")
    .order("id", { ascending: false });
  if (error) throw error;
  return data;
}

// Eliminar una nota por su id
export async function eliminarNota(id: number) {
  const { data, error } = await supabase
    .from("notas")
    .delete()
    .eq("id", id);
  if (error) throw error;
  return data;
}
