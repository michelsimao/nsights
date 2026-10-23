InlineEmpty from @nsights/risk-ops-ui. Use via `window.RiskOpsUI.InlineEmpty` (bundle loaded from the root `_ds_bundle.js`).

O vazio miúdo, centralizado, para dentro de uma aba ou lista já pequena —
uma linha de texto cinza, sem marca nem título.

## Props

```ts
interface InlineEmptyProps {
  children: React.ReactNode;
}
```

## Examples

### DentroDoPainel

```jsx
() => {
  return (
    <div style={{ width: '26rem' }}>
      <Panel tag="0 processos" title="Processos judiciais">
        <InlineEmpty>Nenhum processo nos últimos cinco anos.</InlineEmpty>
      </Panel>
    </div>
  );
}
```
