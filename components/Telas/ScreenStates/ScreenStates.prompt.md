ScreenStates from @nsights/risk-ops-ui. Use via `window.RiskOpsUI.ScreenStates` (bundle loaded from the root `_ds_bundle.js`).

Estados da plataforma — as quatro telas de exceção que o app tem, lado a lado.

1. **Acesso negado** (`/access-denied`): usuário autenticado sem permissão na
   área — cartão `.auth-card` com eyebrow, título e o `.button-link` de volta
   à visão geral, exatamente com o microcopy do app.
2. **Módulo futuro** (`/risk-analysis`): a página real de Análise de risco —
   PageHeader "Risk advisory" + DataPanel "Em preparação" com o
   `.future-module-state` ("Estrutura em desenvolvimento").
3. **Vazio de manutenção** (referência: `global-error.tsx`): o `.empty-panel`
   centralizado com kicker na cor de acento, título e link de recarga.
4. **Vazio operacional** durante a janela: DataPanel com `EmptyState`
   (`.platform-empty-state`) — vazio não é erro, o texto diz o porquê.

## Examples

### Tela

```jsx
() => (
  <div>
    <style>{'.skip-link{display:none}'}</style>
    <ScreenStates />
  </div>
)
```
