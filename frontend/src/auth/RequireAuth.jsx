import { Navigate, useLocation } from 'react-router';
import { Button, Spinner } from '../ds/index.js';
import { useAuth } from './AuthContext.jsx';

/** Protege as rotas internas: sem sessão, manda para /login lembrando o destino. */
export function RequireAuth({ children }) {
  const auth = useAuth();
  const location = useLocation();

  if (auth.status === 'checking') {
    return (
      <FullScreen>
        <Spinner label="Restaurando a sessão…" />
      </FullScreen>
    );
  }
  if (auth.status === 'unavailable') {
    return (
      <FullScreen>
        <div className="auth-card" style={{ animation: 'none', maxWidth: '27rem' }}>
          <p className="eyebrow">Servidor indisponível</p>
          <h1 style={{ fontSize: '1.6rem', marginTop: '.5rem' }}>Não foi possível restaurar a sessão</h1>
          <p className="auth-card-intro">
            A API não respondeu. Sua sessão continua salva; tente de novo em instantes.
          </p>
          <div style={{ display: 'flex', gap: '.75rem', marginTop: '1.5rem', flexWrap: 'wrap' }}>
            <Button onClick={auth.retry}>Tentar novamente</Button>
            <Button variant="secondary" onClick={auth.logout}>
              Sair
            </Button>
          </div>
        </div>
      </FullScreen>
    );
  }
  if (auth.status !== 'authenticated') {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }
  return children;
}

function FullScreen({ children }) {
  return (
    <main style={{ background: 'var(--surface)', display: 'grid', minHeight: '100dvh', padding: '1rem', placeItems: 'center' }}>
      {children}
    </main>
  );
}
