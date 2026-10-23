import { Link, useNavigate, useParams } from 'react-router';
import { CaseStatus, RiskBadge } from '../components/domain.jsx';
import { ErrorState, LoadingRows } from '../components/states.jsx';
import {
  Breadcrumb,
  Button,
  DataPanel,
  EmptyState,
  Fact,
  Facts,
  Icon,
  OperationalPage,
  PageHeader,
  Table,
  TableScroll,
} from '../ds/index.js';
import { KIND_LABELS, formatDate, formatDocument } from '../lib/format.js';
import { casesHref } from '../lib/links.js';
import { useApi } from '../lib/useApi.js';
import { usePageTitle } from './usePageTitle.js';

export function EntityDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const valid = /^\d+$/.test(id);
  const { data: e, error, reload } = useApi(valid ? `/api/entities/${id}` : null);
  usePageTitle(e ? e.name : 'Entidade');

  const crumb = (
    <Breadcrumb
      items={[
        <Link key="l" to="/entidades" style={{ color: 'inherit' }}>
          Entidades
        </Link>,
      ]}
      tail={e ? e.name : undefined}
    />
  );

  if (!valid || error?.status === 404) {
    return (
      <OperationalPage>
        {crumb}
        <PageHeader description="Confira o endereço ou volte para a lista." kicker="Entidade" title="Entidade não encontrada" />
      </OperationalPage>
    );
  }
  if (error && !e) {
    return (
      <OperationalPage>
        {crumb}
        <ErrorState error={error} onRetry={reload} />
      </OperationalPage>
    );
  }
  if (!e) {
    return (
      <OperationalPage>
        <LoadingRows label="Carregando a entidade" />
      </OperationalPage>
    );
  }

  return (
    <OperationalPage>
      {crumb}
      <PageHeader
        action={
          <Button icon={<Icon name="adicionar" />} onClick={() => navigate(`/casos/novo?entidade=${e.id}`)}>
            Abrir caso
          </Button>
        }
        description={`${KIND_LABELS[e.kind]} · ${e.kind === 'PF' ? 'CPF' : 'CNPJ'} ${formatDocument(e.document, e.kind)}`}
        kicker="Entidade"
        title={e.name}
      />
      <Facts>
        <Fact label="Documento" value={<span className="mono">{formatDocument(e.document, e.kind)}</span>} hint={e.kind === 'PF' ? 'CPF' : 'CNPJ'} />
        <Fact label="Casos ativos" value={<span className="mono">{e.active_case_count}</span>} hint="aberto ou em análise" />
        <Fact label="Total de casos" value={<span className="mono">{e.case_count}</span>} />
        <Fact label="Cadastro" value={<span className="mono">{formatDate(e.created_at)}</span>} />
      </Facts>
      <div style={{ marginTop: '1.25rem' }}>
        <DataPanel
          footer={e.cases.length ? <Link className="table-link" to={casesHref({ entity_id: e.id })}>Ver na lista de casos</Link> : undefined}
          meta="Mais recentes primeiro"
          title="Casos da entidade"
        >
          {e.cases.length ? (
            <TableScroll ariaLabel="Casos da entidade">
              <Table>
                <thead>
                  <tr>
                    <th>Caso</th>
                    <th>Status</th>
                    <th>Risco</th>
                    <th>Abertura</th>
                  </tr>
                </thead>
                <tbody>
                  {e.cases.map((c) => (
                    <tr key={c.id}>
                      <td>
                        <Link className="table-link mono" to={`/casos/${c.code}`}>
                          {c.code}
                        </Link>
                        <small style={{ display: 'block', marginTop: '.15rem' }}>{c.title}</small>
                      </td>
                      <td>
                        <CaseStatus status={c.status} />
                      </td>
                      <td>
                        <RiskBadge level={c.risk_level} score={c.risk_score} />
                      </td>
                      <td className="mono">{formatDate(c.created_at)}</td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </TableScroll>
          ) : (
            <EmptyState description='Use "Abrir caso" para iniciar a primeira análise desta entidade.' title="Nenhum caso ainda" />
          )}
        </DataPanel>
      </div>
    </OperationalPage>
  );
}
