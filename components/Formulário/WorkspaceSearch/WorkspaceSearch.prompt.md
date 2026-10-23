WorkspaceSearch from @nsights/risk-ops-ui. Use via `window.RiskOpsUI.WorkspaceSearch` (bundle loaded from the root `_ds_bundle.js`).

O campo de busca da barra de trabalho: rótulo em caixa alta e input de busca
sem moldura própria — a moldura é da `Toolbar` em volta.

É o par app-real de `Toolbar`: no produto, a barra é sempre
busca à esquerda (com o fio de borda à direita) + filtros.

## Props

```ts
interface WorkspaceSearchProps {
  ariaLabel: string;
  label?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  value?: string;
}
```

## Examples

### NaBarra

```jsx
() => {
  return (
    <div style={{ width: '26rem' }}>
      <Toolbar ariaLabel="Busca">
        <WorkspaceSearch ariaLabel="Buscar por nome, CPF ou CNPJ" placeholder="Nome, CPF ou CNPJ" />
      </Toolbar>
    </div>
  );
}
```
