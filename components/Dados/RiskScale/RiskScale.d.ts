import * as React from 'react';

/**
 * RiskScale — from @nsights/risk-ops-ui@0.1.0.
 */
export interface RiskScaleProps {
items: { label: string; swatch: "aten" | "agrav" | "grave" | "veto" | "clear" | "unknown" | "stale" }[];
  title?: string;
}

export declare const RiskScale: React.ComponentType<RiskScaleProps>;
