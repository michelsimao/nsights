import { useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router';
import { useAuth } from '../auth/AuthContext.jsx';
import { Dialog } from '../components/Dialog.jsx';
import { CaseStatus, DueDate, RiskBadge } from '../components/domain.jsx';
import { ErrorState, LoadingRows } from '../components/states.jsx';
import { useToast } from '../components/toast.jsx';
import { api } from '../api/client.js';
import {
  Alert,
  Breadcrumb,
  Button,
  DataPanel,
  Fact,
  Facts,
  Field,
  Icon,
  InlineEmpty,
  OperationalPage,
  PageHeader,
  ResultRow,
  ResultRows,
} from '../ds/index.js';
import { errorMessage, fieldErrors } from '../lib/errors.js';
import { KIND_LABELS, STATUS_LABELS, formatDate, formatDateTime, formatDocument } from '../lib/format.js';
import { useApi } from '../lib/useApi.js';
import { usePageTitle } from './usePageTitle.js';

// Texto de cada ação de status, pelo status de destino.
const ACTIONS = {
  em_analise: { label: 'Iniciar análise', variant: 'primary', title: 'Iniciar a análise', hint: 'Sem responsável, o caso passa a ser seu.' },
  aberto: { label: 'Devolver para a fila', variant: 'secondary', title: 'Devolver o caso para a fila', hint: 'O caso volta ao status "Aberto".' },
  aprovado: { label: 'Aprovar', variant: 'primary', title: 'Aprovar o caso', hint: 'Encerra o caso. Depois disso ele não pode mais ser editado.' },
  reprovado: { label: 'Reprovar', variant: 'secondary', title: 'Reprovar o caso', hint: 'Encerra o caso. A justificativa fica na timeline.', required: true },
};
const ACTION_ORDER = ['em_analise', 'aprovado', 'reprovado', 'aberto'];

export function CaseDetail() {
  const { ref } = useParams();
  const { data, error, loading, reload, setData } = useApi(`/api/cases/${encodeURIComponent(ref)}`);
  usePageTitle(data ? `${data.code} · ${data.title}` : 'Caso');

  if (error && !data) {
    const notFound = error.status === 404;
    return (
      <OperationalPage>
        <PageHeader
          description={notFound ? 'Confira o código ou volte para a lista.' : 'A API não respondeu como esperado.'}
          kicker="Caso"
          title={notFound ? 'Caso não encontrado' : 'Erro ao abrir o caso'}
        />
        <div style={{ marginTop: '1.5rem' }}>
          {notFound ? (
            <Link className="table-link" to="/casos">
              Voltar para a lista de casos
            </Link>
          ) : (
            <ErrorState error={error} onRetry={reload} />
          )}
        </div>
      </OperationalPage>
    );
  }
  if (!data) {
    return (
      <OperationalPage>
        <LoadingRows label="Carregando o caso" rows={8} />
      </OperationalPage>
    );
  }
  return <CaseView c={data} onChange={setData} refreshing={loading} reload={reload} />;
}

function CaseView({ c, onChange, reload }) {
  const navigate = useNavigate();
  const { isAdmin } = useAuth();
  const [action, setAction] = useState(null);
  const closed = Boolean(c.closed_at);
  const transitions = ACTION_ORDER.filter((s) => c.allowed_transitions.includes(s));

  return (
    <OperationalPage>
      <Breadcrumb
        items={[
          <Link key="l" to="/casos" style={{ color: 'inherit' }}>
            Casos
          </Link>,
        ]}
        tail={<span className="mono">{c.code}</span>}
      />
      <PageHeader
        action={
          c.can_edit ? (
            <Button icon={<Icon name="editar" />} onClick={() => navigate(`/casos/${c.code}/editar`)}>
              Editar
            </Button>
          ) : undefined
        }
        description={`${c.entity.name} · ${KIND_LABELS[c.entity.kind]} ${formatDocument(c.entity.document, c.entity.kind)}`}
        kicker={c.code}
        title={c.title}
      />

      <Facts>
        <Fact label="Status" value={<CaseStatus status={c.status} />} hint={closed ? `em ${formatDate(c.closed_at)}` : undefined} />
        <Fact label="Risco" value={<RiskBadge level={c.risk_level} score={c.risk_score} />} hint="score de 0 a 100" />
        <Fact
          label="Responsável"
          value={c.assignee ? c.assignee.name : 'Sem responsável'}
          hint={c.created_by ? `aberto por ${c.created_by.name}` : undefined}
        />
        <Fact
          label={closed ? 'Prazo era' : 'Prazo'}
          value={<DueDate closed={closed} iso={c.due_at} overdue={c.is_overdue} />}
          hint={`aberto em ${formatDate(c.created_at)}`}
        />
      </Facts>

      <div className="grid grid-cols-1 gap-5 lg:grid-cols-[minmax(0,2fr)_minmax(0,1fr)]" style={{ marginTop: '1.25rem' }}>
        <div className="app-stack" style={{ alignContent: 'start', display: 'grid', gap: '1.25rem', gridTemplateColumns: 'minmax(0, 1fr)' }}>
          {!closed ? (
            <DataPanel meta="Ações disponíveis para o seu papel" title="Decisão">
              <div style={{ display: 'grid', gap: '.75rem', padding: '1rem' }}>
                {transitions.length ? (
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '.6rem' }}>
                    {transitions.map((to) => (
                      <Button key={to} variant={ACTIONS[to].variant} onClick={() => setAction(to)}>
                        {ACTIONS[to].label}
                      </Button>
                    ))}
                  </div>
                ) : null}
                {!isAdmin && c.status === 'em_analise' ? (
                  <Alert tone="info">Aprovar ou reprovar é exclusivo de administradores. Registre sua conclusão numa nota.</Alert>
                ) : null}
              </div>
            </DataPanel>
          ) : (
            <Alert tone={c.status === 'aprovado' ? 'success' : 'danger'} title={`Caso ${STATUS_LABELS[c.status].toLowerCase()}`}>
              Encerrado em {formatDateTime(c.closed_at)}. Casos encerrados não mudam mais de status nem aceitam edição; notas
              continuam permitidas.
            </Alert>
          )}
          <Timeline c={c} onNote={(event) => onChange({ ...c, events: [...c.events, event] })} />
        </div>

        <div className="app-stack" style={{ alignContent: 'start', display: 'grid', gap: '1.25rem', gridTemplateColumns: 'minmax(0, 1fr)' }}>
          <DataPanel title="Descrição">
            <p style={{ color: c.description ? 'var(--text)' : 'var(--muted)', fontSize: '.8rem', margin: 0, padding: '1rem', whiteSpace: 'pre-wrap' }}>
              {c.description || 'Sem descrição.'}
            </p>
          </DataPanel>
          <DataPanel title="Entidade">
            <div style={{ display: 'grid', gap: '.35rem', padding: '1rem' }}>
              <Link className="table-link" to={`/entidades/${c.entity.id}`}>
                {c.entity.name}
              </Link>
              <small className="mono" style={{ color: 'var(--muted)' }}>
                {c.entity.kind} · {formatDocument(c.entity.document, c.entity.kind)}
              </small>
            </div>
          </DataPanel>
          {c.can_assign ? <AssignPanel c={c} onChange={onChange} /> : null}
        </div>
      </div>

      {action ? (
        <TransitionDialog
          c={c}
          to={action}
          onClose={() => setAction(null)}
          onDone={(updated) => {
            onChange(updated);
            setAction(null);
          }}
          onStale={() => {
            setAction(null);
            reload();
          }}
        />
      ) : null}
    </OperationalPage>
  );
}

