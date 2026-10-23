import * as React from 'react';

/**
 * Tabs — from @nsights/risk-ops-ui@0.1.0.
 */
export interface TabsProps {
ariaLabel: string;
  items: { icon?: React.ReactNode; id: string; label: React.ReactNode }[];
  onSelect?: (id: string) => void;
  /** Id da aba ativa. */
  value: string;
  variant?: "panel" | "page";
}

export declare const Tabs: React.ComponentType<TabsProps>;
