import { Link, useNavigate } from 'react-router';
import { ErrorState } from '../components/states.jsx';
import {
  BarList,
  Button,
  DataPanel,
  Icon,
  InlineEmpty,
  MetricGrid,
  MetricTile,
  OperationalPage,
  PageHeader,
  Skeleton,
  Table,
  TableScroll,
} from '../ds/index.js';
import { RISK_LABELS, RISK_ORDER, STATUS_LABELS, STATUS_ORDER, plural } from '../lib/format.js';
import { casesHref } from '../lib/links.js';
import { useApi } from '../lib/useApi.js';
import { usePageTitle } from './usePageTitle.js';

export function Summary() {
  usePageTitle('Resumo');
  const navigate = useNavigate();
  const { data, error, loading, reload } = useApi('/api/summary');

  return (
    <OperationalPage>
      <PageHeader
        action={
          <Button icon={<Icon name="adicionar" />} onClick={() => navigate('/casos/novo')}>
            Novo caso
          </Button>
        }
        description="Como está a fila agora: volume, atrasos, risco e carga de cada responsável."
        kicker="Operação de risco"
        title="Resumo"
      />
      <div style={{ marginTop: '1.5rem' }}>
        {error && !data ? (
          <DataPanel title="Resumo">
            <ErrorState error={error} onRetry={reload} />
          </DataPanel>
        ) : loading && !data ? (
          <SummarySkeleton />
        ) : (
          <SummaryContent data={data} />
        )}
      </div>
    </OperationalPage>
  );
}

function SummaryContent({ data }) {
  const s = data.by_status;
  const closed = s.aprovado + s.reprovado;
  const overduePct = data.active ? Math.round((data.overdue / data.active) * 100) : 0;
  const risk = data.by_risk_level;

  return (
    <div className="app-stack" style={{ display: 'grid', gap: '1.25rem', gridTemplateColumns: 'minmax(0, 1fr)' }}>
      <MetricGrid>
        <MetricTile
          hint={`${plural(s.aberto, 'aberto', 'abertos')} · ${s.em_analise} em análise`}
          label="Casos ativos"
          tone="accent"
          value={<span className="mono">{data.active}</span>}
        />
        <MetricTile
          hint={data.active ? `${overduePct}% dos ativos estão fora do prazo` : 'nenhum caso ativo'}
          label="Atrasados"
          tone={data.overdue ? 'danger' : 'neutral'}
          value={<span className="mono">{data.overdue}</span>}
        />
        <MetricTile
          hint={`${risk.medio} médio · ${risk.baixo} baixo`}
          label="Ativos de alto risco"
          tone={risk.alto ? 'warning' : 'neutral'}
          value={<span className="mono">{risk.alto}</span>}
        />
        <MetricTile
          hint={`${plural(s.aprovado, 'aprovado', 'aprovados')} · ${plural(s.reprovado, 'reprovado', 'reprovados')}`}
          label="Encerrados"
          value={<span className="mono">{closed}</span>}
        />
      </MetricGrid>

      <div className="app-stack grid grid-cols-1 gap-5 lg:grid-cols-2">
        <DataPanel
          footer={<Link className="table-link" to={casesHref({ status: ['aberto', 'em_analise'] })}>Ver casos ativos</Link>}
          meta={plural(data.total, 'caso', 'casos')}
          title="Casos por status"
        >
          <div style={{ padding: '1rem' }}>
            <BarList
              rows={STATUS_ORDER.map((st) => ({ label: STATUS_LABELS[st], segments: [{ value: s[st] }] }))}
              title="Todos os casos"
            />
          </div>
        </DataPanel>
        <DataPanel
          footer={
            <Link className="table-link" to={casesHref({ status: ['aberto', 'em_analise'], risk_level: ['alto'] })}>
              Ver ativos de alto risco
            </Link>
          }
          meta={plural(data.active, 'ativo', 'ativos')}
          title="Risco dos casos ativos"
        >
          <div style={{ padding: '1rem' }}>
            <BarList
              rows={RISK_ORDER.map((lvl) => ({ label: RISK_LABELS[lvl], segments: [{ value: risk[lvl] }] }))}
              title="Nível de risco"
            />
          </div>
        </DataPanel>
      </div>

      <DataPanel meta="Somente casos ativos" title="Carga por responsável">
        {data.by_assignee.length ? (
          <TableScroll ariaLabel="Carga por responsável">
            <Table>
              <thead>
                <tr>
                  <th>Responsável</th>
                  <th className="amount-cell">Ativos</th>
                  <th className="amount-cell">Atrasados</th>
                  <th>
                    <span className="sr-only">Ação</span>
                  </th>
                </tr>
              </thead>
              <tbody>
                {data.by_assignee.map((row) => {
                  const assignee = row.assignee ? String(row.assignee.id) : 'none';
                  return (
                    <tr key={assignee}>
                      <td>{row.assignee ? row.assignee.name : <em style={{ color: 'var(--muted)' }}>Sem responsável</em>}</td>
                      <td className="amount-cell mono">{row.active}</td>
                      <td className="amount-cell mono">{row.overdue}</td>
                      <td style={{ textAlign: 'right' }}>
                        <Link
                          className="table-link"
                          to={casesHref({ status: ['aberto', 'em_analise'], assignee })}
                          aria-label={`Ver casos ativos de ${row.assignee?.name ?? 'sem responsável'}`}
                        >
                          Ver casos
                        </Link>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </Table>
          </TableScroll>
        ) : (
          <InlineEmpty>Nenhum caso ativo no momento.</InlineEmpty>
        )}
      </DataPanel>
    </div>
  );
}

function SummarySkeleton() {
  return (
    <div aria-busy="true" aria-label="Carregando o resumo" role="status" style={{ display: 'grid', gap: '1.25rem' }}>
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {[0, 1, 2, 3].map((i) => (
          <Skeleton key={i} shape="card" />
        ))}
      </div>
      <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
        <Skeleton shape="panel" />
        <Skeleton shape="panel" />
      </div>
    </div>
  );
}