function TransitionDialog({ c, to, onClose, onDone, onStale }) {
  const { notify } = useToast();
  const cfg = ACTIONS[to];
  const [message, setMessage] = useState('');
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState(null);
  const errors = fieldErrors(error);

  const submit = async (event) => {
    event.preventDefault();
    setBusy(true);
    setError(null);
    try {
      const updated = await api(`/api/cases/${c.code}/status`, {
        method: 'POST',
        json: { status: to, message: message.trim() || null },
      });
      notify({ title: `${c.code}: ${STATUS_LABELS[c.status]} → ${STATUS_LABELS[to]}` });
      onDone(updated);
    } catch (err) {
      setBusy(false);
      if (err.status === 409) {
        // Alguém mudou o caso antes: recarrega para mostrar o estado real.
        notify({ title: 'O caso mudou', body: err.message, tone: 'warning' });
        onStale();
        return;
      }
      setError(err);
    }
  };

  return (
    <Dialog kicker={c.code} onClose={onClose} title={cfg.title}>
      <form onSubmit={submit} style={{ display: 'grid', gap: '1rem' }} noValidate>
        <p style={{ color: 'var(--muted)', margin: 0 }}>
          {STATUS_LABELS[c.status]} → <strong style={{ color: 'var(--text)' }}>{STATUS_LABELS[to]}</strong>. {cfg.hint}
        </p>
        {error && !errors.message ? <Alert tone="danger">{errorMessage(error)}</Alert> : null}
        <Field
          error={errors.message}
          feedbackId="transition-message-error"
          hint={cfg.required ? 'Obrigatória: explique o motivo da reprovação.' : 'Opcional. Fica registrado na timeline.'}
          htmlFor="transition-message"
          label={cfg.required ? 'Justificativa' : 'Comentário'}
        >
          <textarea
            aria-describedby={errors.message ? 'transition-message-error' : undefined}
            aria-invalid={errors.message ? true : undefined}
            data-autofocus
            id="transition-message"
            maxLength={2000}
            onChange={(e) => setMessage(e.target.value)}
            required={cfg.required}
            value={message}
          />
        </Field>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '.6rem', justifyContent: 'flex-end' }}>
          <Button variant="ghost" onClick={onClose}>
            Cancelar
          </Button>
          <Button loading={busy} type="submit">
            {cfg.label}
          </Button>
        </div>
      </form>
    </Dialog>
  );
}

