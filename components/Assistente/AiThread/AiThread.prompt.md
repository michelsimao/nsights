AiThread from @nsights/risk-ops-ui. Use via `window.RiskOpsUI.AiThread` (bundle loaded from the root `_ds_bundle.js`).

A coluna que ordena os turnos de uma conversa com o agente.

`role="log"` SEM `aria-live`: o anúncio de conteúdo novo pertence ao turno
que está chegando (AiStream) — se o contêiner fosse live, cada re-render
releria turnos antigos por cima de quem digita.

Rola e gruda no fim enquanto a pessoa está perto do fundo (menos de 96px),
como no app: resposta chegando acompanha sozinha, mas quem subiu para
reler não é puxado de volta. Precisa de um pai flex em coluna com altura
definida — a classe é `flex: 1 1 auto; overflow-y: auto`.

## Props

```ts
interface AiThreadProps {
  children: React.ReactNode;
  /** Nome da conversa para leitor de tela. */
  label?: string;
}
```

## Examples

### Conversa

```jsx
() => {
  return (
    <div style={frame}>
      <AiThread label="Consulta da Vale Verde Agroindústria">
        <AiTurn from="user">
          <p>Cadastro e processos do CNPJ 12.345.678/0001-90</p>
        </AiTurn>
        <AiTurn from="assistant">
          <AiStream done>
            <p><strong>Vale Verde Agroindústria S.A.</strong> está <strong>ativa</strong> na Receita Federal desde 14/03/2009, com sede em Rio Verde/GO e capital social de R$ 4,2 milhões.</p>
            <ul>
              <li>Situação cadastral regular; CND federal vigente até 12/11/2026.</li>
              <li>7 processos judiciais localizados: 5 cíveis, 2 trabalhistas — nenhum com a empresa no polo passivo em execução fiscal.</li>
              <li>Nenhuma ocorrência em listas restritivas (OFAC, ONU, CEIS, CNEP).</li>
            </ul>
            <p>Esta rodada consumiu 6 créditos. Quer que eu detalhe os processos trabalhistas?</p>
          </AiStream>
        </AiTurn>
        <AiTurn from="user">
          <p>Detalhar os trabalhistas e listar os sócios com participação acima de 10%.</p>
        </AiTurn>
      </AiThread>
    </div>
  );
};

/** Resposta chegando: o último turno transmite com aria-busy; o log gruda no fim. */
```

### RespostaChegando

```jsx
() => {
  return (
    <div style={frame}>
      <AiThread label="Consulta do lote de fornecedores">
        <AiTurn from="user">
          <p>Analise este lote de 18 fornecedores: cadastro, processos e restrições.</p>
        </AiTurn>
        <AiTurn from="assistant">
          <AiStream>
            <p>Reconheci as 18 entidades do lote — 15 CNPJs e 3 CPFs. Já consultei o cadastro de 12 delas: 11 ativas e 1 <strong>baixada</strong> (Transportadora Iguaçu Ltda., baixa em 02/2024). Agora estou cruzando processos judiciais…</p>
          </AiStream>
        </AiTurn>
      </AiThread>
    </div>
  );
}
```
