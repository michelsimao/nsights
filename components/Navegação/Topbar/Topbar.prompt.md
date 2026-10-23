Topbar from @nsights/risk-ops-ui. Use via `window.RiskOpsUI.Topbar` (bundle loaded from the root `_ds_bundle.js`).

A faixa fixa no topo da coluna principal: contexto do workspace à esquerda,
conta e avatar de iniciais à direita. Fica `sticky` com fundo translúcido e
blur — o conteúdo rola por baixo dela sem perder o chrome.

`children` é renderizado ANTES do contexto: é o slot do `MobileNavigation`
(o hambúrguer só aparece ≤ 850px; em desktop o slot fica vazio e invisível),
na mesma ordem do app.

O avatar é um `<b>` com iniciais sobre o fundo escuro — não há upload de
foto no produto; o `aria-label` diz quem está conectado porque duas letras
sozinhas não dizem nada a um leitor de tela.

## Props

```ts
interface TopbarProps {
  /** Legenda em caixa alta sobre o nome da conta. */
  accountLabel?: string;
  accountName: string;
  /** Slot antes do contexto — lugar do `MobileNavigation`. */
  children?: React.ReactNode;
  /** Legenda em caixa alta sobre o nome do workspace. */
  contextLabel?: string;
  contextName: string;
  /** Duas letras do avatar (ex.: "NO"). */
  initials: string;
  initialsLabel?: string;
}
```

## Examples

### ContextoDaOperacao

```jsx
() => {
  return (
    <div style={{ background: 'var(--surface)', width: '64rem' }}>
      <Topbar accountName="Operações" contextName="Nsights Risk Ops" initials="NO" />
    </div>
  );
}
```
