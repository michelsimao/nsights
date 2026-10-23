import * as React from 'react';

/**
 * Sidebar — from @nsights/risk-ops-ui@0.1.0.
 */
export interface SidebarProps {
  /** Itens do grupo "Conta" (antes do botão de sair). */
  accountItems?: SidebarItem[];
  accountLabel?: string;
  brandAriaLabel?: string;
  brandHref?: string;
  brandTooltip?: string;
  /** Estado controlado: `true` mostra rótulos; `false` vira trilho de ícones com tooltips. */
  expanded: boolean;
  groups: SidebarGroup[];
  logoutLabel?: string;
  newAnalysisHref?: string;
  newAnalysisLabel?: string;
  onLogout?: () => void;
  /** Intercepta os cliques de navegação (previne o default) — útil com router próprio. */
  onNavigate?: (href: string) => void;
  /** Chamado pelo botão de recolher/expandir; o dono do estado inverte `expanded`. */
  onToggle?: () => void;
  /** Sufixo do produto ao lado do wordmark ("Risk Ops"). */
  qualifier?: string;
}

export declare const Sidebar: React.ComponentType<SidebarProps>;
