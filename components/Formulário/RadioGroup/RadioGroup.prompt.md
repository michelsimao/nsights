RadioGroup from @nsights/risk-ops-ui. Use via `window.RiskOpsUI.RadioGroup` (bundle loaded from the root `_ds_bundle.js`).

Agrupador semântico dos rádios — `fieldset`/`legend`, não um div com título:
é o que faz o leitor de tela anunciar o conjunto como um grupo.

A legenda usa `.sel-gr`, o mesmo cabeçalho de grupo do seletor de consultas
do app (miúdo, uppercase, cinza). O `fieldset` recebe reset (`ns-radiogroup`)
porque o app nunca usa fieldset cru — o único estilizado é o `.segmented`.

## Props

```ts
interface RadioGroupProps {
  /** As opções `Radio`, já com o `name` comum. */
  children: React.ReactNode;
  legend: React.ReactNode;
}
```

## Examples

### ModoDaAnalise

```jsx
() => {
  return (
    <div style={{ width: '28rem' }}>
      <RadioGroup legend="Modo da análise">
        <Radio checked description="Uma entidade, resultado completo com checklist e evidências." label="Análise individual" name="modo" value="individual" />
        <Radio description="Várias entidades de uma vez; cada uma vira uma análise independente." label="Lote" name="modo" value="lote" />
        <Radio description="Só a prévia de custo, sem disparar consultas." label="Simulação" name="modo" value="simulacao" />
      </RadioGroup>
    </div>
  );
}
```
