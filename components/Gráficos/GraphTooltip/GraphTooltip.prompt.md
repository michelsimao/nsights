GraphTooltip from @nsights/risk-ops-ui. Use via `window.RiskOpsUI.GraphTooltip` (bundle loaded from the root `_ds_bundle.js`).

O cartão informativo do grafo de vínculos: nome da entidade, a banda de
classificação com ponto de cor (sócios, coligadas, alvo) e a lista de
vínculos. Espelha o `aside.graph-tooltip` do grafo de relacionamentos.

Ele é `position: absolute` — o caller o posiciona dentro do seu contêiner
relativo via `style` (como o app faz ao segui-lo até o nó selecionado).
`pointer-events: none` vem do CSS: o cartão informa, não captura o mouse.

## Props

```ts
interface GraphTooltipProps {
  /** Rótulo da banda em caixa alta — "Sócios", "Coligadas", "Alvo da análise". */
  band?: string;
  /** Cor do ponto da banda. Padrão: o acento. */
  bandColor?: string;
  /** Os vínculos: um `ul` de relações ou um `p` quando não há vínculo desenhado. */
  children?: React.ReactNode;
  /** Posicionamento dentro do contêiner relativo do caller. */
  style?: CSSProperties;
  title: string;
}
```

## Examples

### NoGrafo

```jsx
() => {
  return (
    <div style={{ background: 'var(--surface)', height: '11rem', position: 'relative', width: '26rem' }}>
      <GraphTooltip band="Sócios" style={{ left: '2rem', top: '1.5rem' }} title="Helena Barros Vasconcelos">
        <ul>
          <li>Administradora · 42% da ACME Participações</li>
          <li>Sócia · 18% da Meridiano Holding</li>
        </ul>
      </GraphTooltip>
    </div>
  );
}
```
