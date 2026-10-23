Panel from @nsights/risk-ops-ui. Use via `window.RiskOpsUI.Panel` (bundle loaded from the root `_ds_bundle.js`).

O painel branco de conteúdo — a superfície padrão das abas de resultado.

Tem altura mínima: um painel vazio mantém o tamanho em vez de encolher e fazer
a página pular quando os dados chegam. O `tag` à direita do título é para a
contagem ou o recorte ("42 processos", "últimos 12 meses"), não para estado.

## Props

```ts
interface PanelProps {
  children: React.ReactNode;
  /** Uma linha sob o título. */
  description?: React.ReactNode;
  /** Pílula roxa à direita do cabeçalho. */
  tag?: React.ReactNode;
  title?: React.ReactNode;
}
```

## Examples

### ComConteudo

```jsx
() => {
  return (
    <div style={{ width: '32rem' }}>
      <Panel description="Processos em que a entidade figura no polo passivo nos últimos cinco anos." tag="3 processos" title="Judicial">
        <ResultRows>
          <ResultRow badge={<Badge tone="attention">Em andamento</Badge>} facts={['TJSP', 'R$ 840 mil']} icon={<ScaleIcon />} title="1023456-78.2023.8.26.0100" />
          <ResultRow badge={<Badge tone="ok">Arquivado</Badge>} facts={['TJRJ', 'R$ 120 mil']} icon={<ScaleIcon />} title="0800123-45.2021.8.19.0001" />
        </ResultRows>
      </Panel>
    </div>
  );
}
```
