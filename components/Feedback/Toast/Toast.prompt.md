Toast from @nsights/risk-ops-ui. Use via `window.RiskOpsUI.Toast` (bundle loaded from the root `_ds_bundle.js`).

O aviso transitório sobre algo que já aconteceu — exportação pronta, análise
concluída, falha de envio. Vive dentro de um `ToastStack`, no canto inferior
direito; para estado que persiste na página, use `Alert`.

O timer de sumir é de quem chama — e erro nunca some sozinho: a pessoa pode
estar olhando outra aba quando a exportação falha, e um erro que se apaga é
um erro que ninguém viu. Por isso `danger` sai como `role="alert"`
assertivo; os demais tons são `role="status"` educado, que não interrompe o
leitor de tela no meio de uma frase.

## Props

```ts
interface ToastProps {
  /** Ação curta ("Desfazer", "Tentar de novo") — normalmente um botão pequeno. */
  action?: React.ReactNode;
  children?: React.ReactNode;
  onClose?: () => void;
  title?: string;
  tone?: "warning" | "info" | "success" | "danger";
}
```

## Examples

### Pilha

```jsx
() => {
  return (
    <div style={STAGE}>
      <ToastStack>
        <Toast onClose={() => {}} title="Análise concluída" tone="success">
          ACME Participações S.A. — 812 consultas executadas, veredicto disponível.
        </Toast>
        <Toast
          action={<Button variant="secondary">Tentar de novo</Button>}
          onClose={() => {}}
          title="Falha na exportação"
          tone="danger"
        >
          O PDF do dossiê não foi gerado. Nenhum crédito foi debitado.
        </Toast>
      </ToastStack>
    </div>
  );
}

/** Os quatro tons, soltos, para comparar lado a lado. */
```

### Tons

```jsx
() => {
  return (
    <div style={{ display: 'grid', gap: '.5rem', width: '21rem' }}>
      <Toast title="Rodada iniciada" tone="info">16 consultas na fila para Horizonte Agro Ltda.</Toast>
      <Toast title="Dossiê exportado" tone="success">kyc-horizonte-agro.pdf pronto para download.</Toast>
      <Toast title="Cobertura parcial" tone="warning">TJBA fora do ar — 2 tribunais ficarão pendentes.</Toast>
      <Toast onClose={() => {}} title="Créditos esgotados" tone="danger">A consulta de mídia não foi executada.</Toast>
    </div>
  );
}
```

## Related

`ToastStack`
