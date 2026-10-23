import * as React from 'react';

/**
 * Dot — from @nsights/risk-ops-ui@0.1.0.
 */
export interface DotProps {
  tone: "attention" | "critical" | "gap" | "regular" | "group" | "partners" | "related";
}

export declare const Dot: React.ComponentType<DotProps>;
