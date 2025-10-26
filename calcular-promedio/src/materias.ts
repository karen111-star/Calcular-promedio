import { supabase } from '@/src/supabaseClient'; 


export async function crearMateria(usuario_id: string, nombre: string) {
  return await supabase.from('materias').insert([{ usuario_id, nombre }]);
}

export async function eliminarMateria(id: string) {
  return await supabase.from('materias').delete().eq('id', id);
}
