VerdictBadge from @nsights/risk-ops-ui. Use via `window.RiskOpsUI.VerdictBadge` (bundle loaded from the root `_ds_bundle.js`).

O veredito da análise, em caixa alta.

`inconclusive` é um veredito de verdade e tem cor própria (roxo, não cinza):
não conseguimos concluir é diferente de concluímos que não incide, e o
produto inteiro depende dessa distinção não se perder na UI.

## Props

```ts
interface VerdictBadgeProps {
  children: React.ReactNode;
  verdict: "high" | "low" | "medium" | "vetoed" | "inconclusive";
}
```

## Examples

### Vereditos

```jsx
() => {
  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '.45rem', alignItems: 'center' }}>
      <VerdictBadge verdict="low">Risco baixo</VerdictBadge>
      <VerdictBadge verdict="medium">Risco médio</VerdictBadge>
      <VerdictBadge verdict="high">Risco alto</VerdictBadge>
      <VerdictBadge verdict="vetoed">Veto</VerdictBadge>
      <VerdictBadge verdict="inconclusive">Inconclusivo</VerdictBadge>
    </div>
  );
}
```
