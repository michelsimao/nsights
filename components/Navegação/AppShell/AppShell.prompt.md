AppShell from @nsights/risk-ops-ui. Use via `window.RiskOpsUI.AppShell` (bundle loaded from the root `_ds_bundle.js`).

A moldura da plataforma inteira: grid de duas colunas com a `Sidebar` à
esquerda e a coluna principal (`Topbar` + `<main>`) à direita.

A largura da coluna da sidebar NÃO é controlada por prop daqui: o grid usa
`:has(.sidebar[data-expanded="true"])`, então é o `data-expanded` da própria
`Sidebar` que alarga o shell de 4rem para 13.5rem — passe o mesmo estado
`expanded` para ela e o grid acompanha com a transição do app.

O link "Pular para o conteúdo" fica fora do grid e aponta para
`#main-content` — o `<main>` daqui carrega esse id, por isso só pode existir
um `AppShell` por tela.

## Props

```ts
interface AppShellProps {
  /** O conteúdo da tela (tipicamente um `OperationalPage`). */
  children: React.ReactNode;
  /** A `Sidebar` — é o `data-expanded` dela que dimensiona o grid. */
  sidebar: React.ReactNode;
  skipLinkLabel?: string;
  /** O `Topbar` fixo no topo da coluna principal. */
  topbar?: React.ReactNode;
}
```

## Examples

### PlataformaCompleta

```jsx
() => {
  return (
    <div style={{ background: 'var(--surface)', minHeight: '100dvh' }}>
      <style>{'.skip-link{display:none}'}</style>
      <AppShell
        sidebar={<Sidebar expanded groups={grupos} />}
        topbar={<Topbar accountName="Operações" contextName="Nsights Risk Ops" initials="NO" />}
      >
        <OperationalPage>
          <PageHeader
            action={<Button>Nova análise</Button>}
            description="Toda análise de KYC iniciada nesta organização, com a política aplicada e o veredito rastreável."
            kicker="Operações de risco"
            title="Visão geral"
          />
          <DataPanel title="Análises recentes">
            <EmptyState description="Nenhuma análise no período. Amplie o intervalo ou inicie uma nova." title="Sem análises nas últimas 24 horas" />
          </DataPanel>
        </OperationalPage>
      </AppShell>
    </div>
  );
}
```