function AssignPanel({ c, onChange }) {
  const { notify } = useToast();
  const users = useApi('/api/users');
  const current = c.assignee ? String(c.assignee.id) : '';
  const [value, setValue] = useState(current);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState(null);

  const save = async () => {
    setBusy(true);
    setError(null);
    try {
      const updated = await api(`/api/cases/${c.code}/assignee`, {
        method: 'POST',
        json: { assignee_id: value ? Number(value) : null },
      });
      onChange(updated);
      notify({ title: 'Responsável atualizado', body: updated.assignee ? updated.assignee.name : 'Caso sem responsável.' });
    } catch (err) {
      setError(err);
    } finally {
      setBusy(false);
    }
  };

  return (
    <DataPanel meta="Só administradores" title="Responsável">
      <div style={{ display: 'grid', gap: '.75rem', padding: '1rem' }}>
        <Field
          error={error ? errorMessage(error) : undefined}
          feedbackId="assignee-error"
          htmlFor="assignee"
          label="Atribuir a"
        >
          <select
            aria-describedby={error ? 'assignee-error' : undefined}
            disabled={!users.data}
            id="assignee"
            onChange={(e) => setValue(e.target.value)}
            value={value}
          >
            <option value="">Sem responsável</option>
            {(users.data ?? []).map((u) => (
              <option key={u.id} value={String(u.id)}>
                {u.name} ({u.role === 'admin' ? 'administrador' : 'analista'})
              </option>
            ))}
          </select>
        </Field>
        <div>
          <Button disabled={value === current} loading={busy} variant="secondary" onClick={save}>
            Salvar responsável
          </Button>
        </div>
      </div>
    </DataPanel>
  );
}

// ---------------------------------------------------------------------------------------

const FIELD_LABELS = { title: 'Título', description: 'Descrição', risk_score: 'Score de risco', due_at: 'Prazo' };
const EVENT_ICONS = { created: 'documentos', status_change: 'decisao', assignment: 'pessoa-fisica', update: 'editar', note: 'comentario' };

