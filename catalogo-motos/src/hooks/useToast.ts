import { useCallback, useEffect, useRef, useState } from 'react';

export interface ToastState {
  title: string;
  message: string;
  isError?: boolean;
}

export const useToast = () => {
  const [toast, setToast] = useState<ToastState | null>(null);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const showToast = useCallback((title: string, message: string, isError = false) => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setToast({ title, message, isError });
    timeoutRef.current = setTimeout(() => setToast(null), 4000);
  }, []);

  useEffect(() => () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
  }, []);

  return { toast, showToast };
};
