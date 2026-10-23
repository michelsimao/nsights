import { Link, useNavigate } from 'react-router';
import { CaseStatus, DueDate, RiskBadge } from '../components/domain.jsx';
import { ErrorState, LoadingRows } from '../components/states.jsx';
import { useAuth } from '../auth/AuthContext.jsx';
import {
  Button,
  DataPanel,
  EmptyState,
  Icon,
  OperationalPage,
  PageHeader,
  Pagination,
  Table,
  TableScroll,
  Toolbar,
  WorkspaceFilter,
  WorkspaceSearch,
} from '../ds/index.js';
import { RISK_LABELS, RISK_ORDER, STATUS_LABELS, STATUS_ORDER, formatDocument, plural } from '../lib/format.js';
import { useApi } from '../lib/useApi.js';
import { useQueryState, useSearchParam } from '../lib/useQueryState.js';
import { usePageTitle } from './usePageTitle.js';

const PAGE_SIZE = 20;
const SORTS = [
  { value: '-created_at', label: 'Mais recentes' },
  { value: 'created_at', label: 'Mais antigos' },
  { value: '-risk_score', label: 'Maior risco' },
  { value: 'due_at', label: 'Prazo mais próximo' },
  { value: '-updated_at', label: 'Atualizados por último' },
  { value: 'code', label: 'Código' },
];
const FILTER_KEYS = ['q', 'status', 'risk_level', 'assignee', 'overdue'];

/** Status da URL ↔ opção do select (lista repetível na API, escolha única na tela). */
function statusOption(list) {
  if (!list.length) return '';
  if (list.length === 2 && list.includes('aberto') && list.includes('em_analise')) return 'ativos';
  if (list.length === 1) return list[0];
  return 'custom';
}

