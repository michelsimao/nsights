Tooltip from @nsights/risk-ops-ui. Use via `window.RiskOpsUI.Tooltip` (bundle loaded from the root `_ds_bundle.js`).

Dica curta em hover E foco — o `title` nativo não aparece no teclado, e um
analista tabulando pela tabela de processos precisa da mesma explicação que
o mouse ganha. A bolha é a `.distribution-tip` do app (a dica dos cartões
de distribuição judicial); o invólucro `ns-tooltip` só generaliza o gatilho
de exibição (`:hover`/`:focus-within`) que lá era do `li` da lista.

Nada essencial nem interativo aqui dentro: a dica some no blur e não existe
no toque. Se o conteúdo pede clique ou rolagem, é `Popover`.

O filho recebe `aria-describedby` apontando para a bolha; passe um elemento
focável (botão, link) ou dê `tabIndex={0}` a ele, senão o teclado nunca vê
a dica. `open` força a bolha aberta — só para specimen/preview.

## Props

```ts
interface TooltipProps {
  /** `end` alinha a bolha à direita da âncora. */
  align?: "start" | "end";
  /** A âncora. Precisa aceitar `aria-describedby` (qualquer elemento DOM aceita). */
  children: ReactElement<{ 'aria-describedby'?: string; }, string | JSXElementConstructor<any>>;
  label: React.ReactNode;
  /** Força a bolha visível — para specimens e capturas, nunca em produto. */
  open?: boolean;
}
```

## Examples

### ValorEmCausa

```jsx
() => {
  return (
    <div style={{ minHeight: '9rem', paddingTop: '.5rem', width: '24rem' }}>
      <Tooltip
        label={<><strong>Valor em causa — polo passivo</strong><span>14 processos com valor informado na capa; 3 sem valor declarado ficam fora da soma.</span></>}
        open
      >
        <span style={{ borderBottom: '1px dotted var(--muted)', cursor: 'help', fontWeight: 650 }} tabIndex={0}>R$ 1.240.500,00</span>
      </Tooltip>
    </div>
  );
}

/** O cartão do grafo de vínculos, posicionado pelo caller. */
```

### VinculoNoGrafo

```jsx
() => {
  return (
    <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: '.55rem', height: '13rem', position: 'relative', width: '26rem' }}>
      <GraphTooltip band="Quadro societário" style={{ left: '1rem', top: '1rem' }} title="AGRO FORTE PARTICIPAÇÕES LTDA">
        <ul>
          <li>Sócia-administradora de <strong>AF AGRÍCOLA S.A.</strong></li>
          <li><strong>MARIA HELENA PRADO</strong> é sócia desta</li>
          <li>Controladora de <strong>AF LOGÍSTICA LTDA</strong></li>
        </ul>
      </GraphTooltip>
    </div>
  );
}

/** Sem vínculo desenhado: o cartão vira registro do porquê. */
```

### NoSemVinculo

```jsx
() => {
  return (
    <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: '.55rem', height: '9rem', position: 'relative', width: '22rem' }}>
      <GraphTooltip band="Coligadas" bandColor="var(--warning)" style={{ left: '1rem', top: '1rem' }} title="PRADO EMPREENDIMENTOS EIRELI">
        <p>Sem vínculo desenhado.</p>
      </GraphTooltip>
    </div>
  );
}
```
