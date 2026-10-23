WizardCard from @nsights/risk-ops-ui. Use via `window.RiskOpsUI.WizardCard` (bundle loaded from the root `_ds_bundle.js`).

Cartão cinza-claro dentro de um passo, para uma escolha secundária ou um resumo.

## Props

```ts
interface WizardCardProps {
  children?: React.ReactNode;
  description?: React.ReactNode;
  title?: React.ReactNode;
}
```

## Examples

### Resumo

```jsx
() => {
  return (
    <div style={{ width: '28rem' }}>
      <WizardCard description="A política congela na versão vigente no momento em que a análise começa — reprocessar depois não muda o veredito já emitido." title="Política aplicada">
        <p style={{ fontSize: '.75rem', margin: 0 }}><strong>Crédito PJ — v4</strong> · vigente desde 12/06/2026</p>
      </WizardCard>
    </div>
  );
}
```
