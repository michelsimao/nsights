// Rótulos e formatação de valores do domínio, em pt-BR.

export const STATUS_LABELS = {
  aberto: 'Aberto',
  em_analise: 'Em análise',
  aprovado: 'Aprovado',
  reprovado: 'Reprovado',
};
export const STATUS_ORDER = ['aberto', 'em_analise', 'aprovado', 'reprovado'];
export const ACTIVE_STATUSES = ['aberto', 'em_analise'];

export const RISK_LABELS = { baixo: 'Baixo', medio: 'Médio', alto: 'Alto' };
export const RISK_ORDER = ['alto', 'medio', 'baixo'];

export const KIND_LABELS = { PF: 'Pessoa física', PJ: 'Pessoa jurídica' };

/** Mesma regra do backend (coluna gerada): <40 baixo, <70 médio, ≥70 alto. */
export function riskLevelFor(score) {
  if (score < 40) return 'baixo';
  if (score < 70) return 'medio';
  return 'alto';
}

/** Prazo padrão do backend, em dias, por nível de risco. */
export const SLA_DAYS = { alto: 3, medio: 7, baixo: 15 };

export function onlyDigits(value = '') {
  return String(value).replace(/\D/g, '');
}

/** CPF 000.000.000-00, CNPJ 00.000.000/0000-00; parcial enquanto digita. */
export function formatDocument(value, kind) {
  const d = onlyDigits(value);
  const isCnpj = kind ? kind === 'PJ' : d.length > 11;
  if (isCnpj) {
    return d
      .slice(0, 14)
      .replace(/^(\d{2})(\d)/, '$1.$2')
      .replace(/^(\d{2})\.(\d{3})(\d)/, '$1.$2.$3')
      .replace(/\.(\d{3})(\d)/, '.$1/$2')
      .replace(/(\d{4})(\d)/, '$1-$2');
  }
  return d
    .slice(0, 11)
    .replace(/(\d{3})(\d)/, '$1.$2')
    .replace(/(\d{3})(\d)/, '$1.$2')
    .replace(/(\d{3})(\d{1,2})$/, '$1-$2');
}

const dateFmt = new Intl.DateTimeFormat('pt-BR', { day: '2-digit', month: '2-digit', year: 'numeric' });
const dateTimeFmt = new Intl.DateTimeFormat('pt-BR', {
  day: '2-digit',
  month: '2-digit',
  year: 'numeric',
  hour: '2-digit',
  minute: '2-digit',
});

export const formatDate = (iso) => (iso ? dateFmt.format(new Date(iso)) : '—');
export const formatDateTime = (iso) => (iso ? dateTimeFmt.format(new Date(iso)) : '—');

/** "há 3 dias", "em 2 dias", "hoje": distância em dias corridos, no fuso local. */
export function relativeDays(iso) {
  const day = (d) => new Date(d.getFullYear(), d.getMonth(), d.getDate()).getTime();
  const diff = Math.round((day(new Date(iso)) - day(new Date())) / 86_400_000);
  if (diff === 0) return 'hoje';
  if (diff === 1) return 'amanhã';
  if (diff === -1) return 'ontem';
  return diff > 0 ? `em ${diff} dias` : `há ${-diff} dias`;
}

/** ISO → valor de <input type="date"> no fuso local. */
export function toDateInput(iso) {
  if (!iso) return '';
  const d = new Date(iso);
  const pad = (n) => String(n).padStart(2, '0');
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
}

/** <input type="date"> → ISO com fuso; o prazo vale até o fim do dia escolhido. */
export function fromDateInput(value) {
  return value ? new Date(`${value}T23:59:59`).toISOString() : null;
}

export const plural = (n, one, many) => `${n.toLocaleString('pt-BR')} ${n === 1 ? one : many}`;
