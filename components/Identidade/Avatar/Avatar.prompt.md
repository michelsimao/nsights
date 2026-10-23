Avatar from @nsights/risk-ops-ui. Use via `window.RiskOpsUI.Avatar` (bundle loaded from the root `_ds_bundle.js`).

Marca visual de uma entidade. No produto o PADRÃO é o monograma de duas
letras sobre fundo escuro — logotipo é exceção, só quando a fonte consultada
trouxe um. Por isso `src` é opcional e o monograma é o caminho feliz.

Três tamanhos, um por contexto real do app: `monogram` (2.3rem) acompanha
candidatos de busca e linhas de lote; `recent` (2.4rem, mono) é a lista de
consultas recentes; `mark` (1.6rem, tom de acento) vive dentro de linhas de
tabela, onde o escuro pesaria.

Sem `label` a marca é decorativa (`aria-hidden`) — o nome da entidade já
está no texto ao lado. Passe `label` quando a marca carrega informação
sozinha (ex.: logotipo sem nome visível por perto).

## Props

```ts
interface AvatarProps {
  /** Rótulo acessível. Sem ele a marca sai `aria-hidden`, como o app faz quando o nome está ao lado. */
  label?: string;
  /** Monograma explícito (ex.: vindo da fonte). Sem ele, derivamos das iniciais das duas primeiras palavras. */
  monogram?: string;
  name: string;
  /** URL do logotipo — vira `background-image` com a classe `entity-logo`, o mesmo truque do app. */
  src?: string;
  variant?: "mark" | "monogram" | "recent";
}
```

## Examples

### Marcas

```jsx
() => {
  return (
    <div style={{ alignItems: 'center', display: 'flex', gap: '.75rem', width: 380 }}>
      <Avatar name="Aurora Agroindustrial S.A." />
      <Avatar name="Vetor Logística Ltda" />
      <Avatar monogram="CF" name="Casa Forte Alimentos" variant="recent" />
      <Avatar monogram="MR" name="Marina Rezende Prado" variant="mark" />
    </div>
  );
}

/** Logotipo só quando a fonte trouxe um — vira background da mesma caixa. */
```

### ComLogotipo

```jsx
() => {
  const logo = 'data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 32 32%22%3E%3Crect width=%2232%22 height=%2232%22 rx=%226%22 fill=%22%237024c7%22/%3E%3Cpath d=%22M8 22 16 9l8 13z%22 fill=%22%23fff%22/%3E%3C/svg%3E';
  return (
    <div style={{ alignItems: 'center', display: 'flex', gap: '.75rem', width: 380 }}>
      <Avatar label="Logo de Delta Mineração" name="Delta Mineração S.A." src={logo} />
      <Avatar name="Delta Mineração S.A." />
    </div>
  );
}

/** Lote resumido: quatro visíveis, o resto vira contagem. */
```

### Lote

```jsx
() => {
  return (
    <div style={{ width: 380 }}>
      <AvatarStack label="6 entidades no lote">
        <Avatar name="Aurora Agroindustrial S.A." />
        <Avatar name="Vetor Logística Ltda" />
        <Avatar name="Casa Forte Alimentos" />
        <Avatar name="Delta Mineração S.A." />
        <Avatar name="Estaleiro Guanabara" />
        <Avatar name="Fazendas Reunidas Ipê" />
      </AvatarStack>
    </div>
  );
}
```

## Related

`AvatarStack`
