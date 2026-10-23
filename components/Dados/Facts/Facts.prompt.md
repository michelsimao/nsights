Facts from @nsights/risk-ops-ui. Use via `window.RiskOpsUI.Facts` (bundle loaded from the root `_ds_bundle.js`).

Grade de `Fact` com fios de 1px entre as células, como a faixa de métricas.

## Props

```ts
interface FactsProps {
  children: React.ReactNode;
}
```

## Examples

### Faixa

```jsx
() => {
  return (
    <div style={{ width: '34rem' }}>
      <Facts>
        <Fact hint="capital social declarado" label="Capital" value="R$ 4,5 mi" />
        <Fact hint="2 diretos, 3 indiretos" label="Sócios" value="5" />
        <Fact hint="constituída em 2011" label="Idade" value="14 anos" />
      </Facts>
    </div>
  );
}
```
