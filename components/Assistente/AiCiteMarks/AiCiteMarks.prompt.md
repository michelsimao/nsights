AiCiteMarks from @nsights/risk-ops-ui. Use via `window.RiskOpsUI.AiCiteMarks` (bundle loaded from the root `_ds_bundle.js`).

O grupo de marcas `[1][2]` sobrescritas que o app pendura no fim de uma
afirmação para apontar as fontes. Estado CONTROLADO: `active` diz qual
marca está realçada (a que o leitor acabou de seguir).

## Props

```ts
interface AiCiteMarksProps {
  active?: number;
  marks: AiCiteMarkItem[];
  onActivate?: (n: number) => void;
}
```

## Examples

### NaFrase

```jsx
() => {
  return (
    <p style={{ fontSize: '.78rem', lineHeight: 1.6, margin: 0, width: '28rem' }}>
      A entidade figura no polo passivo em três processos ativos, dois deles com penhora deferida
      <AiCiteMarks
        active={2}
        marks={[
          { n: 1, publisher: 'TJSP — consulta processual' },
          { n: 2, publisher: 'TRF3 — consulta processual' },
        ]}
        onActivate={() => {}}
      />
    </p>
  );
}
```
