DataList from @nsights/risk-ops-ui. Use via `window.RiskOpsUI.DataList` (bundle loaded from the root `_ds_bundle.js`).

A lista fina rótulo → valor dos resultados de consulta — "OFAC" → "Nada
consta", "Agropecuária Santa Fé" → CNPJ. Fios de 1px entre as linhas e nada
de cartão nem cabeçalho: cada linha é uma resposta pontual, não um dado a
comparar com a linha vizinha — tabela aqui seria cerimônia.

O rótulo sai apagado (`span`) e o valor firme (`strong`), porque quem varre
a lista procura a resposta, não a pergunta.

## Props

```ts
interface DataListProps {
  items: DataListItem[];
}
```

## Examples

### ListasRestritivas

```jsx
() => {
  return (
    <div style={{ width: '24rem' }}>
      <DataList
        items={[
          { label: 'OFAC — SDN', value: 'Nada consta' },
          { label: 'ONU — Conselho de Segurança', value: 'Nada consta' },
          { label: 'União Europeia — lista consolidada', value: 'Nada consta' },
          { label: 'CEIS — Empresas inidôneas e suspensas', value: 'Consta' },
          { label: 'CNEP — Lei Anticorrupção', value: 'Nada consta' },
        ]}
      />
    </div>
  );
};

/** Situação cadastral: entidade à esquerda, documento à direita. */
```

### SituacaoCadastral

```jsx
() => {
  return (
    <div style={{ width: '24rem' }}>
      <DataList
        items={[
          { label: 'Agropecuária Santa Fé Ltda.', value: '12.345.678/0001-90' },
          { label: 'Transportadora Vale Verde S.A.', value: '98.765.432/0001-10' },
          { label: 'Mineração Serra Alta Ltda.', value: '45.678.912/0001-33' },
        ]}
      />
    </div>
  );
}
```
