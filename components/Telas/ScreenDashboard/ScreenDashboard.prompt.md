ScreenDashboard from @nsights/risk-ops-ui. Use via `window.RiskOpsUI.ScreenDashboard` (bundle loaded from the root `_ds_bundle.js`).

A tela "Visão geral" — o painel gerencial de risk advisory que abre o app.

Demonstra o chrome completo (Sidebar recolhida + Topbar) em volta de uma
`OperationalPage` com: recorte por entidade e período (`Segmented`), a linha
de quatro KPIs executivos (`MetricGrid` + `KpiCard`), a dupla de gráficos —
volume mensal de análises (`LineChart`) e distribuição por UF (`BarList`) —
e o painel "Análises recentes" com veredito, cobertura e estado por linha.

## Examples

### Tela

```jsx
() => (
  <div>
    <style>{'.skip-link{display:none}'}</style>
    <ScreenDashboard />
  </div>
)
```
