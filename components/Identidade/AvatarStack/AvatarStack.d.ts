import * as React from 'react';

/**
 * AvatarStack — from @nsights/risk-ops-ui@0.1.0.
 */
export interface AvatarStackProps {
  children: React.ReactNode;
  /** Descrição do conjunto para leitores de tela (ex.: "6 entidades no lote"). */
  label?: string;
  max?: number;
}

export declare const AvatarStack: React.ComponentType<AvatarStackProps>;
