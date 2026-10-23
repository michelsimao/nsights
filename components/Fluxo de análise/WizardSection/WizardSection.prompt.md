WizardSection from @nsights/risk-ops-ui. Use via `window.RiskOpsUI.WizardSection` (bundle loaded from the root `_ds_bundle.js`).

O bloco branco de um passo. Um por passo — dois blocos competindo pela mesma
decisão é o que faz o usuário parar.

## Props

```ts
interface WizardSectionProps {
  children: React.ReactNode;
}
```

## Examples

### Passo

```jsx
() => {
  return (
    <div style={{ width: '38rem' }}>
      <WizardSection>
        <SectionHeading description="O escopo define quantas consultas a análise dispara — e, portanto, quanto custa." kicker="Passo 3 de 5" title="Escopo da análise" />
        <div style={{ display: 'grid', gap: '.6rem', gridTemplateColumns: '1fr 1fr' }}>
          <SelectableCard description="Só a entidade consultada." intensity={1} selected title="Entidade" />
          <SelectableCard description="A entidade e seus sócios diretos." intensity={2} title="Entidade e sócios" />
        </div>
      </WizardSection>
    </div>
  );
}
```
