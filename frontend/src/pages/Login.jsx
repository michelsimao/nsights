import { useState } from 'react';
import { Navigate, useLocation } from 'react-router';
import { useAuth } from '../auth/AuthContext.jsx';
import { Button, Field } from '../ds/index.js';
import { usePageTitle } from './usePageTitle.js';

// Composição do split de autenticação do DS (ver ScreenLogin), sem o cartão de MFA.
export function Login() {
  usePageTitle('Entrar');
  const auth = useAuth();
  const location = useLocation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);

  if (auth.status === 'authenticated') {
    const from = location.state?.from;
    const target = from && from.pathname !== '/login' ? `${from.pathname}${from.search ?? ''}` : '/';
    return <Navigate to={target} replace />;
  }

  const onSubmit = async (event) => {
    event.preventDefault();
    setSubmitting(true);
    setError(null);
    try {
      await auth.login(email.trim(), password);
    } catch (err) {
      setError(err.message);
      setPassword('');
      setSubmitting(false);
    }
  };

  const banner = error ?? auth.endedMessage;

  return (
    <main className="auth-shell">
      <section aria-labelledby="auth-brand-heading" className="auth-brand-panel">
        <div className="auth-brand-topline">
          <strong style={{ color: 'var(--on-dark)', fontSize: '1.9rem', fontWeight: 680, letterSpacing: '-.05em', lineHeight: 1 }}>
            n-sights
          </strong>
          <span>Risk Ops</span>
        </div>
        <div className="auth-brand-copy">
          <p>Console de casos de risco</p>
          <h2 id="auth-brand-heading">
            <span>Cada caso,</span>
            <span>da fila à decisão.</span>
          </h2>
          <p>Triagem, análise e parecer de KYC com histórico completo de quem fez o quê.</p>
        </div>
        <div aria-label="Recursos de segurança" className="auth-trust-line">
          <span>Ambiente protegido</span>
          <span>Trilha auditável</span>
        </div>
      </section>

      <section aria-label="Acesso à plataforma" className="auth-access-panel">
        <div className="auth-card" style={{ maxWidth: '27rem', width: '100%' }}>
          <p className="auth-card-kicker">Acesso à plataforma</p>
          <h1>Acesse sua operação</h1>
          <p className="auth-card-intro">Entre com o email e a senha da sua conta.</p>
          {banner ? (
            <p className="auth-form-error" id="login-error" role="alert">
              {banner}
            </p>
          ) : null}
          <form className="auth-form" onSubmit={onSubmit} aria-describedby={banner ? 'login-error' : undefined}>
            <Field htmlFor="login-email" label="Email">
              <input
                autoComplete="username"
                autoFocus
                id="login-email"
                name="email"
                onChange={(e) => setEmail(e.target.value)}
                placeholder="nome@empresa.com.br"
                required
                type="email"
                value={email}
              />
            </Field>
            <Field htmlFor="login-password" label="Senha">
              <input
                autoComplete="current-password"
                id="login-password"
                name="password"
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Digite sua senha"
                required
                type="password"
                value={password}
              />
            </Field>
            <Button loading={submitting} type="submit">
              {submitting ? 'Entrando…' : 'Entrar na plataforma'}
            </Button>
          </form>
          <div className="auth-card-footer">
            <span>Acesso restrito à equipe</span>
            <span>Autenticação protegida</span>
          </div>
        </div>
      </section>
    </main>
  );
}
