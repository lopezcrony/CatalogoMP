import type { User } from '@supabase/supabase-js';
import { supabase } from '../client';
import { requireSupabaseData, throwIfSupabaseError } from '../errors';

export async function login(email: string, password: string): Promise<User> {
  const { data, error } = await supabase.auth.signInWithPassword({ email, password });
  throwIfSupabaseError(error);
  return requireSupabaseData(data.user, 'No se pudo iniciar sesión.');
}

export async function logout(): Promise<void> {
  const { error } = await supabase.auth.signOut();
  throwIfSupabaseError(error);
}

export async function obtenerUsuarioActual(): Promise<User | null> {
  const { data, error } = await supabase.auth.getUser();
  if (error && error.message !== 'Auth session missing!') throw new Error(error.message);
  return data.user;
}

export async function esAdministrador(): Promise<boolean> {
  const user = await obtenerUsuarioActual();
  if (!user) return false;
  const { data, error } = await supabase.from('perfiles').select('rol').eq('id', user.id).maybeSingle();
  throwIfSupabaseError(error);
  return data?.rol === 'admin';
}
