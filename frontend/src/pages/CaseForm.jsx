import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams, useSearchParams } from 'react-router';
import { api } from '../api/client.js';
import { useAuth } from '../auth/AuthContext.jsx';
import { ErrorState, LoadingRows } from '../components/states.jsx';
import { useToast } from '../components/toast.jsx';
import { Alert, Breadcrumb, Button, DataPanel, Field, OperationalPage, PageHeader } from '../ds/index.js';
import { errorMessage, fieldErrors } from '../lib/errors.js';
import { RISK_LABELS, SLA_DAYS, formatDocument, fromDateInput, riskLevelFor, toDateInput } from '../lib/format.js';
import { useApi, useDebounced } from '../lib/useApi.js';
import { usePageTitle } from './usePageTitle.js';

/** Abertura de caso (`/casos/novo`) e edição (`/casos/:ref/editar`) no mesmo formulário. */
export function CaseForm() {
  const { ref } = useParams();
  const editing = Boolean(ref);
  const existing = useApi(editing ? `/api/cases/${encodeURIComponent(ref)}` : null);
  usePageTitle(editing ? `Editar ${ref}` : 'Novo caso');

  const header = (
    <>
      <Breadcrumb
        items={[
          <Link key="l" to="/casos" style={{ color: 'inherit' }}>
            Casos
          </Link>,
          ...(editing
            ? [
                <Link key="c" className="mono" to={`/casos/${ref}`} style={{ color: 'inherit' }}>
                  {ref}
                </Link>,
              ]
            : []),
        ]}
        tail={editing ? 'Editar' : 'Novo'}
      />
      <PageHeader
        description={
          editing
            ? 'Título, descrição, score e prazo. Status e responsável mudam pelas ações do caso.'
            : 'O caso nasce "Aberto". Sem prazo informado, vale o padrão do nível de risco.'
        }
        kicker="Operação de risco"
        title={editing ? 'Editar caso' : 'Novo caso'}
      />
    </>
  );

  let body;
  if (editing && existing.error) body = <ErrorState error={existing.error} onRetry={existing.reload} />;
  else if (editing && !existing.data) body = <LoadingRows label="Carregando o caso" />;
  else if (editing && !existing.data.can_edit)
    body = (
      <div style={{ padding: '1rem' }}>
        <Alert tone="warning" title="Caso encerrado">
          Casos aprovados ou reprovados não podem ser editados. Você ainda pode adicionar notas no{' '}
          <Link to={`/casos/${ref}`}>detalhe do caso</Link>.
        </Alert>
      </div>
    );
  else body = <CaseFields initial={existing.data} />;

  return (
    <OperationalPage>
      {header}
      <div style={{ marginTop: '1.5rem', maxWidth: '44rem' }}>
        <DataPanel title={editing ? 'Dados do caso' : 'Novo caso'}>{body}</DataPanel>
      </div>
    </OperationalPage>
  );
}