function showValue(field, value) {
  if (value === null || value === undefined || value === '') return '(vazio)';
  if (field === 'due_at') return formatDate(value);
  const text = String(value);
  return text.length > 60 ? `${text.slice(0, 60)}…` : text;
}

function describe(event) {
  const p = event.payload ?? {};
  switch (event.type) {
    case 'created':
      return { title: 'Caso aberto' };
    case 'status_change':
      return { title: `Status: ${STATUS_LABELS[p.from] ?? p.from} → ${STATUS_LABELS[p.to] ?? p.to}` };
    case 'assignment':
      if (!p.from && p.to) return { title: `Atribuído a ${p.to.name}` };
      if (p.from && !p.to) return { title: `Responsável removido (era ${p.from.name})` };
      return { title: `Responsável: ${p.from?.name ?? '—'} → ${p.to?.name ?? '—'}` };
    case 'update': {
      const changes = Object.entries(p.changes ?? {});
      return {
        title: 'Caso editado',
        detail: changes.map(([field, ch]) => `${FIELD_LABELS[field] ?? field}: ${showValue(field, ch.from)} → ${showValue(field, ch.to)}`),
      };
    }
    case 'note':
      return { title: 'Nota' };
    default:
      return { title: event.type };
  }
}

function Timeline({ c, onNote }) {
  return (
    <DataPanel meta={`${c.events.length} eventos`} title="Timeline">
      {c.events.length ? (
        <div style={{ padding: '.5rem' }}>
          <ResultRows label="Eventos do caso">
            {c.events.map((event) => {
              const { title, detail } = describe(event);
              const text = event.type === 'created' && event.message === 'Caso aberto.' ? null : event.message;
              const body = detail?.length || text;
              return (
                  <ResultRow
                    key={event.id}
                    facts={[event.author?.name ?? 'Sistema', <span className="mono" key="d">{formatDateTime(event.created_at)}</span>]}
                    icon={<Icon name={EVENT_ICONS[event.type] ?? 'informacao'} />}
                    open={Boolean(body)}
                    title={title}
                  >
                    {body ? (
                      <div style={{ display: 'grid', gap: '.25rem', fontSize: '.75rem' }}>
                        {detail?.map((line) => <span key={line}>{line}</span>)}
                        {text ? <p style={{ margin: 0, whiteSpace: 'pre-wrap' }}>{text}</p> : null}
                      </div>
                    ) : null}
                  </ResultRow>
              );
            })}
          </ResultRows>
        </div>
      ) : (
        <InlineEmpty>Nenhum evento registrado.</InlineEmpty>
      )}
      <NoteForm code={c.code} onCreated={onNote} />
    </DataPanel>
  );
}

function NoteForm({ code, onCreated }) {
  const { notify } = useToast();
  const [message, setMessage] = useState('');
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState(null);
  const errors = fieldErrors(error);

  const submit = async (event) => {
    event.preventDefault();
    if (!message.trim()) {
      setError({ details: [{ field: 'message', message: 'Escreva a nota antes de adicionar.' }] });
      return;
    }
    setBusy(true);
    setError(null);
    try {
      const created = await api(`/api/cases/${code}/notes`, { method: 'POST', json: { message: message.trim() } });
      onCreated(created);
      setMessage('');
      notify({ title: 'Nota adicionada' });
    } catch (err) {
      setError(err);
    } finally {
      setBusy(false);
    }
  };

  const msgError = errors.message ?? (error && !errors.message ? errorMessage(error) : undefined);
  return (
    <form className="app-note-form" noValidate onSubmit={submit}>
      <Field error={msgError} feedbackId="note-error" htmlFor="note" label="Nova nota">
        <textarea
          aria-describedby={msgError ? 'note-error' : undefined}
          aria-invalid={errors.message ? true : undefined}
          id="note"
          maxLength={5000}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Ex.: cliente enviou o contrato social atualizado."
          value={message}
        />
      </Field>
      <div>
        <Button icon={<Icon name="comentario" />} loading={busy} type="submit" variant="secondary">
          Adicionar nota
        </Button>
      </div>
    </form>
  );
}
