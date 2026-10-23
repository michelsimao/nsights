import { Link, useNavigate } from 'react-router';
import { Document } from '../components/domain.jsx';
import { ErrorState, LoadingRows } from '../components/states.jsx';
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
import { KIND_LABELS, formatDate, plural } from '../lib/format.js';
import { useApi } from '../lib/useApi.js';
import { useQueryState, useSearchParam } from '../lib/useQueryState.js';
import { usePageTitle } from './usePageTitle.js';

const PAGE_SIZE = 20;

export function Entities() {
  usePageTitle('Entidades');
  const navigate = useNavigate();
  const qs = useQueryState();
  const { params, page, update } = qs;
  const kind = params.get('kind') ?? '';
  const sort = params.get('sort') ?? 'name';
  const [search, setSearch] = useSearchParam(qs);

  const { data, error, loading, reload } = useApi('/api/entities', {
    q: params.get('q') ?? undefined,
    kind: kind || undefined,
    sort,
    page,
    page_size: PAGE_SIZE,
  });
  const hasFilters = params.has('q') || params.has('kind');
  const pages = data ? Math.max(1, Math.ceil(data.total / PAGE_SIZE)) : 1;
  const first = data?.total ? (page - 1) * PAGE_SIZE + 1 : 0;
  const last = data ? Math.min(page * PAGE_SIZE, data.total) : 0;

  return (
    <OperationalPage>
      <PageHeader
        action={
          <Button icon={<Icon name="adicionar" />} onClick={() => navigate('/entidades/nova')}>
            Nova entidade
          </Button>
        }
        description="Pessoas físicas e jurídicas sob análise, com o volume de casos de cada uma."
        kicker="Cadastro"
        title="Entidades"
      />
      <Toolbar ariaLabel="Filtros de entidades">
        <WorkspaceSearch ariaLabel="Buscar entidades por nome ou documento" onChange={setSearch} placeholder="Nome, CPF ou CNPJ" value={search} />
        <WorkspaceFilter label="Tipo">
          <select onChange={(e) => update({ kind: e.target.value })} value={kind}>
            <option value="">Todos</option>
            <option value="PF">Pessoa física</option>
            <option value="PJ">Pessoa jurídica</option>
          </select>
        </WorkspaceFilter>
        <WorkspaceFilter label="Ordenar">
          <select onChange={(e) => update({ sort: e.target.value === 'name' ? '' : e.target.value })} value={sort}>
            <option value="name">Nome (A–Z)</option>
            <option value="-name">Nome (Z–A)</option>
            <option value="-created_at">Cadastro mais recente</option>
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
              {loading && data ? 'Atualizando…' : data ? plural(data.total, 'entidade', 'entidades') : null}
            </span>
          }
          title="Entidades cadastradas"
        >
          {error && !data ? (
            <ErrorState error={error} onRetry={reload} />
          ) : !data ? (
            <LoadingRows label="Carregando entidades" />
          ) : data.items.length === 0 ? (
            <EmptyState
              description={hasFilters ? 'Nenhuma entidade corresponde à busca. Confira o nome ou o documento.' : 'Cadastre a primeira entidade pelo botão "Nova entidade".'}
              title="Nenhuma entidade encontrada"
            />
          ) : (
            <div aria-busy={loading} style={{ opacity: loading ? 0.6 : 1, transition: 'opacity .15s' }}>
              <TableScroll ariaLabel="Entidades">
                <Table>
                  <thead>
                    <tr>
                      <th>Entidade</th>
                      <th>Tipo</th>
                      <th className="amount-cell">Casos ativos</th>
                      <th className="amount-cell">Total de casos</th>
                      <th>Cadastro</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.items.map((e) => (
                      <tr key={e.id}>
                        <td>
                          <Link className="table-link" to={`/entidades/${e.id}`}>
                            {e.name}
                          </Link>
                          <small style={{ color: 'var(--muted)', display: 'block' }}>
                            <Document kind={e.kind} value={e.document} />
                          </small>
                        </td>
                        <td>{KIND_LABELS[e.kind]}</td>
                        <td className="amount-cell mono">{e.active_case_count}</td>
                        <td className="amount-cell mono">{e.case_count}</td>
                        <td className="mono">{formatDate(e.created_at)}</td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </TableScroll>
              <Pagination ariaLabel="Páginas de entidades" info={`Mostrando ${first}–${last} de ${data.total}`} onChange={qs.setPage} page={Math.min(page, pages)} pages={pages} />
            </div>
          )}
        </DataPanel>
      </div>
    </OperationalPage>
  );
}
