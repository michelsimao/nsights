import React from 'react';

const LUCIDE_SRC = 'https://unpkg.com/lucide@0.462.0/dist/umd/lucide.min.js';
let lucideLoading = null;

function ensureLucide() {
  if (window.lucide && window.lucide.icons) return Promise.resolve(window.lucide);
  if (!lucideLoading) {
    lucideLoading = new Promise((resolve) => {
      let s = document.querySelector('script[data-ns-lucide]');
      if (!s) {
        s = document.createElement('script');
        s.src = LUCIDE_SRC;
        s.setAttribute('data-ns-lucide', '');
        document.head.appendChild(s);
      }
      s.addEventListener('load', () => resolve(window.lucide));
      s.addEventListener('error', () => resolve(null));
    });
  }
  return lucideLoading;
}

function pascal(name) {
  return String(name).split('-').map((p) => p.charAt(0).toUpperCase() + p.slice(1)).join('');
}

/** Nsights icon — Lucide glyph at hairline 1.75px stroke, colored via currentColor. */
export function Icon({ name, size = 16, strokeWidth = 1.75, style, ...rest }) {
  const [, force] = React.useReducer((x) => x + 1, 0);
  const ready = window.lucide && window.lucide.icons;
  React.useEffect(() => {
    if (!ready) ensureLucide().then(() => force());
  }, [ready]);

  const node = ready ? window.lucide.icons[pascal(name)] : null;
  if (!node) {
    return <span style={{ display: 'inline-block', width: size, height: size, ...style }} {...rest}></span>;
  }
  const kids = Array.isArray(node[0]) ? node : node[2] || [];
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      style={{ flexShrink: 0, ...style }}
      aria-hidden="true"
      {...rest}
    >
      {kids.map(([tag, attrs], i) => React.createElement(tag, { key: i, ...attrs }))}
    </svg>
  );
}
