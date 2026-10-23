import React from 'react';

/** Nsights button. Variants: primary | secondary | ghost | gold. Sizes: md (default) | sm. */
export function Button({ variant = 'primary', size = 'md', iconOnly = false, disabled = false, className = '', children, ...rest }) {
  const cls = ['ns-btn', `ns-btn-${variant}`, size === 'sm' ? 'ns-btn-sm' : '', iconOnly ? 'ns-btn-iconly' : '', className].filter(Boolean).join(' ');
  return (
    <button className={cls} disabled={disabled} {...rest}>
      {children}
    </button>
  );
}
