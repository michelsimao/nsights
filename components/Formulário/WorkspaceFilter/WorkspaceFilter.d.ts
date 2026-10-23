import * as React from 'react';

/**
 * WorkspaceFilter — from @nsights/risk-ops-ui@0.1.0.
 */
export interface WorkspaceFilterProps {
  /** O `select` (ou outro controle compacto). */
  children: React.ReactNode;
  label: string;
}

export declare const WorkspaceFilter: React.ComponentType<WorkspaceFilterProps>;
