import { createContext, useCallback, useContext, useMemo, useRef, useState } from 'react';
import { Toast, ToastStack } from '../ds/index.js';

const ToastContext = createContext(null);
const DURATION = { success: 5000, info: 5000, warning: 8000, danger: 10000 };

/** Avisos transitórios: uma `ToastStack` por aplicação, no máximo 3 avisos. */
export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);
  const seq = useRef(0);

  const dismiss = useCallback((id) => setToasts((list) => list.filter((t) => t.id !== id)), []);

  const notify = useCallback(
    ({ title, body, tone = 'success' }) => {
      const id = ++seq.current;
      setToasts((list) => [...list.slice(-2), { id, title, body, tone }]);
      setTimeout(() => dismiss(id), DURATION[tone] ?? 5000);
    },
    [dismiss],
  );

  const value = useMemo(() => ({ notify }), [notify]);
  return (
    <ToastContext.Provider value={value}>
      {children}
      {toasts.length ? (
        <ToastStack>
          {toasts.map((t) => (
            <Toast key={t.id} onClose={() => dismiss(t.id)} title={t.title} tone={t.tone}>
              {t.body}
            </Toast>
          ))}
        </ToastStack>
      ) : null}
    </ToastContext.Provider>
  );
}

export function useToast() {
  return useContext(ToastContext);
}
