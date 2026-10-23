ScreenNewAnalysis from @nsights/risk-ops-ui. Use via `window.RiskOpsUI.ScreenNewAnalysis` (bundle loaded from the root `_ds_bundle.js`).

A tela "Nova análise" — o assistente de KYC parado na Etapa 3 (Coberturas).

Demonstra o assistente inteiro dentro do chrome do app: `WizardHeader` +
`WizardProgress` com as etapas 1 e 2 já percorridas, uma `WizardSection` com
a abrangência escolhida (três `SelectableCard` com as barrinhas de
intensidade) e a grade de coberturas white-label (`SourceCardGrid` — nomes de
capacidade, nunca de fornecedor; as obrigatórias não se desmarcam) e o
`WizardFooter` escuro com o custo máximo recalculado a cada escolha.

## Examples

### Tela

```jsx
() => (
  <div>
    <style>{'.skip-link{display:none}'}</style>
    <ScreenNewAnalysis />
  </div>
)
```
