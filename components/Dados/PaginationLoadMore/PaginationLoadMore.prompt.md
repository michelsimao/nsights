PaginationLoadMore from @nsights/risk-ops-ui. Use via `window.RiskOpsUI.PaginationLoadMore` (bundle loaded from the root `_ds_bundle.js`).

"Carregar mais" de listas com cursor (extrato de créditos): quando não há
contagem total, não há o que numerar — o botão desabilita quando o cursor
acaba ou enquanto carrega.

## Props

```ts
interface PaginationLoadMoreProps {
  disabled?: boolean;
  label?: React.ReactNode;
  onLoadMore?: () => void;
}
```

## Examples

### CarregarMais

```jsx
() => {
  return (
    <div style={{ display: 'grid', gap: '.6rem', justifyItems: 'start', width: '22rem' }}>
      <PaginationLoadMore label="Carregar mais 20 movimentações" onLoadMore={() => {}} />
      <PaginationLoadMore disabled label="Todas as movimentações carregadas" />
    </div>
  );
}
```
