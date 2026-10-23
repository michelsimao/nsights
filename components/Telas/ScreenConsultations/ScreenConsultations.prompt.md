ScreenConsultations from @nsights/risk-ops-ui. Use via `window.RiskOpsUI.ScreenConsultations` (bundle loaded from the root `_ds_bundle.js`).

A tela do Agente de Consultas — a vitrine do subsistema Ai inteiro, no
layout de duas colunas do app: o rail de consultas anteriores à esquerda
(busca, filtros e a lista com entidade, modo, créditos e situação) e o chat
ao centro — `AiIdentity` no topo, `AiThread` com a pergunta, a resposta
completa (citações `AiCiteMarks` no texto, trilha `AiTrace` das consultas,
fontes `AiCite` com a lacuna declarada, `AiConfidence` e `AiVote`) e a
pergunta seguinte; embaixo, o composer `AiAsk` docked com sugestões prontas.

Regras que a tela carrega: a fonte que falhou permanece na lista com o
motivo, nada é cobrado sem aprovação e o fornecedor nunca aparece pelo nome.

## Examples

### Tela

```jsx
() => (
  <div>
    <style>{'.skip-link{display:none}'}</style>
    <ScreenConsultations />
  </div>
)
```
