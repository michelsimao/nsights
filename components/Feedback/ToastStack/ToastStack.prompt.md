ToastStack from @nsights/risk-ops-ui. Use via `window.RiskOpsUI.ToastStack` (bundle loaded from the root `_ds_bundle.js`).

A pilha fixa no canto inferior direito. Uma por aplicação: cada aviso novo
entra embaixo e os anteriores sobem, em vez de avisos soltos disputando o
mesmo canto.

## Props

```ts
interface ToastStackProps {
  children: React.ReactNode;
}
```

## Examples

### Pilha

```jsx
() => {
  return (
    <div style={{ minHeight: '11rem', position: 'relative', width: '26rem' }}>
      <ToastStack>
        <Toast title="Análise iniciada" tone="success">812 consultas em fila para ACME Participações.</Toast>
        <Toast action={<Button variant="secondary">Tentar de novo</Button>} title="Fonte indisponível" tone="warning">Sanções falhou após 3 tentativas — a cobertura sai parcial.</Toast>
      </ToastStack>
    </div>
  );
}
```
