import * as React from 'react';

/**
 * WorkspaceSearch — from @nsights/risk-ops-ui@0.1.0.
 */
export interface WorkspaceSearchProps {
  ariaLabel: string;
  label?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  value?: string;
}

export declare const WorkspaceSearch: React.ComponentType<WorkspaceSearchProps>;
