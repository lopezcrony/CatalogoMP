export function throwIfSupabaseError(error: { message: string; code?: string } | null): void {
  if (error) {
    if (error.code === '23505') {
      throw new Error('Ya existe una marca con ese nombre. Usa un nombre único.');
    }
    throw new Error(error.message);
  }
}

export function requireSupabaseData<T>(data: T | null, message: string): T {
  if (data === null) {
    throw new Error(message);
  }
  return data;
}
