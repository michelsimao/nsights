// Navegação principal. Os ícones são os nomes aceitos pela Sidebar do DS
// (overview, analyses, kyc, risk, consultations, settings).
export const NAV_GROUPS = [
  {
    label: 'Operação',
    items: [
      { href: '/', icon: 'overview', label: 'Resumo' },
      { href: '/casos', icon: 'analyses', label: 'Casos' },
      { href: '/entidades', icon: 'kyc', label: 'Entidades' },
    ],
  },
];

export const NEW_CASE_HREF = '/casos/novo';

/** Marca o item da rota atual (`/casos/RK-…` mantém "Casos" ativo). */
export function withActive(groups, pathname) {
  return groups.map((group) => ({
    ...group,
    items: group.items.map((item) => ({
      ...item,
      active: item.href === '/' ? pathname === '/' : pathname === item.href || pathname.startsWith(`${item.href}/`),
    })),
  }));
}

export const ROLE_LABELS = { admin: 'Administrador', analyst: 'Analista' };

export function initials(name = '') {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (!parts.length) return '?';
  const first = parts[0][0];
  const last = parts.length > 1 ? parts[parts.length - 1][0] : (parts[0][1] ?? '');
  return (first + last).toUpperCase();
}
