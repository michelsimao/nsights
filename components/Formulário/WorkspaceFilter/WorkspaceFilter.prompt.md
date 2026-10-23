WorkspaceFilter from @nsights/risk-ops-ui. Use via `window.RiskOpsUI.WorkspaceFilter` (bundle loaded from the root `_ds_bundle.js`).

Um filtro da barra de trabalho: rótulo em caixa alta e o `select` como filho.
O select herda o desenho único do sistema (chevron roxo, foco com anel).

## Props

```ts
interface WorkspaceFilterProps {
  /** O `select` (ou outro controle compacto). */
  children: React.ReactNode;
  label: string;
}
```

## Examples

### Filtros

```jsx
() => {
  return (
    <div style={{ width: '30rem' }}>
      <Toolbar ariaLabel="Filtros">
        <WorkspaceSearch ariaLabel="Buscar" placeholder="Nome, CPF ou CNPJ" />
        <WorkspaceFilter label="Tipo">
          <select defaultValue=""><option value="">PF + PJ</option><option value="PF">PF</option><option value="PJ">PJ</option></select>
        </WorkspaceFilter>
        <WorkspaceFilter label="Período">
          <select defaultValue="90"><option value="30">30 dias</option><option value="90">90 dias</option></select>
        </WorkspaceFilter>
      </Toolbar>
    </div>
  );
}
```
