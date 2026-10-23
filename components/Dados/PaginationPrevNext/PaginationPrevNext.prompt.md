PaginationPrevNext from @nsights/risk-ops-ui. Use via `window.RiskOpsUI.PaginationPrevNext` (bundle loaded from the root `_ds_bundle.js`).

Paginação Anterior/Próxima da tabela granular do QSA — sem números, porque
ali a pessoa varre sequencialmente, não salta. O "Página 2 de 7" fica entre
os botões, em mono, exatamente como no app.

## Props

```ts
interface PaginationPrevNextProps {
  /** Resumo à esquerda ("Exibindo 1–20 de 132"). */
  info?: React.ReactNode;
  onChange?: (page: number) => void;
  /** 1-based. */
  page: number;
  pages: number;
}
```

## Examples

### AnteriorProxima

```jsx
() => {
  return (
    <div style={{ width: '26rem' }}>
      <PaginationPrevNext info="Exibindo 21–40 de 132" onChange={() => {}} page={2} pages={7} />
    </div>
  );
}
```
