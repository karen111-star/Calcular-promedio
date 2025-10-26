import { supabase } from '@/src/supabaseClient'; 

export async function crearUsuario(nombre: string, correo: string) {
  return await supabase.from('usuarios').insert([{ nombre, correo }]);
}
