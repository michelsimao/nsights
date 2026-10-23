ScreenAnalyses from @nsights/risk-ops-ui. Use via `window.RiskOpsUI.ScreenAnalyses` (bundle loaded from the root `_ds_bundle.js`).

A tela "Histórico de análises" — a lista de trabalho das diligências.

Demonstra a barra de trabalho (`Toolbar` com `WorkspaceSearch` e dois
`WorkspaceFilter`, todos vivos: busca e filtros recortam as linhas) sobre um
`DataPanel` com a tabela do histórico: linhas em voo mostram o `Meter` com a
etapa e o progresso truncado em 99% — sem link "Abrir", que só existe em
estado terminal —, linhas terminais mostram `StatusPill`. `Pagination`
fecha o painel.

## Examples

### Tela

```jsx
() => (
  <div>
    <style>{'.skip-link{display:none}'}</style>
    <ScreenAnalyses />
  </div>
)
```
