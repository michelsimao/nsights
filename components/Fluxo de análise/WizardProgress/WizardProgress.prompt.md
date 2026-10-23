WizardProgress from @nsights/risk-ops-ui. Use via `window.RiskOpsUI.WizardProgress` (bundle loaded from the root `_ds_bundle.js`).

A trilha de passos do topo do assistente: um traço por passo, o percorrido em
degradê roxo-coral.

Passo já visitado é clicável e volta para ele; passo à frente fica desabilitado.
Deixar tudo clicável convida a pular etapa que ainda não tem dado.

## Props

```ts
interface WizardProgressProps {
/** Índice do passo em que o usuário está. */
  current: number;
  onSelect?: (id: string) => void;
  /** Até que índice já se avançou. Passos acima disso não são clicáveis. */
  reached?: number;
  steps: { id: string; label: string }[];
}
```

## Examples

### NoTerceiroPasso

```jsx
() => {
  return (
    <div style={{ width: '38rem' }}>
      <WizardProgress current={2} steps={STEPS} />
    </div>
  );
}
```
