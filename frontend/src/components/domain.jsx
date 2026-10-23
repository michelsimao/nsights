// Peças de domínio reutilizadas nas telas: estado sempre com rótulo, nunca só cor.
import { Badge, StatusPill } from '../ds/index.js';
import { RISK_LABELS, STATUS_LABELS, formatDate, formatDocument, relativeDays } from '../lib/format.js';

const STATUS_PILL = { aberto: 'cancelled', em_analise: 'alerta', aprovado: 'done', reprovado: 'failed' };
const RISK_TONE = { baixo: 'ok', medio: 'attention', alto: 'critical' };

export function CaseStatus({ status }) {
  return <StatusPill status={STATUS_PILL[status]}>{STATUS_LABELS[status] ?? status}</StatusPill>;
}

/** "Alto · 94": nível e score juntos. */
export function RiskBadge({ level, score }) {
  return (
    <Badge tone={RISK_TONE[level]}>
      {RISK_LABELS[level] ?? level}
      {score !== undefined ? <span className="mono">&nbsp;·&nbsp;{score}</span> : null}
    </Badge>
  );
}

/** Prazo com a distância relativa; caso ativo vencido ganha o selo "Atrasado". */
export function DueDate({ iso, overdue, closed }) {
  return (
    <span style={{ alignItems: 'center', display: 'inline-flex', flexWrap: 'wrap', gap: '.4rem' }}>
      <span className="mono">{formatDate(iso)}</span>
      {overdue ? <Badge tone="critical">Atrasado</Badge> : null}
      {!overdue && !closed ? <small style={{ color: 'var(--muted)' }}>{relativeDays(iso)}</small> : null}
    </span>
  );
}

export function Document({ value, kind }) {
  return <span className="mono">{formatDocument(value, kind)}</span>;
}
