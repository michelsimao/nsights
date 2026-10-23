import React from 'react';

/** Nsights badge. Variants: default | primary | success | warning | danger | premium | critical. */
export function Badge({ variant = 'default', className = '', children, ...rest }) {
  const cls = ['ns-badge', `ns-badge-${variant}`, className].filter(Boolean).join(' ');
  return (
    <span className={cls} {...rest}>
      {children}
    </span>
  );
}
