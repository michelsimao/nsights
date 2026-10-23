/**
 * Erros de validação do envelope (`details: [{field, message}]`) indexados pelo
 * nome do campo, para cada `Field` mostrar o seu. Campos aninhados viram o
 * primeiro segmento (`due_at`), e o que não tem campo vai para `_form`.
 */
export function fieldErrors(error) {
  const out = {};
  if (!Array.isArray(error?.details)) return out;
  for (const item of error.details) {
    const key = item.field ? String(item.field).split('.')[0] : '_form';
    if (!out[key]) out[key] = item.message;
  }
  return out;
}

/** Mensagem para um erro sem campo (rede, 403, 409…). */
export function errorMessage(error) {
  if (!error) return null;
  return error.message || 'Erro inesperado. Tente novamente.';
}
