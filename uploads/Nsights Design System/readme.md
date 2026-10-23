# Nsights Editorial Design System

Canonical design system for the **Nsights** application — a due-diligence / research-report product (relatórios de diligência, document generation, chart-heavy analysis). Theme: **Editorial** — café/creamy dark palette (default) and warm-white/deep-ink light palette, amethyst/lilac accent, hairline borders, Newsreader serif typography.

**Sources provided:**
- Written design-system specification pasted by the user (tables of tokens, typography, components, animations) — this repo is a faithful transcription of it.
- `uploads/logo_light.png` — Nsights wordmark (dark text + purple-gradient "N"), for light backgrounds.
- `uploads/logo_dark.png` — Nsights wordmark (cream text + purple-gradient "N"), for dark backgrounds.
- Referenced-but-not-attached source files: `src/styles/tokens.css`, `typography.css`, `components.css`, `effects.css`, `openui-theme.css`, `tailwind.config.js`, `src/contexts/ThemeContext.tsx`, `src/components/workflows/output/blocks/{DocumentBlock,RelatorioBlock}.tsx`, `src/lib/workflows/reports/themes.ts`. Not readable here; values come from the spec.

## Philosophy

- Inspiration: Penguin Classics, NYT, Stripe docs, Cereal.
- **Dark mode is the default.** Café base `#0e0c09` — never pure black. Light mode: warm white `#f7f5f0` — never pure white.
- Text: deep ink `#1a1612` (light) / creamy `#f5f1e8` (dark) — never pure black/white.
- Accent: deep amethyst `#6b3fd4` (light) / soft lilac `#ae7aff` (dark).
- Hairline borders (0.5–1px), theme-aware via `var(--ns-border)`.
- Theme transitions: `0.4s cubic-bezier(0.4, 0, 0.2, 1)` on bg/border/color.
- Theming: `:root` = light, `.dark` class on `<html>` = dark. Persisted in `localStorage['ns-theme']`.

## CONTENT FUNDAMENTALS

- **Language: Brazilian Portuguese.** Report themes are named "Identidade & cadastro", "Estrutura societária", "Sanções & Compliance", "Processos judiciais", etc. UI copy should be pt-BR by default.
- Tone: institutional, precise, editorial — reads like a broadsheet or legal brief, not a startup. No exclamation marks, no hype.
- Casing: sentence case for headings and labels; tiny uppercase kickers/labels (`.ns-label-caps`) for metadata and section eyebrows.
- **No emoji.** Ampersand "&" used in category names ("Marcas & patentes").
- Report prose is long-form serif with dropcaps, citations as superscript numerals (`sup.cite`), figure captions in italic.
- Report theme vocabulary (14 categories): identidade, societario, sancoes_compliance, judicial, credito_financeiro, patrimonio, propriedade_intelectual, trabalhista, falencias, certidoes, regulatorio, midia_politico, presenca_digital, pesquisa_aberta.

## VISUAL FOUNDATIONS

- **Color:** warm café/cream neutrals; amethyst accent; gold (`--ns-accent-gold`) as premium/secondary accent; muted semáforo semantics (success sage green, warning gold, danger terracotta — never saturated RGB traffic lights).
- **Type:** Manrope (sans) for all UI; Newsreader (serif) for report headings AND report body prose; JetBrains Mono for code/tabular data. Data numerals use heavy Manrope (`.ns-data-*`, 600–700 weight, tight tracking).
- **Backgrounds:** flat solid warm tones; layering via `base → card → elevated` steps, not shadows. No photographic backgrounds, no textures. Gradients only on gold buttons/badges and slow ambient animations.
- **Borders:** hairline 1px everywhere; borders (not shadows) delineate. Shadows exist but are whisper-quiet (4–8% opacity in light).
- **Cards:** `--ns-radius-card: 8px`, 1px border, `::before` hairline top gradient (heading-color → transparent), hover = accent border + soft glow. No colored-left-border cards.
- **Hover states:** subtle bg tint (`--ns-bg-hover` ≈ 5–6% ink/cream) or border darkening; accent tint for active states.
- **Focus:** accent border + 3px ring at 8% accent.
- **Motion:** `cubic-bezier(0.4, 0, 0.2, 1)`; theme cross-fade 0.4s; entrances `fade-in-up` (0.65s) and `blur-in` (1s); ambient loops slow (6–15s). Nothing bouncy.
- **Radii:** card 8px, button/input 6px (but `.ns-btn` base uses 8px), pill 9999px.
- **Transparency/blur:** rgba-based tint layers for hover/active/ghost; no backdrop blur specified.
- **Charts:** 5 scales — sequential (amethyst), sequential-light, diverging (amethyst↔peach), warm mono, categorical (8). **Chart stop hexes are DERIVED here** (spec named scales but not values) — replace with real values if available.

## ICONOGRAPHY

- **Icon set: [Lucide](https://lucide.dev)** at **1.75px hairline stroke** (1.6px at sizes ≤14px), 13–18px, always `currentColor`. Exposed as the `Icon` React component (`components/icons/`), which lazy-loads the Lucide UMD library from CDN. This was an addition (no set was specified in the sources) — chosen because its hairline stroke matches the editorial aesthetic.
- Muted by default: icons render in `--ns-text-muted`/`--ns-text-secondary`, taking accent color only when active.
- No emoji, ever. Unicode glyphs acceptable for inline affordances (→, ↗, ×, •) in editorial contexts.
- **Logo:** `assets/logo_light.png` (light backgrounds) and `assets/logo_dark.png` (dark backgrounds — cream wordmark, gradient "N").

## Index

- `styles.css` — global entry (imports everything below)
- `tokens/colors.css` — dual-theme color tokens (`--ns-*`), shadows, radii, motion
- `tokens/fonts.css` — font stacks + Google Fonts loading (Manrope, Newsreader, JetBrains Mono)
- `tokens/typography.css` — `.ns-display/.ns-h1/.ns-body/.ns-label-caps/.ns-data-*` UI type classes
- `tokens/charts.css` — 5 chart scales (derived values)
- `tokens/components.css` — `.ns-btn-*`, `.ns-badge-*`, `.ns-input`, `.ns-unified-card`
- `tokens/prose.css` — `.document-prose`, `.relatorio-prose`, cover (`.ns-cover-*`), TOC (`.ns-toc`)
- `tokens/effects.css` — keyframes + `.ns-anim-*`, body reset
- `assets/logo_light.png` / `assets/logo_dark.png` — wordmarks (light / dark backgrounds)
- `components/core/` — React primitives: Button, Badge, Input, Card, Icon (+ cards)
- `guidelines/` — foundation specimen cards (Design System tab)
- `ui_kits/nsights/` — app recreation (report reader view)
- `SKILL.md` — agent skill entry point

**Intentional additions:** `Icon` (Lucide wrapper — no icon set was specified) and `iconOnly` button variant; chart hexes are derived. Button metrics were refined from the spec's 14px/600/10×20px to 13px/500/8×14px at the user's request ("botões muito grosseiros").
