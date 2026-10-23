AiCite from @nsights/risk-ops-ui. Use via `window.RiskOpsUI.AiCite` (bundle loaded from the root `_ds_bundle.js`).

As fontes que sustentam uma resposta da IA, na grade de cartões que o app
usa para fontes de mídia.

Regra de produto: o estado é obrigatório e uma fonte que falhou (ou ficou
fora do escopo) PERMANECE na lista — a lacuna diz o motivo. O estado é dito
por palavra E por glifo, nunca só por cor, para sobreviver a daltonismo e
a impressão em cinza. Só fonte `ok` com `href` vira link.

## Props

```ts
interface AiCiteProps {
  label?: string;
  sources: AiCiteSource[];
}
```

## Examples

### FontesDaResposta

```jsx
() => {
  return (
    <div style={{ width: '30rem' }}>
      <AiCite
        sources={[
          { href: 'https://esaj.tjsp.jus.br', meta: 'TJSP · consulta em 26/08/2026', title: 'Diário de Justiça Eletrônico' },
          { href: 'https://www.gov.br/receitafederal', meta: 'Receita Federal', title: 'Cadastro Nacional da Pessoa Jurídica' },
          { meta: 'TST', state: 'failed', title: 'Certidão Negativa de Débitos Trabalhistas' },
          { meta: 'Imprensa internacional', state: 'skipped', stateNote: 'Fora do plano contratado', title: 'Mídia adversa internacional' },
        ]}
      />
    </div>
  );
}

/** Marcas [n] no texto corrido; a marca ativa é a que o leitor acabou de seguir. */
```

### CitacoesNoTexto

```jsx
() => {
  return (
    <div style={{ fontSize: '.78rem', lineHeight: 1.6, width: '26rem' }}>
      <p style={{ margin: 0 }}>
        A Agropecuária Boa Vista Ltda figura como ré em duas execuções fiscais ativas
        <AiCiteMarks
          active={2}
          marks={[
            { href: 'https://esaj.tjsp.jus.br', n: 1, publisher: 'TJSP' },
            { n: 2, publisher: 'Diário Oficial da União' },
          ]}
        />
        , ambas distribuídas na comarca de Ribeirão Preto.
      </p>
    </div>
  );
}
```

## Related

`AiCiteMarks`
