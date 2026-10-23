# Nsights App UI Kit

Recreation of the Nsights report-reader view, built from the written spec (no codebase/Figma attached — layout is inferred; visuals follow the token spec exactly).

- `index.html` — interactive: click report themes in the sidebar, toggle dark/light.
- `Sidebar.jsx` — sidebar with the 14 report themes (`themes.ts`), theme toggle.
- `ReportView.jsx` — cover (capa), `.relatorio-prose` article, sticky TOC (Sumário).

Composes `Badge` from the design-system bundle; typography/prose/TOC come from `tokens/*.css`.
