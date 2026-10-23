RangeSlider from @nsights/risk-ops-ui. Use via `window.RiskOpsUI.RangeSlider` (bundle loaded from the root `_ds_bundle.js`).

Faixa de mercado do pricing: mínimo e máximo nas pontas, cada comparável é
um ponto sobre o trilho e o traço roxo forte marca o ponto recomendado.

É LEITURA, não controle — no produto ninguém arrasta o valor; a faixa
resume comparáveis vindos das fontes, e o detalhe numérico mora na tabela
ao lado. Por isso o bloco inteiro é `role="img"` com um rótulo que fala
mínimo, máximo e contagem, e o trilho é `aria-hidden`: os pontos individuais
só existem visualmente (com `title` para o hover).

Com um único valor (`span` zero) tudo se acomoda no centro, como no app.

## Props

```ts
interface RangeSliderProps {
  /** Formatador pt-BR dos valores impressos. Padrão: duas casas decimais. */
  format?: (value: number) => string;
  /** Nome da grandeza ("Faixa de spread sobre CDI") para o rótulo acessível. */
  label: string;
  maximum: number;
  minimum: number;
  points: RangePoint[];
  /** Valor recomendado — desenha o marcador e a legenda "Ponto recomendado". */
  recommendation?: number;
  /** Unidade ou benchmark ("% a.a.", "CDI +") impressa junto à recomendação. */
  unit?: string;
}
```

## Examples

### FaixaComRecomendacao

```jsx
() => {
  return (
    <div style={{ width: 440 }}>
      <RangeSlider
        label="Faixa de spread sobre CDI"
        maximum={4.8}
        minimum={1.9}
        points={[
          { id: 'debenture-agrovale-2029', label: 'Debênture AgroVale 2029', value: 2.4 },
          { id: 'cri-hortifruti-12', label: 'CRI Hortifrúti Série 12', value: 3.1 },
          { id: 'cra-sertaneja-2027', label: 'CRA Sertaneja 2027', value: 4.2 },
        ]}
        recommendation={2.9}
        unit="% a.a."
      />
    </div>
  );
}

/** Sem recomendação, a faixa só situa os comparáveis coletados. */
```

### FaixaSimples

```jsx
() => {
  return (
    <div style={{ width: 440 }}>
      <RangeSlider
        label="Taxa efetiva das operações comparáveis"
        maximum={19.4}
        minimum={12.75}
        points={[
          { id: 'ccb-cooperativa-sul', label: 'CCB Cooperativa Sul', value: 13.2 },
          { id: 'ccb-frigorifico-oeste', label: 'CCB Frigorífico Oeste', value: 15.9 },
          { id: 'ccb-usina-nordeste', label: 'CCB Usina Nordeste', value: 18.6 },
        ]}
      />
    </div>
  );
}
```
