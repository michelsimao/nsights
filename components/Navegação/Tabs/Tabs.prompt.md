Tabs from @nsights/risk-ops-ui. Use via `window.RiskOpsUI.Tabs` (bundle loaded from the root `_ds_bundle.js`).

As abas. Duas variantes, e a escolha é de nível, não de gosto:
`page` navega entre telas da plataforma (filete de 2px sob a aba ativa,
`aria-current`, sem ícone); `panel` navega entre as abas de um resultado
(borda de 3px na cor de acento, tablist completo, aceita ícone).

A variante `panel` espelha a barra do app: `role="tablist"`, ids
`result-tab-<id>` ligados por `aria-controls` a `result-panel-<id>`, foco
itinerante e setas/Home/End no teclado. Dê ao painel correspondente
`id="result-panel-<id>"` e `role="tabpanel"`. Para a faixa rolar na
horizontal em vez de quebrar linha, ela vai dentro de `TabsBar`.

## Props

```ts
interface TabsProps {
ariaLabel: string;
  items: { icon?: React.ReactNode; id: string; label: React.ReactNode }[];
  onSelect?: (id: string) => void;
  /** Id da aba ativa. */
  value: string;
  variant?: "panel" | "page";
}
```

## Examples

### DePainel

```jsx
() => {
  return (
    <div style={{ width: '36rem' }}>
      <TabsBar>
        <Tabs
          ariaLabel="Seções do resultado"
          items={[
            { id: 'resumo', label: 'Resumo', icon: <Icon d="M3 4h10M3 8h10M3 12h6" /> },
            { id: 'societario', label: 'Societário', icon: <Icon d="M8 2v5M4 14V9h8v5" /> },
            { id: 'judicial', label: 'Judicial', icon: <Icon d="M8 2v12M4 5h8" /> },
            { id: 'midia', label: 'Mídia', icon: <Icon d="M2 8a6 6 0 1 0 12 0A6 6 0 0 0 2 8Z" /> },
          ]}
          value="judicial"
        />
        <select defaultValue="todas" style={{ flex: '0 0 auto' }}>
          <option value="todas">Todas as entidades</option>
          <option value="acme">ACME Participações</option>
        </select>
      </TabsBar>
    </div>
  );
}

/** Abas de página — a variante `page` de verdade: filete de 2px, aria-current. */
```

### DePagina

```jsx
() => {
  return (
    <div style={{ width: '36rem' }}>
      <Tabs
        ariaLabel="Seções"
        items={[{ id: 'analises', label: 'Análises' }, { id: 'lotes', label: 'Lotes' }, { id: 'creditos', label: 'Créditos' }]}
        value="analises"
        variant="page"
      />
    </div>
  );
}
```

## Related

`TabsBar`
