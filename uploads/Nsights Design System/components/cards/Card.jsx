import React from 'react';

/** Nsights unified card — hairline top gradient, accent hover glow. */
export function Card({ padding = 20, className = '', style, children, ...rest }) {
  return (
    <div className={['ns-unified-card', className].filter(Boolean).join(' ')} style={{ padding, ...style }} {...rest}>
      {children}
    </div>
  );
}
