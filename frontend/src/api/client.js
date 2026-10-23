// Cliente HTTP da API. Todas as chamadas passam por `api()`:
// - injeta o token Bearer guardado em localStorage;
// - converte o envelope de erro do backend ({"error": {...}}) em ApiError;
// - avisa o contexto de autenticação quando a API recusa o token (401).

const BASE_URL = import.meta.env.VITE_API_URL ?? '';
const TOKEN_KEY = 'riskops.token';

export class ApiError extends Error {
  /**
   * @param {number} status HTTP status (0 = sem resposta da API)
   * @param {{code?: string, message?: string, details?: any, request_id?: string}} [body]
   */
  constructor(status, body = {}) {
    super(body.message || 'Erro inesperado. Tente novamente.');
    this.name = 'ApiError';
    this.status = status;
    this.code = body.code || 'unknown_error';
    this.details = body.details ?? null;
    this.requestId = body.request_id ?? null;
  }
}

export const tokenStore = {
  get: () => safeStorage(() => localStorage.getItem(TOKEN_KEY)),
  set: (token) => safeStorage(() => localStorage.setItem(TOKEN_KEY, token)),
  clear: () => safeStorage(() => localStorage.removeItem(TOKEN_KEY)),
  key: TOKEN_KEY,
};

function safeStorage(fn) {
  try {
    return fn();
  } catch {
    return null; // modo privado / storage bloqueado: a sessão só não sobrevive ao reload
  }
}

/** Segundos até o `exp` do JWT; null se o token não for legível. Não valida assinatura. */
export function tokenSecondsLeft(token) {
  try {
    const payload = JSON.parse(atob(token.split('.')[1].replace(/-/g, '+').replace(/_/g, '/')));
    return typeof payload.exp === 'number' ? payload.exp - Date.now() / 1000 : null;
  } catch {
    return null;
  }
}

let unauthorizedHandler = null;

/** Registrado pelo AuthProvider: chamado quando a API recusa o token enviado. */
export function onUnauthorized(handler) {
  unauthorizedHandler = handler;
  return () => {
    if (unauthorizedHandler === handler) unauthorizedHandler = null;
  };
}

/**
 * @param {string} path ex.: '/api/cases'
 * @param {{method?: string, json?: any, form?: Record<string, string>, query?: Record<string, any>, signal?: AbortSignal}} [opts]
 */
export async function api(path, { method = 'GET', json, form, query, signal } = {}) {
  const headers = { Accept: 'application/json' };
  const token = tokenStore.get();
  if (token) headers.Authorization = `Bearer ${token}`;

  let body;
  if (json !== undefined) {
    headers['Content-Type'] = 'application/json';
    body = JSON.stringify(json);
  } else if (form) {
    body = new URLSearchParams(form);
  }

  let response;
  try {
    response = await fetch(BASE_URL + path + buildQuery(query), { method, headers, body, signal });
  } catch (err) {
    if (err.name === 'AbortError') throw err;
    throw new ApiError(0, {
      code: 'network_error',
      message: 'Não foi possível falar com o servidor. Verifique a conexão e tente novamente.',
    });
  }

  const data = response.status === 204 ? null : await response.json().catch(() => null);
  if (response.ok) return data;

  const error = new ApiError(response.status, data?.error ?? { message: `Erro ${response.status}.` });
  // Só derruba a sessão se havia token: o 401 do próprio login é erro de credencial.
  if (response.status === 401 && token && unauthorizedHandler) unauthorizedHandler(error);
  throw error;
}

function buildQuery(query) {
  if (!query) return '';
  const params = new URLSearchParams();
  for (const [key, value] of Object.entries(query)) {
    if (value === undefined || value === null || value === '') continue;
    for (const v of Array.isArray(value) ? value : [value]) params.append(key, String(v));
  }
  const qs = params.toString();
  return qs ? `?${qs}` : '';
}
