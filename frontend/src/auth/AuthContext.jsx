import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { api, onUnauthorized, tokenSecondsLeft, tokenStore } from '../api/client.js';

/**
 * status:
 * - 'checking'      há token salvo e o /me ainda não respondeu
 * - 'authenticated' sessão válida, `user` preenchido
 * - 'anonymous'     sem sessão; `endedReason` diz por que a anterior terminou
 * - 'unavailable'   há token, mas a API não respondeu (rede/servidor): não é logout
 */
const AuthContext = createContext(null);

const REASON_MESSAGES = {
  expired: 'Sua sessão expirou. Entre novamente para continuar.',
  revoked: 'Sua sessão foi encerrada. Entre novamente para continuar.',
};

function initialState() {
  const token = tokenStore.get();
  if (!token) return { status: 'anonymous', user: null, endedReason: null };
  const left = tokenSecondsLeft(token);
  if (left !== null && left <= 0) {
    tokenStore.clear();
    return { status: 'anonymous', user: null, endedReason: 'expired' };
  }
  return { status: 'checking', user: null, endedReason: null };
}

export function AuthProvider({ children }) {
  const [state, setState] = useState(initialState);

  const endSession = useCallback((reason = null) => {
    tokenStore.clear();
    setState({ status: 'anonymous', user: null, endedReason: reason });
  }, []);

  // Restaura a sessão ao recarregar a página.
  useEffect(() => {
    if (state.status !== 'checking') return undefined;
    const ctrl = new AbortController();
    api('/api/auth/me', { signal: ctrl.signal })
      .then((user) => setState({ status: 'authenticated', user, endedReason: null }))
      .catch((err) => {
        if (err.name === 'AbortError') return;
        if (err.status === 401) return; // tratado pelo onUnauthorized abaixo
        setState({ status: 'unavailable', user: null, endedReason: null });
      });
    return () => ctrl.abort();
  }, [state.status]);

  // Qualquer 401 com token (expirado, usuário desativado, segredo trocado) encerra a sessão.
  useEffect(
    () => onUnauthorized((err) => endSession(err.code === 'token_expired' ? 'expired' : 'revoked')),
    [endSession],
  );

  // Expira sozinho no `exp` do JWT, mesmo sem nenhuma chamada à API nesse meio-tempo.
  useEffect(() => {
    if (state.status !== 'authenticated') return undefined;
    const left = tokenSecondsLeft(tokenStore.get());
    if (left === null) return undefined;
    const ms = Math.min(Math.max(left * 1000, 0), 2 ** 31 - 1);
    const timer = setTimeout(() => endSession('expired'), ms);
    return () => clearTimeout(timer);
  }, [state.status, endSession]);

  // Sair em uma aba encerra a sessão nas outras.
  useEffect(() => {
    const onStorage = (event) => {
      if (event.key === tokenStore.key && !event.newValue) endSession(null);
    };
    window.addEventListener('storage', onStorage);
    return () => window.removeEventListener('storage', onStorage);
  }, [endSession]);

  const login = useCallback(async (email, password) => {
    const data = await api('/api/auth/login', {
      method: 'POST',
      form: { username: email, password },
    });
    tokenStore.set(data.access_token);
    setState({ status: 'authenticated', user: data.user, endedReason: null });
    return data.user;
  }, []);

  const value = useMemo(
    () => ({
      ...state,
      endedMessage: state.endedReason ? REASON_MESSAGES[state.endedReason] : null,
      isAdmin: state.user?.role === 'admin',
      login,
      logout: () => endSession(null),
      retry: () => setState((s) => ({ ...s, status: 'checking' })),
    }),
    [state, login, endSession],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth fora do AuthProvider');
  return ctx;
}
