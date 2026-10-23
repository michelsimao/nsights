Chip from @nsights/risk-ops-ui. Use via `window.RiskOpsUI.Chip` (bundle loaded from the root `_ds_bundle.js`).

Filtro em pílula, com contagem e ponto de cor. É o que fica acima de uma
tabela dizendo quantos itens cada estado tem, e filtrando ao clique.

Quando é filtro, use `pressed` (vira `aria-pressed`) — não uma classe de
"ativo": o estado precisa chegar ao leitor de tela, e o anel de foco roxo já
vem do sistema.

## Props

```ts
interface ChipProps {
  children: React.ReactNode;
  /** Contagem à direita do rótulo, em tabular-nums. */
  count?: number;
  onClick?: () => void;
  /** Estado do filtro. Só passe em chip clicável. */
  pressed?: boolean;
  /** Ponto de cor à esquerda. Sem tom, o chip não mostra ponto. */
  tone?: "attention" | "critical" | "gap" | "regular" | "group" | "partners" | "related";
}
```

## Examples

### Filtros

```jsx
() => {
  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '.4rem' }}>
      <Chip count={128} onClick={() => {}} tone="regular">Verificado</Chip>
      <Chip count={14} onClick={() => {}} pressed tone="attention">Atenção</Chip>
      <Chip count={3} onClick={() => {}} tone="critical">Crítico</Chip>
      <Chip count={41} onClick={() => {}} tone="gap">Lacuna</Chip>
    </div>
  );
}

/** Sem clique e sem ponto: chip só de leitura, para um recorte fixo. */
```

### Leitura

```jsx
() => {
  return (
    <div style={{ display: 'flex', gap: '.4rem' }}>
      <Chip>Últimos 12 meses</Chip>
      <Chip count={7}>Empresas do grupo</Chip>
    </div>
  );
}
```
