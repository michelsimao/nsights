/** URL da lista de casos com filtros (o mesmo formato que a tela lê da query string). */
export function casesHref(filters = {}) {
  const params = new URLSearchParams();
  for (const [key, value] of Object.entries(filters)) {
    for (const v of Array.isArray(value) ? value : [value]) if (v !== undefined && v !== '') params.append(key, v);
  }
  const qs = params.toString();
  return qs ? `/casos?${qs}` : '/casos';
}
