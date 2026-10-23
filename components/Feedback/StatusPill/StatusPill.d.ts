import * as React from 'react';

/**
 * StatusPill — from @nsights/risk-ops-ui@0.1.0.
 */
export interface StatusPillProps {
  children: React.ReactNode;
  status?: "done" | "failed" | "ativa" | "alerta" | "inativa" | "cancelled";
}

export declare const StatusPill: React.ComponentType<StatusPillProps>;
