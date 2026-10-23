Mono from @nsights/risk-ops-ui. Use via `window.RiskOpsUI.Mono` (bundle loaded from the root `_ds_bundle.js`).

Identificador com cara de identificador: CPF/CNPJ, número de processo, hash,
valor, data-hora.

Usa Geist Mono com `tabular-nums`, então uma coluna de números alinha na
vertical. Todo dado que o usuário compara, copia ou confere passa por aqui —
texto corrido não.

## Props

```ts
interface MonoProps {
  children: React.ReactNode;
}
```

## Examples

### Identificadores

```jsx
() => {
  return (
    <div style={{ display: 'grid', gap: '.45rem', fontSize: '.75rem', width: '26rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}><span>CNPJ</span><Mono>12.345.678/0001-90</Mono></div>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}><span>Processo</span><Mono>1023456-78.2023.8.26.0100</Mono></div>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}><span>Evidência</span><Mono>sha256:9f2b…c41e</Mono></div>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}><span>Concluída</span><Mono>28/08/2026 09:14</Mono></div>
    </div>
  );
}
```
