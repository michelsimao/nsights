Pagination from @nsights/risk-ops-ui. Use via `window.RiskOpsUI.Pagination` (bundle loaded from the root `_ds_bundle.js`).

Paginação numerada de listas longas (vínculos, estabelecimentos). Página é
1-based; a janela mostra até cinco números ao redor da atual, com atalhos
para a primeira e a última quando a lista passa disso — o app renderiza
todos os números, mas acima de ~10 páginas isso estoura a linha.

`info` é o "Mostrando 1–20 de 184", formatado pelo chamador (números em
`Mono` para alinharem na vertical). A página ativa carrega
`aria-current="page"`; as setas têm rótulo textual.

## Props

```ts
interface PaginationProps {
  ariaLabel?: string;
  /** Resumo à esquerda ("Mostrando 1–20 de 184"), formatado pelo chamador. */
  info?: React.ReactNode;
  onChange?: (page: number) => void;
  /** 1-based. */
  page: number;
  pages: number;
}
```

## Examples

### Numerada

```jsx
() => {
  return (
    <div style={{ width: 520 }}>
      <Pagination ariaLabel="Paginação dos vínculos" info={<>Mostrando <Mono>121–140</Mono> de <Mono>486</Mono></>} page={7} pages={25} />
    </div>
  );
}

/** Varredura sequencial da tabela granular do QSA: sem números para saltar. */
```

### AnteriorProxima

```jsx
() => {
  return (
    <div style={{ width: 520 }}>
      <PaginationPrevNext info="Exibindo 21–40 de 132" page={2} pages={7} />
    </div>
  );
}

/** Lista com cursor: sem total conhecido, só "Carregar mais". */
```

### CarregarMais

```jsx
() => {
  return (
    <div style={{ width: 520 }}>
      <PaginationLoadMore />
    </div>
  );
}
```

## Related

`PaginationLoadMore`, `PaginationPrevNext`
