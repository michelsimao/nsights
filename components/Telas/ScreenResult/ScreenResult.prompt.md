ScreenResult from @nsights/risk-ops-ui. Use via `window.RiskOpsUI.ScreenResult` (bundle loaded from the root `_ds_bundle.js`).

A tela de resultado de uma análise de KYC, como o app a monta: o chrome da
plataforma (AppShell + Sidebar + Topbar), o cabeçalho de identidade da
entidade com o veredito carimbado, a faixa `RiskVerdict` com os números que
sustentam a conclusão (`Facts`), a barra de abas do dossiê com o recorte de
entidade à direita e, como painel ativo, o checklist de verificações —
`ResultRows` com `StatusBadge` por estado e a régua `RiskScale` de leitura.

Demonstra as regras do produto: estado nunca só por cor (rótulo textual em
toda pílula), lacuna de cobertura diz o motivo, e a fonte aparece pela
capacidade — nunca pelo nome do fornecedor.

## Examples

### Tela

```jsx
() => (
  <div>
    <style>{'.skip-link{display:none}'}</style>
    <ScreenResult />
  </div>
)
```
