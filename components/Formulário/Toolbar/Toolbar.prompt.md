Toolbar from @nsights/risk-ops-ui. Use via `window.RiskOpsUI.Toolbar` (bundle loaded from the root `_ds_bundle.js`).

A barra branca de controles sob o cabeçalho da página: busca, selects,
segmentados.

Um grupo só. Se os controles não cabem numa linha em telas estreitas eles
quebram — não crie uma segunda barra.

## Props

```ts
interface ToolbarProps {
  ariaLabel: string;
  children: React.ReactNode;
}
```

## Examples

### Controles

```jsx
() => {
  return (
    <div style={{ width: '34rem' }}>
      <Toolbar ariaLabel="Controles da lista">
        <WorkspaceSearch ariaLabel="Buscar por nome, CPF ou CNPJ" placeholder="Nome, CPF ou CNPJ" />
        <WorkspaceFilter label="Tipo">
          <select defaultValue=""><option value="">PF + PJ</option><option value="PF">PF</option><option value="PJ">PJ</option></select>
        </WorkspaceFilter>
        <WorkspaceFilter label="Estado">
          <select defaultValue=""><option value="">Todos</option><option value="done">Concluída</option><option value="failed">Não concluída</option></select>
        </WorkspaceFilter>
        <Button variant="secondary">Exportar</Button>
      </Toolbar>
    </div>
  );
}
```
