BarList from @nsights/risk-ops-ui. Use via `window.RiskOpsUI.BarList` (bundle loaded from the root `_ds_bundle.js`).

Barras horizontais com rótulo e total — o ranking compacto de "quanto por
onde" (estabelecimentos por UF é o caso do app).

Cada barra é medida contra o MAIOR total da lista, então os comprimentos
comparam entre linhas. Segmento `inactive` cai no cinza-arroxeado do CSS: a
distinção do produto é "ainda opera × já encerrou", e cinza diz encerrado sem
gritar risco. O total escrito à direita carrega o valor exato; a barra só
carrega a proporção.

## Props

```ts
interface BarListProps {
  /** Itens da legenda ao pé da lista, quando há mais de um tom em jogo. */
  legend?: { label: string; color?: string; inactive?: boolean; }[];
  rows: BarListRow[];
  /** Título em caixa alta no topo do quadro. */
  title: string;
}
```

## Examples

### PorUf

```jsx
() => {
  return (
    <div style={{ width: '26rem' }}>
      <BarList
        legend={[{ label: 'Matriz' }, { label: 'Filiais', color: 'var(--coral)' }]}
        rows={[
          { label: 'SP', segments: [{ value: 12 }, { value: 9, color: 'var(--coral)' }] },
          { label: 'MG', segments: [{ value: 6 }, { value: 4, color: 'var(--coral)' }] },
          { label: 'PR', segments: [{ value: 3 }, { value: 2, color: 'var(--coral)' }] },
          { label: 'BA', segments: [{ value: 2 }, { value: 1, color: 'var(--coral)' }] },
        ]}
        title="Estabelecimentos por UF"
      />
    </div>
  );
}
```
