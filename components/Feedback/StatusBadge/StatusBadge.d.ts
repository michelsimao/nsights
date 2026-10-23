import * as React from 'react';

/**
 * StatusBadge — from @nsights/risk-ops-ui@0.1.0.
 */
export interface StatusBadgeProps {
  /** O que a pílula diz. Em `gap`/`empty`, o motivo — não "Sem dado". */
  label: string;
  status: "attention" | "critical" | "gap" | "regular" | "empty";
}

export declare const StatusBadge: React.ComponentType<StatusBadgeProps>;
