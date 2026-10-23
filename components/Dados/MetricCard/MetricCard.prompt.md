MetricCard from @nsights/risk-ops-ui. Use via `window.RiskOpsUI.MetricCard` (bundle loaded from the root `_ds_bundle.js`).

Número avulso em cartão branco, para quando não há uma faixa de quatro —
crédito disponível, total do mês. Rótulo em caixa alta, valor em 2rem.

## Props

```ts
interface MetricCardProps {
  hint?: React.ReactNode;
  label: React.ReactNode;
  value: React.ReactNode;
}
```

## Examples

### Credito

```jsx
() => {
  return (
    <div style={{ display: 'grid', gap: '1px', gridTemplateColumns: '1fr 1fr', background: 'var(--border)', border: '1px solid var(--border)', borderRadius: '.5rem', overflow: 'hidden', width: '30rem' }}>
      <MetricCard hint="renova em 3 dias" label="Créditos disponíveis" value="8.420" />
      <MetricCard hint="média de 62 por análise" label="Consumidos no mês" value="11.203" />
    </div>
  );
}
```
