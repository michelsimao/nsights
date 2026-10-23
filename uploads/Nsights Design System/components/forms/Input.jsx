import React from 'react';

/** Nsights text input. */
export function Input({ label, className = '', ...rest }) {
  const input = <input className={['ns-input', className].filter(Boolean).join(' ')} {...rest} />;
  if (!label) return input;
  return (
    <label style={{ display: 'block' }}>
      <span className="ns-label" style={{ display: 'block', marginBottom: 6 }}>{label}</span>
      {input}
    </label>
  );
}
