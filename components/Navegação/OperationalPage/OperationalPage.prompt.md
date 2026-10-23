OperationalPage from @nsights/risk-ops-ui. Use via `window.RiskOpsUI.OperationalPage` (bundle loaded from the root `_ds_bundle.js`).

O invólucro de TODA tela operacional do produto — é ele que dá a largura, o
respiro lateral fluido e o padding vertical que as dez telas do app dividem.

Uma página = um `OperationalPage` com um `PageHeader` (ou `.page-heading`)
logo dentro. Sem ele, o conteúdo cola nas bordas da janela.

## Props

```ts
interface OperationalPageProps {
  children: React.ReactNode;
}
```

## Examples

### Tela

```jsx
() => {
  return (
    <div style={{ background: 'var(--surface)', width: '52rem' }}>
      <OperationalPage>
        <PageHeader
          action={<Button>Nova análise</Button>}
          description="Toda análise de KYC iniciada nesta organização, com a política aplicada e o veredito rastreável."
          kicker="Operações de risco"
          title="Análises"
        />
        <DataPanel title="Análises recentes">
          <EmptyState description="Nenhuma análise no período. Amplie o intervalo ou inicie uma nova." title="Sem análises nas últimas 24 horas" />
        </DataPanel>
      </OperationalPage>
    </div>
  );
}
```