export function Cases() {
  usePageTitle('Casos');
  const navigate = useNavigate();
  const { user } = useAuth();
  const qs = useQueryState();
  const { params, page, update } = qs;

  const status = params.getAll('status');
  const riskLevel = params.getAll('risk_level');
  const assignee = params.get('assignee') ?? '';
  const overdue = params.get('overdue') ?? '';
  const sort = params.get('sort') ?? '-created_at';
  const [search, setSearch] = useSearchParam(qs);

  const query = {
    q: params.get('q') ?? undefined,
    status,
    risk_level: riskLevel,
    assignee: assignee || undefined,
    overdue: overdue || undefined,
    sort,
    page,
    page_size: PAGE_SIZE,
  };
  const { data, error, loading, reload } = useApi('/api/cases', query);
  const users = useApi('/api/users');

  const onStatus = (value) =>
    update({ status: value === 'ativos' ? ['aberto', 'em_analise'] : value === 'custom' ? status : value });
  const hasFilters = FILTER_KEYS.some((key) => params.has(key));
  const pages = data ? Math.max(1, Math.ceil(data.total / PAGE_SIZE)) : 1;
  const first = data?.total ? (page - 1) * PAGE_SIZE + 1 : 0;
  const last = data ? Math.min(page * PAGE_SIZE, data.total) : 0;

  return (
    <OperationalPage>
      <PageHeader
        action={
          <Button icon={<Icon name="adicionar" />} onClick={() => navigate('/casos/novo')}>
            Novo caso
          </Button>
        }
        description="Todos os casos da operação. Filtros e página ficam no endereço: dá para compartilhar o link."
        kicker="Operação de risco"
        title="Casos"
      />

      <Toolbar ariaLabel="Filtros de casos">
        <WorkspaceSearch
          ariaLabel="Buscar casos por código, título, entidade ou documento"
          onChange={setSearch}
          placeholder="Código, título, entidade, CPF ou CNPJ"
          value={search}
        />
        <WorkspaceFilter label="Status">
          <select onChange={(e) => onStatus(e.target.value)} value={statusOption(status)}>
            <option value="">Todos</option>
            <option value="ativos">Ativos</option>
            {STATUS_ORDER.map((st) => (
              <option key={st} value={st}>
                {STATUS_LABELS[st]}
              </option>
            ))}
            {statusOption(status) === 'custom' ? <option value="custom">Personalizado</option> : null}
          </select>
        </WorkspaceFilter>
        <WorkspaceFilter label="Risco">
          <select
            onChange={(e) => update({ risk_level: e.target.value })}
            value={riskLevel.length > 1 ? 'custom' : (riskLevel[0] ?? '')}
          >
            <option value="">Todos</option>
            {RISK_ORDER.map((lvl) => (
              <option key={lvl} value={lvl}>
                {RISK_LABELS[lvl]}
              </option>
            ))}
            {riskLevel.length > 1 ? <option value="custom">Personalizado</option> : null}
          </select>
        </WorkspaceFilter>
        <WorkspaceFilter label="Responsável">
          <select onChange={(e) => update({ assignee: e.target.value })} value={assignee}>
            <option value="">Todos</option>
            <option value="me">Meus casos</option>
            <option value="none">Sem responsável</option>
            {(users.data ?? [])
              .filter((u) => u.id !== user.id)
              .map((u) => (
                <option key={u.id} value={String(u.id)}>
                  {u.name}
                </option>
              ))}
          </select>
        </WorkspaceFilter>
        <WorkspaceFilter label="Prazo">
          <select onChange={(e) => update({ overdue: e.target.value })} value={overdue}>
            <option value="">Todos</option>
            <option value="true">Atrasados</option>
            <option value="false">No prazo</option>
          </select>
        </WorkspaceFilter>
        <WorkspaceFilter label="Ordenar">
          <select onChange={(e) => update({ sort: e.target.value === '-created_at' ? '' : e.target.value })} value={sort}>
            {SORTS.map((s) => (
              <option key={s.value} value={s.value}>
                {s.label}
              </option>
            ))}
          </select>
        </WorkspaceFilter>
      </Toolbar>

      <div style={{ marginTop: '1rem' }}>
        <DataPanel
          footer={
            data && hasFilters ? (
              <>
                <span>Filtros aplicados</span>
                <Button variant="ghost" onClick={() => qs.reset(params.get('sort') ? { sort } : {})}>
                  Limpar filtros
                </Button>
              </>
            ) : null
          }
          meta={
            <span aria-live="polite">
              {loading && data ? 'Atualizando…' : data ? plural(data.total, 'caso', 'casos') : null}
            </span>
          }
          title="Fila de casos"
        >
          {error && !data ? (
            <ErrorState error={error} onRetry={reload} />
          ) : !data ? (
            <LoadingRows label="Carregando casos" />
          ) : data.items.length === 0 ? (
            <EmptyState
              description={
                hasFilters
                  ? 'Nenhum caso corresponde aos filtros. Ajuste a busca ou limpe os filtros.'
                  : 'Ainda não há casos. Abra o primeiro pelo botão "Novo caso".'
              }
              title={page > 1 ? 'Esta página não existe mais' : 'Nenhum caso encontrado'}
            />
          ) : (
            <div aria-busy={loading} style={{ opacity: loading ? 0.6 : 1, transition: 'opacity .15s' }}>
              {error ? <ErrorState error={error} onRetry={reload} title="Falha ao atualizar a lista" /> : null}
              <CasesTable items={data.items} />
              <Pagination
                ariaLabel="Páginas de casos"
                info={`Mostrando ${first}–${last} de ${data.total}`}
                onChange={qs.setPage}
                page={Math.min(page, pages)}
                pages={pages}
              />
            </div>
          )}
        </DataPanel>
      </div>
    </OperationalPage>
  );
}

function CasesTable({ items }) {
  return (
    <TableScroll ariaLabel="Casos">
      <Table>
        <thead>
          <tr>
            <th>Caso</th>
            <th>Entidade</th>
            <th>Status</th>
            <th>Risco</th>
            <th>Responsável</th>
            <th>Prazo</th>
          </tr>
        </thead>
        <tbody>
          {items.map((c) => (
            <tr key={c.id}>
              <td>
                <Link className="table-link mono" to={`/casos/${c.code}`}>
                  {c.code}
                </Link>
                <small style={{ color: 'var(--text)', display: 'block', marginTop: '.15rem' }}>{c.title}</small>
              </td>
              <td>
                <strong style={{ display: 'block', fontWeight: 560 }}>{c.entity.name}</strong>
                <small className="mono" style={{ color: 'var(--muted)' }}>
                  {c.entity.kind} · {formatDocument(c.entity.document, c.entity.kind)}
                </small>
              </td>
              <td>
                <CaseStatus status={c.status} />
              </td>
              <td>
                <RiskBadge level={c.risk_level} score={c.risk_score} />
              </td>
              <td>{c.assignee ? c.assignee.name : <em style={{ color: 'var(--muted)' }}>Sem responsável</em>}</td>
              <td>
                <DueDate closed={Boolean(c.closed_at)} iso={c.closed_at ?? c.due_at} overdue={c.is_overdue} />
                {c.closed_at ? <small style={{ color: 'var(--muted)', display: 'block' }}>encerrado</small> : null}
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </TableScroll>
  );
}
