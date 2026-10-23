LiveDot from @nsights/risk-ops-ui. Use via `window.RiskOpsUI.LiveDot` (bundle loaded from the root `_ds_bundle.js`).

O ponto verde de presença ("conectado", "ao vivo"). Decorativo por decisão:
quem o usa põe o estado por extenso ao lado — cor sozinha não é informação.

## Examples

### AoVivo

```jsx
() => {
  return (
    <div style={{ alignItems: 'center', display: 'flex', fontSize: '.72rem', gap: '.4rem', width: '22rem' }}>
      <LiveDot /> Coletando fontes — 214 de 812 consultas
    </div>
  );
};

/** No cabeçalho do agente. */
```

### NoAgente

```jsx
() => {
  return <div style={{ width: '22rem' }}><AiIdentity name="Agente de Consultas" state={<><LiveDot /> respondendo…</>} /></div>;
}
```
