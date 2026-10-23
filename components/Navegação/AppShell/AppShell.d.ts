import * as React from 'react';

/**
 * AppShell — from @nsights/risk-ops-ui@0.1.0.
 */
export interface AppShellProps {
  /** O conteúdo da tela (tipicamente um `OperationalPage`). */
  children: React.ReactNode;
  /** A `Sidebar` — é o `data-expanded` dela que dimensiona o grid. */
  sidebar: React.ReactNode;
  skipLinkLabel?: string;
  /** O `Topbar` fixo no topo da coluna principal. */
  topbar?: React.ReactNode;
}

export declare const AppShell: React.ComponentType<AppShellProps>;
