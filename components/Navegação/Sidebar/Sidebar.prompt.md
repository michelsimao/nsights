Sidebar from @nsights/risk-ops-ui. Use via `window.RiskOpsUI.Sidebar` (bundle loaded from the root `_ds_bundle.js`).

A barra lateral escura da plataforma. Recolhida (4rem) por padrão, expandida
(13.5rem) via `data-expanded` — o estado é CONTROLADO pela prop `expanded`
porque é o `AppShell` (via `:has()` no CSS) que reage a esse atributo para
alargar o grid; a sidebar não guarda preferência própria.

A marca é texto (monograma "N" + wordmark "n-sights") em vez das imagens do
app — o design system não embarca assets binários. O grupo "Conta" fica
ancorado no rodapé (`margin-top: auto`), e o botão de recolher é `fixed`,
flutuando ao lado da borda da sidebar, como no app.

Some inteira abaixo de 850px — nessa faixa o chrome é o `MobileNavigation`
dentro do `Topbar`.

## Props

```ts
interface SidebarProps {
  /** Itens do grupo "Conta" (antes do botão de sair). */
  accountItems?: SidebarItem[];
  accountLabel?: string;
  brandAriaLabel?: string;
  brandHref?: string;
  brandTooltip?: string;
  /** Estado controlado: `true` mostra rótulos; `false` vira trilho de ícones com tooltips. */
  expanded: boolean;
  groups: SidebarGroup[];
  logoutLabel?: string;
  newAnalysisHref?: string;
  newAnalysisLabel?: string;
  onLogout?: () => void;
  /** Intercepta os cliques de navegação (previne o default) — útil com router próprio. */
  onNavigate?: (href: string) => void;
  /** Chamado pelo botão de recolher/expandir; o dono do estado inverte `expanded`. */
  onToggle?: () => void;
  /** Sufixo do produto ao lado do wordmark ("Risk Ops"). */
  qualifier?: string;
}
```

## Examples

### Expandida

```jsx
() => {
  return (
    <div style={{ height: '38rem', width: '13.5rem' }}>
      <style>{'.sidebar{display:flex;flex-direction:column;position:static;min-height:100%;height:100%}'}</style>
      <Sidebar expanded groups={grupos} />
    </div>
  );
}

/** Recolhida (4rem): trilho de ícones com tooltips via data-tooltip; monograma no lugar do wordmark. */
```

### Recolhida

```jsx
() => {
  return (
    <div style={{ height: '38rem', width: '4rem' }}>
      <style>{'.sidebar{display:flex;flex-direction:column;position:static;min-height:100%;height:100%}'}</style>
      <Sidebar expanded={false} groups={grupos} />
    </div>
  );
}
```
