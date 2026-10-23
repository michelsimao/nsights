import * as React from 'react';

/**
 * Skeleton — from @nsights/risk-ops-ui@0.1.0.
 */
export interface SkeletonProps {
  /** Altura em CSS, quando nenhuma forma serve. */
  height?: string;
  shape?: "line" | "wide" | "card" | "panel";
  /** Largura em CSS. */
  width?: string;
}

export declare const Skeleton: React.ComponentType<SkeletonProps>;
