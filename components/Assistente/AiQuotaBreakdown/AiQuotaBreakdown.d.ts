import * as React from 'react';

/**
 * AiQuotaBreakdown — from @nsights/risk-ops-ui@0.1.0.
 */
export interface AiQuotaBreakdownProps {
  /** Na ordem do app: Estimado, Reservado, Consumido, Liberado. */
  items: AiQuotaItem[];
}

export declare const AiQuotaBreakdown: React.ComponentType<AiQuotaBreakdownProps>;
