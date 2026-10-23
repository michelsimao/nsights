AiHedge from @nsights/risk-ops-ui. Use via `window.RiskOpsUI.AiHedge` (bundle loaded from the root `_ds_bundle.js`).

Um trecho incerto DENTRO da frase: sublinhado tracejado com a ressalva no
`title`. Marca a extrapolação onde ela acontece, em vez de rebaixar a
resposta inteira — o leitor vê exatamente qual pedaço pede verificação.

## Props

```ts
interface AiHedgeProps {
  children: React.ReactNode;
  /** A ressalva: por que este trecho é incerto. */
  title: string;
}
```

## Examples

### Ressalva

```jsx
() => {
  return (
    <p style={{ fontSize: '.78rem', lineHeight: 1.6, margin: 0, width: '28rem' }}>
      O faturamento estimado fica entre R$ 40 e 60 mi;{' '}
      <AiHedge title="Estimado por porte e CNAE — a fonte não publica faturamento.">a margem é larga porque nenhuma fonte consultada publica o valor</AiHedge>, e a confirmação exige demonstrativo da própria entidade.
    </p>
  );
}
```
