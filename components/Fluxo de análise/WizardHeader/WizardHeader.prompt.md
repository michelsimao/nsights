WizardHeader from @nsights/risk-ops-ui. Use via `window.RiskOpsUI.WizardHeader` (bundle loaded from the root `_ds_bundle.js`).

O cabeçalho do assistente: título grande e uma linha de apoio. Vem antes da
trilha de passos.

## Props

```ts
interface WizardHeaderProps {
  description?: React.ReactNode;
  title: React.ReactNode;
}
```

## Examples

### Abertura

```jsx
() => {
  return (
    <div style={{ width: '38rem' }}>
      <WizardHeader description="Escolha o escopo e as fontes. O custo aparece no rodapé antes de você confirmar." title="Nova análise de KYC" />
      <WizardProgress current={0} steps={[{ id: 'modo', label: 'Modo' }, { id: 'sujeito', label: 'Sujeito' }, { id: 'escopo', label: 'Escopo' }]} />
    </div>
  );
}
```
