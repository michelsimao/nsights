import * as React from 'react';

/**
 * Nsights icon — Lucide glyphs at 1.75px hairline stroke, currentColor.
 */
export interface IconProps extends React.SVGAttributes<SVGSVGElement> {
  /** Lucide icon name in kebab-case, e.g. "shield-check", "scale", "file-text". */
  name: string;
  /** @default 16 */
  size?: number;
  /** @default 1.75 */
  strokeWidth?: number;
}
export declare function Icon(props: IconProps): JSX.Element;
