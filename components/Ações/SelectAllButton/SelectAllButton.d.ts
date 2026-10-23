import * as React from 'react';

/**
 * SelectAllButton — from @nsights/risk-ops-ui@0.1.0.
 */
export interface SelectAllButtonProps {
  /** `true` quando todas as opções (não obrigatórias) já estão marcadas. */
  allSelected: boolean;
  onToggle?: () => void;
}

export declare const SelectAllButton: React.ComponentType<SelectAllButtonProps>;
