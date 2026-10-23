// Estados de carregamento e de erro no padrão do DS.
import { Alert, Button, Skeleton } from '../ds/index.js';
import { errorMessage } from '../lib/errors.js';

export function ErrorState({ error, onRetry, title = 'Não foi possível carregar os dados' }) {
  return (
    <div style={{ display: 'grid', gap: '.75rem', justifyItems: 'start', padding: '1rem' }}>
      <Alert title={title} tone="danger">
        {errorMessage(error)}
        {error?.requestId ? (
          <>
            {' '}
            Código para suporte: <span className="mono">{error.requestId}</span>.
          </>
        ) : null}
      </Alert>
      {onRetry ? (
        <Button variant="secondary" onClick={onRetry}>
          Tentar novamente
        </Button>
      ) : null}
    </div>
  );
}

/** Linhas pulsando no lugar de uma tabela ou lista que ainda não chegou. */
export function LoadingRows({ rows = 6, label = 'Carregando…' }) {
  return (
    <div aria-busy="true" aria-label={label} role="status" style={{ display: 'grid', gap: '.75rem', padding: '1rem' }}>
      {Array.from({ length: rows }, (_, i) => (
        <Skeleton key={i} shape="wide" />
      ))}
    </div>
  );
}
