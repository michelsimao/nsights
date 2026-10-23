import * as React from 'react';

/**
 * AiCiteMarks — from @nsights/risk-ops-ui@0.1.0.
 */
export interface AiCiteMarksProps {
  active?: number;
  marks: AiCiteMarkItem[];
  onActivate?: (n: number) => void;
}

export declare const AiCiteMarks: React.ComponentType<AiCiteMarksProps>;
