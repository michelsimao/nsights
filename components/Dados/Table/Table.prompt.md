Table from @nsights/risk-ops-ui. Use via `window.RiskOpsUI.Table` (bundle loaded from the root `_ds_bundle.js`).

A tabela de resultados: cabeçalho em caixa alta miúda, linhas separadas por
uma borda só, números em 0.7rem.

Tem largura mínima e por isso vai sempre dentro de `TableScroll` — a tabela
rola na horizontal, a página não.

`variant="ledger"` é o extrato de créditos: células mais folgadas (.8rem),
corpo padronizado em .75rem (extensão ns- — no app o td herdava 16px) e
o cabeçalho na mesma régua tipográfica dos cartões de métrica, porque no
app extrato e métricas dividem a mesma página. `variant="bare"` sai sem
classe própria — é a tabela de processos sensíveis, cuja moldura inteira
vem do invólucro (`TableScroll variant="sensitive"`): sem largura mínima,
para caber sem scroll horizontal.

## Props

```ts
interface TableProps {
  children: React.ReactNode;
  variant?: "ledger" | "bare";
}
```

## Examples

### Processos

```jsx
() => {
  return (
    <div style={{ width: '42rem' }}>
      <TableScroll>
        <Table>
          <thead><tr><th>Processo</th><th>Tribunal</th><th>Polo</th><th>Valor</th><th>Situação</th><th /></tr></thead>
          <tbody>
            <tr><td className="mono">1023456-78.2023.8.26.0100</td><td>TJSP</td><td>Passivo</td><td className="mono">R$ 840.000,00</td><td><StatusPill status="alerta">Em andamento</StatusPill></td><td><TableLink>Abrir</TableLink></td></tr>
            <tr><td className="mono">0800123-45.2021.8.19.0001</td><td>TJRJ</td><td>Passivo</td><td className="mono">R$ 120.400,00</td><td><StatusPill status="ativa">Arquivado</StatusPill></td><td><TableLink>Abrir</TableLink></td></tr>
            <tr><td className="mono">5001234-56.2022.4.03.6100</td><td>TRF3</td><td>Ativo</td><td className="mono">R$ 2.310.000,00</td><td><StatusPill status="alerta">Em andamento</StatusPill></td><td><TableLink>Abrir</TableLink></td></tr>
          </tbody>
        </Table>
      </TableScroll>
    </div>
  );
}

/** O extrato de créditos: células folgadas, cabeçalho na régua dos cartões de métrica. */
```

### ExtratoDeCreditos

```jsx
() => {
  return (
    <div style={{ width: '46rem' }}>
      <TableScroll ariaLabel="Histórico de lançamentos de crédito">
        <Table variant="ledger">
          <thead><tr><th>Data</th><th>Tipo</th><th>Referência</th><th>Valor</th></tr></thead>
          <tbody>
            <tr><td>12/08/2026 14:32</td><td>Consumo</td><td>Análise KYC — Agropecuária Santa Fé Ltda.</td><td className="mono">−18</td></tr>
            <tr><td>12/08/2026 09:05</td><td>Reserva</td><td>Lote — 4 entidades do grupo Vale Verde</td><td className="mono">−72</td></tr>
            <tr><td>01/08/2026 08:00</td><td>Concessão</td><td>Recarga mensal do plano</td><td className="mono">+500</td></tr>
          </tbody>
        </Table>
      </TableScroll>
    </div>
  );
}

/** A tabela de sensíveis: sem largura mínima, o assunto carrega o contexto na sublinha. */
```

### ProcessosSensiveis

```jsx
() => {
  return (
    <div style={{ width: '52rem' }}>
      <TableScroll variant="sensitive">
        <Table variant="bare">
          <thead><tr><th>Processo</th><th>Entidade e vínculo</th><th>Assunto</th><th>Polo</th><th className="amount-cell">Valor</th></tr></thead>
          <tbody>
            <tr>
              <td className="mono">5001234-56.2022.4.03.6100</td>
              <td>Agropecuária Santa Fé Ltda.</td>
              <td className="subject-cell">Fraude em licitação<small>Ação Penal · Justiça Federal · TRF3/SP</small></td>
              <td>Passivo</td>
              <td className="amount-cell mono">R$ 2.310.000,00</td>
            </tr>
            <tr>
              <td className="mono">0712345-67.2020.8.07.0001</td>
              <td>Mineração Serra Alta Ltda.</td>
              <td className="subject-cell">Dano ambiental<small>Ação Civil Pública · Justiça Estadual · TJDFT</small></td>
              <td>Passivo</td>
              <td className="amount-cell mono">R$ 120.400,00</td>
            </tr>
          </tbody>
        </Table>
      </TableScroll>
    </div>
  );
}
```

## Related

`TableLink`, `TableScroll`
