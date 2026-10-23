import * as React from 'react';

/**
 * SectionHeading — from @nsights/risk-ops-ui@0.1.0.
 */
export interface SectionHeadingProps {
  /** Linha de apoio sob o título. Uma frase. */
  description?: React.ReactNode;
  /** Rótulo curto em caixa alta, acima do título. */
  kicker?: React.ReactNode;
  title: React.ReactNode;
}

export declare const SectionHeading: React.ComponentType<SectionHeadingProps>;
