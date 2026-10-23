Segmented from @nsights/risk-ops-ui. Use via `window.RiskOpsUI.Segmented` (bundle loaded from the root `_ds_bundle.js`).

Alternador de poucas opções mutuamente exclusivas — período, densidade, modo
de visualização. Vive dentro de `FilterBar` ou `Toolbar`.

Até quatro opções. Passou disso, é um `select`: o segmentado só ganha do
dropdown enquanto todas as opções cabem visíveis ao mesmo tempo.

## Props

```ts
interface SegmentedProps {
ariaLabel: string;
  onSelect?: (id: string) => void;
  options: { icon?: React.ReactNode; id: string; label: React.ReactNode }[];
  value: string;
}
```

## Examples

### Recorte

```jsx
() => {
  return (
    <div style={{ display: 'grid', gap: '.6rem', justifyItems: 'start' }}>
      <Segmented ariaLabel="Período" options={[{ id: '7', label: '7d' }, { id: '30', label: '30d' }, { id: '90', label: '90d' }]} value="30" />
      <Segmented ariaLabel="Visão" options={[{ id: 'lista', label: 'Lista' }, { id: 'grafo', label: 'Grafo' }]} value="grafo" />
    </div>
  );
}
```
