Meter from @nsights/risk-ops-ui. Use via `window.RiskOpsUI.Meter` (bundle loaded from the root `_ds_bundle.js`).

O progresso de uma análise: legenda, trilho e porcentagem.

Duas regras vêm do produto, não do desenho, e o componente as aplica sozinho:
a porcentagem é `floor` e trava em 99% — 809 de 812 é 99%, e arredondar para
100% ao lado de "Coletando fontes" é a lista se contradizendo; 100% pertence a
uma análise terminada e a mais nada. O pulso na ponta do preenchimento respira
sozinho, porque a contagem pode ficar parada um intervalo inteiro de polling e
é ele que diz que a linha está viva.

## Props

```ts
interface MeterProps {
  /** Consultas concluídas. */
  done: number;
  /** Rótulo acessível do progresso ("Progresso da análise de ACME"). */
  label: string;
  /** O estágio atual, à esquerda da legenda. */
  stage: string;
  /** Consultas planejadas. Zero significa "ainda montando o plano". */
  total: number;
  unit?: string;
}
```

## Examples

### EmAndamento

```jsx
() => {
  return (
    <div style={{ width: '22rem' }}>
      <Meter done={809} label="Progresso da análise de ACME Participações" stage="Coletando fontes" total={812} />
    </div>
  );
}

/** Antes do plano existir não há o que medir. */
```

### SemPlano

```jsx
() => {
  return (
    <div style={{ width: '22rem' }}>
      <Meter done={0} label="Progresso da análise" stage="Preparando" total={0} />
    </div>
  );
}
```
