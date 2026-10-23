MobileNavigation from @nsights/risk-ops-ui. Use via `window.RiskOpsUI.MobileNavigation` (bundle loaded from the root `_ds_bundle.js`).

O menu principal em telas estreitas (≤ 850px, quando a `Sidebar` some):
um `<details>` com o botão hambúrguer no `Topbar` e um painel claro
flutuante com a mesma navegação. Acima de 850px o CSS o esconde inteiro.

`open` é controlado (atributo do `<details>`) para a preview estática
conseguir mostrar o painel aberto; sem a prop, o próprio `<details>` cuida
de abrir e fechar, como no app.

## Props

```ts
interface MobileNavigationProps {
  accountItems?: SidebarItem[];
  accountLabel?: string;
  brandHref?: string;
  groups: SidebarGroup[];
  logoutLabel?: string;
  newAnalysisHref?: string;
  newAnalysisLabel?: string;
  onLogout?: () => void;
  onNavigate?: (href: string) => void;
  /** Força o painel aberto (preview/estado controlado). */
  open?: boolean;
}
```

## Examples

### MenuAberto

```jsx
() => {
  return (
    <div style={{ background: 'var(--surface)', minHeight: '38rem', width: '26rem' }}>
      <Topbar accountName="Operações" contextName="Nsights Risk Ops" initials="NO">
        <MobileNavigation groups={grupos} open />
      </Topbar>
    </div>
  );
}
```
