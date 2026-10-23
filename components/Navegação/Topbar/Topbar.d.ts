import * as React from 'react';

/**
 * Topbar — from @nsights/risk-ops-ui@0.1.0.
 */
export interface TopbarProps {
  /** Legenda em caixa alta sobre o nome da conta. */
  accountLabel?: string;
  accountName: string;
  /** Slot antes do contexto — lugar do `MobileNavigation`. */
  children?: React.ReactNode;
  /** Legenda em caixa alta sobre o nome do workspace. */
  contextLabel?: string;
  contextName: string;
  /** Duas letras do avatar (ex.: "NO"). */
  initials: string;
  initialsLabel?: string;
}

export declare const Topbar: React.ComponentType<TopbarProps>;
