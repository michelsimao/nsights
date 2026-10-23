import * as React from 'react';

/**
 * MobileNavigation — from @nsights/risk-ops-ui@0.1.0.
 */
export interface MobileNavigationProps {
  accountItems?: SidebarItem[];
  accountLabel?: string;
  brandHref?: string;
  groups: SidebarGroup[];
  logoutLabel?: string;
  newAnalysisHref?: string;
  newAnalysisLabel?: string;
  onLogout?: () => void;
  onNavigate?: (href: string) => void;
  /** Força o painel aberto (preview/estado controlado). */
  open?: boolean;
}

export declare const MobileNavigation: React.ComponentType<MobileNavigationProps>;
