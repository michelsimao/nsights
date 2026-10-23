Switch from @nsights/risk-ops-ui. Use via `window.RiskOpsUI.Switch` (bundle loaded from the root `_ds_bundle.js`).

Liga/desliga de efeito imediato — monitoramento contínuo, alertas, opções de
conta. Se a mudança só vale depois de um "Salvar", é `Checkbox`: um switch
que não age na hora mente para o usuário.

O app não tem switch; este é desenho novo (`ns-switch`) com o vocabulário da
casa: trilho `--border-strong` quando desligado, `--accent` quando ligado,
polegar branco, foco em anel de 2px. O input real é `type="checkbox"` com
`role="switch"`, então o estado anuncia como ligado/desligado. `stateText`
põe o estado em palavras ao lado do rótulo — a posição do polegar é sinal
só de cor e posição, e "Ativo"/"Inativo" não deixa dúvida.

## Props

```ts
interface SwitchProps {
  checked?: boolean;
  disabled?: boolean;
  id?: string;
  label: React.ReactNode;
  onChange?: (checked: boolean) => void;
  /** O estado em palavras, ex.: "Ativo" / "Inativo". */
  stateText?: React.ReactNode;
}
```

## Examples

### Monitoramento

```jsx
() => {
  return (
    <div style={{ display: 'grid', width: '24rem' }}>
      <Switch checked label="Monitoramento contínuo" stateText="Ativo — reconsulta diária das listas restritivas" />
      <Switch label="Alertas por e-mail" stateText="Inativo" />
      <Switch checked disabled label="Retenção de evidências" stateText="Obrigatório pela política da organização" />
    </div>
  );
}
```
