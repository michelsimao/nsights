Dot from @nsights/risk-ops-ui. Use via `window.RiskOpsUI.Dot` (bundle loaded from the root `_ds_bundle.js`).

O ponto de cor sozinho, para legendas de gráfico e listas densas onde uma
pílula inteira seria pesada demais.

Nunca use o ponto como único portador do estado: ele acompanha um rótulo.

## Props

```ts
interface DotProps {
  tone: "attention" | "critical" | "gap" | "regular" | "group" | "partners" | "related";
}
```

## Examples

### Legenda

```jsx
() => {
  return (
    <div style={{ display: 'flex', gap: '1rem', fontSize: '.7rem', alignItems: 'center' }}>
      <span style={{ display: 'inline-flex', alignItems: 'center', gap: '.35rem' }}><Dot tone="group" /> Grupo econômico</span>
      <span style={{ display: 'inline-flex', alignItems: 'center', gap: '.35rem' }}><Dot tone="partners" /> Sócios diretos</span>
      <span style={{ display: 'inline-flex', alignItems: 'center', gap: '.35rem' }}><Dot tone="related" /> Relacionadas</span>
      <span style={{ display: 'inline-flex', alignItems: 'center', gap: '.35rem' }}><Dot tone="critical" /> Com apontamento</span>
    </div>
  );
}
```
