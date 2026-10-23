import { useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router';
import { api } from '../api/client.js';
import { useToast } from '../components/toast.jsx';
import { Alert, Breadcrumb, Button, DataPanel, Field, OperationalPage, PageHeader, Segmented } from '../ds/index.js';
import { errorMessage, fieldErrors } from '../lib/errors.js';
import { formatDocument } from '../lib/format.js';
import { usePageTitle } from './usePageTitle.js';

/** Só aceita retorno para rotas internas do app (evita redirecionamento aberto). */
function safeReturn(value) {
  return value && value.startsWith('/') && !value.startsWith('//') ? value : null;
}

export function EntityForm() {
  usePageTitle('Nova entidade');
  const navigate = useNavigate();
  const { notify } = useToast();
  const [params] = useSearchParams();
  const back = safeReturn(params.get('voltar'));

  const [kind, setKind] = useState('PJ');
  const [doc, setDoc] = useState('');
  const [name, setName] = useState('');
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState(null);
  const errors = fieldErrors(error);
  const existingId = error?.code === 'entity_exists' ? error.details?.id : null;
  const docError = errors.document ?? (error?.code === 'entity_exists' ? error.message : undefined);

  const submit = async (event) => {
    event.preventDefault();
    setBusy(true);
    setError(null);
    try {
      const created = await api('/api/entities', { method: 'POST', json: { kind, document: doc, name } });
      notify({ title: 'Entidade cadastrada', body: created.name });
      if (back) {
        const url = new URL(back, window.location.origin);
        url.searchParams.set('entidade', String(created.id));
        navigate(url.pathname + url.search, { replace: true });
      } else {
        navigate(`/entidades/${created.id}`, { replace: true });
      }
    } catch (err) {
      setError(err);
      setBusy(false);
      requestAnimationFrame(() => document.querySelector('[aria-invalid="true"]')?.focus());
    }
  };

  const invalid = (key, msg) => (msg ? { 'aria-invalid': true, 'aria-describedby': `${key}-error` } : {});
  const generalError = error && !docError && !errors.name && !errors.kind ? errorMessage(error) : null;

  return (
    <OperationalPage>
      <Breadcrumb
        items={[
          <Link key="l" to="/entidades" style={{ color: 'inherit' }}>
            Entidades
          </Link>,
        ]}
        tail="Nova"
      />
      <PageHeader
        description="O documento é validado pelos dígitos verificadores e não pode se repetir."
        kicker="Cadastro"
        title="Nova entidade"
      />
      <div style={{ marginTop: '1.5rem', maxWidth: '36rem' }}>
        <DataPanel title="Dados da entidade">
          <form noValidate onSubmit={submit} style={{ display: 'grid', gap: '1.1rem', padding: '1.25rem' }}>
            {generalError ? <Alert tone="danger">{generalError}</Alert> : null}
            <div style={{ display: 'grid', gap: '.5rem' }}>
              <span id="kind-label" style={{ fontWeight: 700 }}>
                Tipo
              </span>
              <Segmented
                ariaLabel="Tipo de entidade"
                onSelect={(id) => {
                  setKind(id);
                  setDoc((d) => formatDocument(d, id));
                }}
                options={[
                  { id: 'PJ', label: 'Pessoa jurídica (CNPJ)' },
                  { id: 'PF', label: 'Pessoa física (CPF)' },
                ]}
                value={kind}
              />
              {errors.kind ? <p className="auth-form-error" role="alert">{errors.kind}</p> : null}
            </div>
            <Field
              error={docError}
              feedbackId="document-error"
              hint={kind === 'PF' ? '11 dígitos, com ou sem pontuação.' : '14 dígitos, com ou sem pontuação.'}
              htmlFor="document"
              label={kind === 'PF' ? 'CPF' : 'CNPJ'}
            >
              <input
                autoComplete="off"
                className="mono"
                id="document"
                inputMode="numeric"
                onChange={(e) => setDoc(formatDocument(e.target.value, kind))}
                placeholder={kind === 'PF' ? '000.000.000-00' : '00.000.000/0000-00'}
                value={doc}
                {...invalid('document', docError)}
              />
            </Field>
            {existingId ? (
              <p style={{ margin: '-.5rem 0 0' }}>
                <Link className="table-link" to={`/entidades/${existingId}`}>
                  Abrir a entidade já cadastrada
                </Link>
              </p>
            ) : null}
            <Field error={errors.name} feedbackId="name-error" htmlFor="name" label={kind === 'PF' ? 'Nome completo' : 'Razão social'}>
              <input
                autoComplete="off"
                id="name"
                maxLength={200}
                onChange={(e) => setName(e.target.value)}
                value={name}
                {...invalid('name', errors.name)}
              />
            </Field>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '.6rem', justifyContent: 'flex-end' }}>
              <Button variant="ghost" onClick={() => navigate(back ?? '/entidades')}>
                Cancelar
              </Button>
              <Button loading={busy} type="submit">
                Cadastrar entidade
              </Button>
            </div>
          </form>
        </DataPanel>
      </div>
    </OperationalPage>
  );
}

