Breadcrumb from @nsights/risk-ops-ui. Use via `window.RiskOpsUI.Breadcrumb` (bundle loaded from the root `_ds_bundle.js`).

Trilha de contexto do drill-down — "entidade › categoria › detalhe". No app
ela situa o painel lateral da matriz de verificações, por isso é um
parágrafo discreto, não um `nav` de navegação global: os itens não são
links, são o caminho que a seleção atual percorreu.

Itens saem em negrito (cor de texto); `tail` sai sem negrito, em cinza — é
o complemento ("12 verificações"), não mais um nível. Separadores são `›`
escondidos de leitores de tela, como no app.

## Props

```ts
interface BreadcrumbProps {
  items: ReactNode[];
  /** Arremate sem ênfase depois do último separador (ex.: contagem de resultados). */
  tail?: React.ReactNode;
}
```

## Examples

### Trilha

```jsx
() => {
  return (
    <div style={{ width: 440 }}>
      <Breadcrumb items={['Aurora Agroindustrial S.A.', 'Sanções e listas restritivas']} tail="12 verificações" />
    </div>
  );
}

/** No workspace dedicado, a seta devolve à conversa e a trilha situa o resultado. */
```

### ComVoltar

```jsx
() => {
  return (
    <div style={{ alignItems: 'center', display: 'flex', gap: '.6rem', width: 440 }}>
      <WorkspaceBack label="Voltar para a conversa" />
      <Breadcrumb items={['Consulta KYC', 'Vetor Logística Ltda']} tail="Rodada 3 concluída" />
    </div>
  );
}
```
