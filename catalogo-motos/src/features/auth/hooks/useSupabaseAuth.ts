import { useCallback, useEffect, useState } from 'react';
import { supabase } from '../../../lib/supabase/client';
import { esAdministrador, login, logout } from '../../../lib/supabase/services/auth.service';

export function useSupabaseAuth() {
  const [isLoading, setIsLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);

  const refreshAdminStatus = useCallback(async () => {
    const admin = await esAdministrador();
    setIsAdmin(admin);
  }, []);

  useEffect(() => {
    let active = true;

    const initialize = async () => {
      try {
        await refreshAdminStatus();
      } catch {
        if (active) setIsAdmin(false);
      } finally {
        if (active) setIsLoading(false);
      }
    };

    void initialize();

    const { data: subscription } = supabase.auth.onAuthStateChange(() => {
      void refreshAdminStatus();
    });

    return () => {
      active = false;
      subscription.subscription.unsubscribe();
    };
  }, [refreshAdminStatus]);

  const signIn = useCallback(async (email: string, password: string) => {
    await login(email, password);
    const admin = await esAdministrador();
    if (!admin) {
      await logout();
      throw new Error('El usuario autenticado no tiene permisos de administrador.');
    }
    setIsAdmin(true);
  }, []);

  const signOut = useCallback(async () => {
    await logout();
    setIsAdmin(false);
  }, []);

  return { isLoading, isAdmin, signIn, signOut };
}
