import * as React from 'react';

/**
 * Badge — from @nsights/risk-ops-ui@0.1.0.
 */
export interface BadgeProps {
  children: React.ReactNode;
  tone: "ok" | "attention" | "critical" | "gap" | "neutral";
}

export declare const Badge: React.ComponentType<BadgeProps>;
