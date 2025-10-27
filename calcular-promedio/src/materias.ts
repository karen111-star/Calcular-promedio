import { supabase } from "@/src/supabaseClient";

// ✅ Crear una materia con su nota final
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

// ✅ Obtener todas las materias guardadas
export async function obtenerMaterias() {
  const { data, error } = await supabase
    .from("materias")
    .select("*")
    .order("id", { ascending: false });

  if (error) throw error;
  return data;
}

// ✅ Eliminar materia por id
export async function eliminarMateria(id: number) {
  const { data, error } = await supabase
    .from("materias")
    .delete()
    .eq("id", id);

  if (error) throw error;
  return data;
}
