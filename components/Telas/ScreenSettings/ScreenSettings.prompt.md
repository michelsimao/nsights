ScreenSettings from @nsights/risk-ops-ui. Use via `window.RiskOpsUI.ScreenSettings` (bundle loaded from the root `_ds_bundle.js`).

A administração do workspace, como o app a monta: `PageHeader` no topo, a
navegação de configurações à esquerda (as classes `settings-navigation-*`
do produto) e, à direita na coluna `settings-main`, os painéis do workspace —
dados da organização em `settings-info-grid`, membros em `settings-table` —
e a tabela de modelos de risco com a situação de cada régua em `StatusPill`.

Demonstra a regra central dos modelos: publicar não reescreve laudo emitido —
cada dossiê congela a versão sob a qual foi classificado.

## Examples

### Tela

```jsx
() => (
  <div>
    <style>{'.skip-link{display:none}'}</style>
    <ScreenSettings />
  </div>
)
```
