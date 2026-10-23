TabsBar from @nsights/risk-ops-ui. Use via `window.RiskOpsUI.TabsBar` (bundle loaded from the root `_ds_bundle.js`).

A barra que segura as abas de painel: à esquerda as `Tabs`, à direita um
controle de recorte (um select de entidade, por exemplo). É ela que faz a
faixa rolar na horizontal em telas estreitas em vez de quebrar linha.

## Props

```ts
interface TabsBarProps {
  children: React.ReactNode;
}
```

## Examples

### Barra

```jsx
() => {
  return (
    <div style={{ width: '34rem' }}>
      <TabsBar>
        <Tabs
          ariaLabel="Seções do resultado"
          items={[
            { id: 'checklist', label: 'Checklist' },
            { id: 'classificacao', label: 'Classificação' },
            { id: 'perfil', label: 'Perfil' },
            { id: 'compliance', label: 'Compliance' },
            { id: 'judicial', label: 'Judicial' },
            { id: 'midia', label: 'Mídia' },
          ]}
          value="checklist"
        />
        <select defaultValue="todas"><option value="todas">Todas as entidades</option></select>
      </TabsBar>
    </div>
  );
}
```
