LineChart from @nsights/risk-ops-ui. Use via `window.RiskOpsUI.LineChart` (bundle loaded from the root `_ds_bundle.js`).

A linha de evolução do perfil: grade horizontal discreta com três réguas
(mínimo, meio, máximo), pontos em cada valor e o ÚLTIMO ponto maior — é ele
que responde "onde estamos hoje", a pergunta que trouxe o leitor ao gráfico.

O domínio vertical ganha 25% de folga acima e abaixo, como no app: a linha
nunca encosta na moldura e uma variação pequena não vira montanha. A área sob
a linha (`area`, padrão com uma série só) é a cor da série com alfa de 8% —
peso visual, não segunda informação; com várias séries ela viraria lama e o
padrão a desliga.

## Props

```ts
interface LineChartProps {
  /** Preenche a área sob a linha. Padrão: apenas quando há uma série. */
  area?: boolean;
  /** Formata os valores da régua Y. Padrão: inteiro em pt-BR. */
  formatValue?: (value: number) => string;
  /** Descrição acessível do gráfico inteiro. */
  label: string;
  /** Rótulos do eixo X, um por ponto. */
  labels: string[];
  /** Mostra a legenda de séries acima do desenho. Padrão: quando há mais de uma. */
  legend?: boolean;
  series: LineSeries[];
  /** Versão mais alta para gráficos de linha inteira (classe `profile-chart-wide`). */
  wide?: boolean;
}
```

## Examples

### HeadcountMensal

```jsx
() => {
  return (
    <div style={{ width: '30rem' }}>
      <LineChart
        label="Headcount mensal, de 182 funcionários em setembro a 228 em agosto"
        labels={['set', 'out', 'nov', 'dez', 'jan', 'fev', 'mar', 'abr', 'mai', 'jun', 'jul', 'ago']}
        series={[{ label: 'Funcionários', values: [182, 185, 181, 178, 190, 196, 204, 201, 210, 214, 221, 228] }]}
      />
    </div>
  );
}

/** Duas séries na paleta da casa, com a legenda que o padrão liga sozinho. */
```

### AdmissoesEDesligamentos

```jsx
() => {
  return (
    <div style={{ width: '30rem' }}>
      <LineChart
        label="Admissões e desligamentos por mês, de março a agosto"
        labels={['mar', 'abr', 'mai', 'jun', 'jul', 'ago']}
        series={[
          { label: 'Admissões', values: [12, 9, 14, 11, 16, 13] },
          { label: 'Desligamentos', values: [7, 8, 6, 10, 9, 5] },
        ]}
      />
    </div>
  );
}
```
