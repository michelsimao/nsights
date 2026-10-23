import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router';
import { useDebounced } from './useApi.js';

/**
 * Filtros e página de uma lista guardados na query string: links compartilháveis e
 * voltar/avançar do navegador funcionando. Qualquer mudança de filtro volta à página 1.
 */
export function useQueryState() {
  const [params, setParams] = useSearchParams();
  const page = Math.max(1, Number.parseInt(params.get('page') ?? '1', 10) || 1);

  function update(changes, { keepPage = false } = {}) {
    const next = new URLSearchParams(params);
    for (const [key, value] of Object.entries(changes)) {
      next.delete(key);
      for (const v of Array.isArray(value) ? value : [value]) if (v) next.append(key, v);
    }
    if (!keepPage) next.delete('page');
    setParams(next);
  }

  const setPage = (p) => {
    update({ page: p > 1 ? String(p) : '' }, { keepPage: true });
    window.scrollTo({ top: 0 });
  };

  return { params, page, update, setPage, reset: (keep = {}) => setParams(keep) };
}

/** Campo de busca ligado ao parâmetro `q`: responde na hora, grava na URL após uma pausa. */
export function useSearchParam({ params, update }) {
  const fromUrl = params.get('q') ?? '';
  const [value, setValue] = useState(fromUrl);
  const debounced = useDebounced(value);
  useEffect(() => {
    if (debounced.trim() !== fromUrl) update({ q: debounced.trim() });
  }, [debounced]); // eslint-disable-line react-hooks/exhaustive-deps
  // Voltar/avançar (ou "limpar filtros") muda a URL: o campo acompanha.
  useEffect(() => setValue(fromUrl), [fromUrl]);
  return [value, setValue];
}