function CaseFields({ initial }) {
  const editing = Boolean(initial);
  const navigate = useNavigate();
  const { notify } = useToast();
  const { user, isAdmin } = useAuth();
  const [params] = useSearchParams();

  const [form, setForm] = useState(() => ({
    entity_id: params.get('entidade') ?? '',
    title: initial?.title ?? '',
    description: initial?.description ?? '',
    risk_score: initial ? String(initial.risk_score) : '',
    due: initial ? toDateInput(initial.due_at) : '',
    assignee_id: isAdmin ? '' : String(user.id),
  }));
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState(null);
  const errors = fieldErrors(error);
  const set = (key) => (event) => setForm((f) => ({ ...f, [key]: event.target.value }));

  const score = form.risk_score === '' ? null : Number(form.risk_score);
  const level = score !== null && Number.isInteger(score) && score >= 0 && score <= 100 ? riskLevelFor(score) : null;

  const payload = () => {
    if (!editing) {
      const body = { title: form.title, risk_score: score ?? undefined };
      if (form.entity_id) body.entity_id = Number(form.entity_id);
      if (form.description.trim()) body.description = form.description;
      if (form.due) body.due_at = fromDateInput(form.due);
      if (form.assignee_id) body.assignee_id = Number(form.assignee_id);
      return body;
    }
    // Edição parcial: só o que mudou.
    const body = {};
    if (form.title !== initial.title) body.title = form.title;
    if (form.description.trim() !== (initial.description ?? '')) body.description = form.description.trim() || null;
    // Campo esvaziado vai como null: o backend recusa e o erro aparece no campo.
    if (score !== initial.risk_score) body.risk_score = score;
    if (form.due !== toDateInput(initial.due_at)) body.due_at = fromDateInput(form.due);
    return body;
  };

  const submit = async (event) => {
    event.preventDefault();
    const body = payload();
    if (editing && Object.keys(body).length === 0) {
      notify({ title: 'Nada para salvar', body: 'Nenhum campo foi alterado.', tone: 'info' });
      navigate(`/casos/${initial.code}`);
      return;
    }
    setBusy(true);
    setError(null);
    try {
      const saved = await api(editing ? `/api/cases/${initial.code}` : '/api/cases', {
        method: editing ? 'PATCH' : 'POST',
        json: body,
      });
      notify({ title: editing ? `${saved.code} atualizado` : `Caso ${saved.code} aberto` });
      navigate(`/casos/${saved.code}`, { replace: !editing });
    } catch (err) {
      setError(err);
      setBusy(false);
      // Leva o foco ao primeiro campo com erro, para leitor de tela e teclado.
      requestAnimationFrame(() => document.querySelector('[aria-invalid="true"]')?.focus());
    }
  };

  const generalError = error && (!Array.isArray(error.details) || errors._form) ? errorMessage(error) : null;
  const invalid = (key) => (errors[key] ? { 'aria-invalid': true, 'aria-describedby': `${key}-error` } : {});

  return (
    <form noValidate onSubmit={submit} style={{ display: 'grid', gap: '1.1rem', padding: '1.25rem' }}>
      {generalError ? <Alert tone="danger">{generalError}</Alert> : null}
      {error && !generalError ? <Alert tone="danger">Revise os campos destacados.</Alert> : null}

      {editing ? (
        <Field htmlFor="entity" label="Entidade" hint="A entidade de um caso não muda.">
          <input disabled id="entity" value={`${initial.entity.name} · ${formatDocument(initial.entity.document, initial.entity.kind)}`} />
        </Field>
      ) : (
        <EntityPicker error={errors.entity_id} onChange={(id) => setForm((f) => ({ ...f, entity_id: id }))} value={form.entity_id} />
      )}

      <Field error={errors.title} feedbackId="title-error" htmlFor="title" label="Título">
        <input id="title" maxLength={200} onChange={set('title')} placeholder="Ex.: Alerta de PEP" value={form.title} {...invalid('title')} />
      </Field>

      <Field error={errors.description} feedbackId="description-error" hint="Opcional." htmlFor="description" label="Descrição">
        <textarea id="description" maxLength={5000} onChange={set('description')} value={form.description} {...invalid('description')} />
      </Field>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <Field
          error={errors.risk_score}
          feedbackId="risk_score-error"
          hint={level ? `Nível ${RISK_LABELS[level].toLowerCase()}: prazo padrão de ${SLA_DAYS[level]} dias.` : 'De 0 a 100.'}
          htmlFor="risk_score"
          label="Score de risco"
        >
          <input
            id="risk_score"
            inputMode="numeric"
            max={100}
            min={0}
            onChange={set('risk_score')}
            step={1}
            type="number"
            value={form.risk_score}
            {...invalid('risk_score')}
          />
        </Field>
        <Field
          error={errors.due_at}
          feedbackId="due_at-error"
          hint={editing ? 'Mudar o score não recalcula o prazo.' : 'Opcional. Vazio = padrão pelo risco.'}
          htmlFor="due"
          label="Prazo"
        >
          <input id="due" onChange={set('due')} type="date" value={form.due} {...(errors.due_at ? { 'aria-invalid': true, 'aria-describedby': 'due_at-error' } : {})} />
        </Field>
      </div>

      {!editing ? <AssigneeSelect error={errors.assignee_id} onChange={set('assignee_id')} value={form.assignee_id} /> : null}

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '.6rem', justifyContent: 'flex-end' }}>
        <Button variant="ghost" onClick={() => navigate(editing ? `/casos/${initial.code}` : '/casos')}>
          Cancelar
        </Button>
        <Button loading={busy} type="submit">
          {editing ? 'Salvar alterações' : 'Abrir caso'}
        </Button>
      </div>
    </form>
  );
}

