AiStream from @nsights/risk-ops-ui. Use via `window.RiskOpsUI.AiStream` (bundle loaded from the root `_ds_bundle.js`).

A resposta do agente chegando — e os três estados que a espera atravessa.

Enquanto nada chegou, os três pontos (`.ai-loader`) dizem que o agente está
trabalhando; quando o texto começa, ele entra no corpo `.ai-response` (a
tipografia de resposta do app: parágrafos, listas, código, tabela); quando
falha, a faixa `.ai-error` oferece tentar de novo.

Acessibilidade decidida, não herdada: o corpo é `aria-live="polite"` com
`aria-atomic="false"` — `assertive` soletraria cada token por cima de quem
está digitando, e `atomic` relearia a resposta inteira a cada pedaço.
`aria-busy` fica ligado enquanto a resposta corre e sai quando `done`.
A região live existe desde o primeiro render (mesmo vazia): região criada
já com conteúdo não é anunciada. O anúncio pertence a ESTE componente; o
contêiner (AiThread) é `role="log"` sem live de propósito.

## Props

```ts
interface AiStreamProps {
  /** O que já chegou, já renderizado (parágrafos, listas). Vazio mostra os três pontos. */
  children?: React.ReactNode;
  /** Terminou: o `aria-busy` sai e o loader some. */
  done?: boolean;
  /** Falha da rodada, em uma frase. Renderiza a faixa de erro com o botão de repetir. */
  error?: string;
  /** Sem ele a faixa de erro aparece sem botão. */
  onRetry?: () => void;
  /** O que o loader diz ao leitor de tela enquanto nada chegou. */
  pending?: string;
  retryLabel?: string;
}
```

## Examples

### Aguardando

```jsx
() => {
  return (
    <div style={{ width: '34rem' }}>
      <AiStream pending="Consultando as fontes do escopo…" />
    </div>
  );
};

/** Texto parcial em voo: a região live segue anunciando enquanto chega. */
```

### Transmitindo

```jsx
() => {
  return (
    <div style={{ width: '34rem' }}>
      <AiStream>
        <p>Encontrei <strong>3 sócios em comum</strong> entre a Vale Verde Agroindústria e a Cooperativa Rio Doce: dois pessoas físicas e uma holding (Participações Cerrado Ltda., CNPJ 98.765.432/0001-10). A holding concentra 34% do capital das duas — estou verificando se ela aparece em</p>
      </AiStream>
    </div>
  );
};

/** A rodada falhou: a faixa de erro explica e oferece repetir. */
```

### Falha

```jsx
() => {
  return (
    <div style={{ width: '34rem' }}>
      <AiStream
        done
        error="O agente não conseguiu responder agora."
        onRetry={() => undefined}
      >
        <p>Iniciando a consulta de processos judiciais do CNPJ 12.345.678/0001-90…</p>
      </AiStream>
    </div>
  );
}
```
