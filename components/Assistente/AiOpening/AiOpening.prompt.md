AiOpening from @nsights/risk-ops-ui. Use via `window.RiskOpsUI.AiOpening` (bundle loaded from the root `_ds_bundle.js`).

A abertura de uma conversa nova: saudação grande, linha de apoio, o composer
no meio e os atalhos "Comece por".

Conversa vazia é o pior lugar para uma tela vazia — a pessoa acabou de
decidir consultar algo e ainda não sabe o que o agente alcança. Os starters
dizem isso com exemplos reais e, ao clique, apenas preenchem o campo
(`onPick`): enviar continua sendo decisão explícita, porque cada envio pode
virar escopo cobrado. Pelo mesmo motivo existe a linha `trust`, com o
escudo — "nada é cobrado até você aprovar" é regra de produto, não enfeite.

`children` é o lugar do `AiAsk` (entre a linha de apoio e o selo de
confiança, como no app); qualquer conteúdo extra — um catálogo de consultas,
por exemplo — entra em `footer`, depois dos starters.

## Props

```ts
interface AiOpeningProps {
  /** Saudação em uma frase curta ("Diga o que consultar."). */
  greeting: React.ReactNode;
  /** Linha de apoio: o que o agente faz e o que acontece antes da cobrança. */
  lede?: React.ReactNode;
  /** O composer (`AiAsk`) e o que mais vier logo abaixo da linha de apoio. */
  children?: React.ReactNode;
  /** Selo de confiança com escudo, logo abaixo do composer. */
  trust?: React.ReactNode;
  /** Rótulo em caixa alta acima dos atalhos. */
  startersLabel?: string;
  starters?: AiStarter[];
  /** Starter clicado — preencha o campo do composer; nada é enviado. */
  onPick?: (prompt: string) => void;
  /** Conteúdo depois dos starters (catálogo de consultas, avisos do plano). */
  footer?: React.ReactNode;
}
```

## Examples

### ConversaNova

```jsx
() => {
  return (
    <div style={{ width: '46rem', display: 'flex', flexDirection: 'column' }}>
      <AiOpening
        greeting="Diga o que consultar."
        lede="Descreva em linguagem natural, cole uma lista ou anexe um arquivo. Eu reconheço as entidades — uma ou várias —, escolho as consultas e calculo o custo. Nada é cobrado até você aprovar."
        onPick={() => {}}
        starters={[
          { label: 'Cadastro e processos deste CNPJ', hint: 'Individual · situação + judicial' },
          { label: 'Listas restritivas deste CPF', hint: 'Individual · restrições' },
          { label: 'Analise este lote de fornecedores', hint: 'Lote · cadastro, processos e restrições' },
        ]}
        trust="Nada é cobrado até você aprovar o escopo."
      >
        <AiAsk onAttach={() => {}} onChange={() => {}} onOpenSources={() => {}} onSubmit={() => {}} value="" />
      </AiOpening>
    </div>
  );
}

/** Sem starters: só a saudação e o campo, para um agente de escopo único. */
```

### SoComposer

```jsx
() => {
  return (
    <div style={{ width: '40rem', display: 'flex', flexDirection: 'column' }}>
      <AiOpening
        greeting="Qual entidade vamos revisar?"
        lede="Informe o CNPJ ou a razão social. A revisão usa as fontes já contratadas do plano."
      >
        <AiAsk onChange={() => {}} onSubmit={() => {}} placeholder="CNPJ ou razão social…" value="" />
      </AiOpening>
    </div>
  );
}
```