function AssigneeSelect({ error, onChange, value }) {
  const { user, isAdmin } = useAuth();
  const users = useApi(isAdmin ? '/api/users' : null);
  return (
    <Field
      error={error}
      feedbackId="assignee_id-error"
      hint={isAdmin ? undefined : 'Analistas abrem casos para si mesmos ou sem responsável.'}
      htmlFor="assignee_id"
      label="Responsável"
    >
      <select aria-invalid={error ? true : undefined} id="assignee_id" onChange={onChange} value={value}>
        <option value="">Sem responsável</option>
        {isAdmin ? (
          (users.data ?? []).map((u) => (
            <option key={u.id} value={String(u.id)}>
              {u.name}
            </option>
          ))
        ) : (
          <option value={String(user.id)}>{user.name} (eu)</option>
        )}
      </select>
    </Field>
  );
}

/** Busca a entidade no servidor e escolhe numa lista; aceita `?entidade=<id>` pré-selecionado. */
function EntityPicker({ error, onChange, value }) {
  const [term, setTerm] = useState('');
  const q = useDebounced(term.trim());
  const results = useApi('/api/entities', { q: q || undefined, page_size: 50, sort: 'name' });
  const selected = useApi(value ? `/api/entities/${value}` : null);

  // Mantém a entidade escolhida na lista mesmo quando a busca não a traz.
  const options = results.data?.items ?? [];
  const chosen = selected.data && !options.some((e) => String(e.id) === String(value)) ? [selected.data] : [];
  const total = results.data?.total ?? 0;

  useEffect(() => {
    // Uma busca com um único resultado já escolhe a entidade.
    if (q && results.data?.items.length === 1 && !value) onChange(String(results.data.items[0].id));
  }, [results.data]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <fieldset style={{ border: 0, display: 'grid', gap: '.6rem', margin: 0, padding: 0 }}>
      <legend className="sr-only">Entidade</legend>
      <Field hint="Nome, CPF ou CNPJ." htmlFor="entity-search" label="Buscar entidade">
        <input
          autoComplete="off"
          id="entity-search"
          onChange={(e) => setTerm(e.target.value)}
          placeholder="Ex.: Rota Sul ou 12.345.678"
          type="search"
          value={term}
        />
      </Field>
      <Field
        error={error}
        feedbackId="entity_id-error"
        hint={
          <>
            {results.loading ? 'Buscando…' : `${total} ${total === 1 ? 'entidade encontrada' : 'entidades encontradas'}${total > 50 ? ' (mostrando 50; refine a busca)' : ''}. `}
            Não está na lista? <Link to="/entidades/nova?voltar=/casos/novo">Cadastrar entidade</Link>.
          </>
        }
        htmlFor="entity_id"
        label="Entidade"
      >
        <select
          aria-describedby={error ? 'entity_id-error' : undefined}
          aria-invalid={error ? true : undefined}
          id="entity_id"
          onChange={(e) => onChange(e.target.value)}
          value={value}
        >
          <option value="">Selecione…</option>
          {[...chosen, ...options].map((e) => (
            <option key={e.id} value={String(e.id)}>
              {e.name} · {formatDocument(e.document, e.kind)}
            </option>
          ))}
        </select>
      </Field>
    </fieldset>
  );
}
