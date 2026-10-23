Alert from @nsights/risk-ops-ui. Use via `window.RiskOpsUI.Alert` (bundle loaded from the root `_ds_bundle.js`).

Aviso em bloco, no fluxo da página — para o que o usuário precisa saber
antes de agir.

`warning` é o `.alert` âmbar original do app. Os outros três tons são
extensão `ns-` pedida pelo produto (28/08/2026), com os pares de cor das
rampas de estado que os badges já usam — aviso e badge dizem a mesma coisa
com a mesma cor. `danger` anuncia com `role="alert"` (leitura imediata);
os demais com `role="status"`.

## Props

```ts
interface AlertProps {
  children: React.ReactNode;
  /** Primeira linha em negrito, quando o aviso tem manchete. */
  title?: React.ReactNode;
  tone?: "warning" | "info" | "success" | "danger";
}
```

## Examples

### Tons

```jsx
() => {
  return (
    <div style={{ display: 'grid', gap: '.6rem', width: '32rem' }}>
      <Alert title="Cobertura parcial" tone="warning">Duas fontes do escopo estão indisponíveis. A análise segue, e falha parcial não é cobrada.</Alert>
      <Alert tone="info">A política congela na versão vigente quando a análise começa — reprocessar depois não muda o veredito já emitido.</Alert>
      <Alert tone="success">Matriz exportada. O arquivo ficou disponível em Entregáveis por 30 dias.</Alert>
      <Alert title="Fonte regulatória fora do ar" tone="danger">Sanções falhou após 3 tentativas — o checklist marca lacuna de cobertura, não ausência de apontamento.</Alert>
    </div>
  );
}
```
