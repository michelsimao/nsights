Modal from @nsights/risk-ops-ui. Use via `window.RiskOpsUI.Modal` (bundle loaded from the root `_ds_bundle.js`).

O diálogo sobre a tela, com o fundo escurecido.

A estrutura interna é a do app: `.process-dialog-head` (rótulo, título e o
fechar) sobre `.process-dialog-content` (o corpo, que rola). Sem essa dupla
o conteúdo cola nas bordas — a definição vigente de `.process-dialog` tem
`padding: 0` e delega o respiro ao head/content.

Fecha ao clicar no fundo — mas só quando o clique começa e termina nele,
senão arrastar uma seleção de dentro para fora fecha o diálogo.

## Props

```ts
interface ModalProps {
  children: React.ReactNode;
  /** Rótulo em caixa alta acima do título ("Processo judicial"). */
  kicker?: React.ReactNode;
  onClose?: () => void;
  /** Título visível no head e rótulo acessível do diálogo. */
  title: string;
}
```

## Examples

### Detalhe

```jsx
() => {
  return (
    <div style={STAGE}>
      <Modal kicker="Processo judicial" onClose={() => {}} title="1023456-78.2023.8.26.0100">
        <dl style={{ display: 'grid', gap: '.3rem .8rem', gridTemplateColumns: '8rem 1fr', margin: '1rem 0 0' }}>
          <dt style={{ color: 'var(--muted)', fontSize: '.7rem' }}>Tribunal</dt><dd style={{ fontSize: '.75rem', fontWeight: 700, margin: 0 }}>TJSP — 3ª Vara Cível</dd>
          <dt style={{ color: 'var(--muted)', fontSize: '.7rem' }}>Polo</dt><dd style={{ fontSize: '.75rem', fontWeight: 700, margin: 0 }}>Passivo</dd>
          <dt style={{ color: 'var(--muted)', fontSize: '.7rem' }}>Valor</dt><dd className="mono" style={{ fontSize: '.75rem', fontWeight: 700, margin: 0 }}>R$ 840.000,00</dd>
          <dt style={{ color: 'var(--muted)', fontSize: '.7rem' }}>Distribuído</dt><dd className="mono" style={{ fontSize: '.75rem', fontWeight: 700, margin: 0 }}>14/03/2023</dd>
        </dl>
        <div style={{ alignItems: 'center', display: 'flex', gap: '.6rem', marginTop: '1rem' }}>
          <Badge tone="attention">Em andamento</Badge>
          <Button variant="secondary">Ver movimentações</Button>
        </div>
      </Modal>
    </div>
  );
}
```
