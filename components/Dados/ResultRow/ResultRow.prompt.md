ResultRow from @nsights/risk-ops-ui. Use via `window.RiskOpsUI.ResultRow` (bundle loaded from the root `_ds_bundle.js`).

A linha padrão do resultado.

Checklist, compliance, evidências, mídia e entregáveis mostram a mesma coisa —
um item, um fato, um estado — e cada aba tinha a sua marcação até esta existir.
A forma é fixa: ícone, título, uma linha de fatos separados por " · " e o
estado à direita.

Só vira botão quando há detalhe para abrir (`onOpen`): uma linha inerte não
deve se anunciar como interativa ao leitor de tela.

## Props

```ts
interface ResultRowProps {
/** Link ou botão à direita do badge — "Abrir", "Repetir". */
  action?: React.ReactNode;
  badge?: React.ReactNode;
  /** Detalhe revelado sob a linha quando `open`. */
  children?: React.ReactNode;
  /** Os fatos da linha; renderizados numa só linha, separados por " · ". */
  facts?: React.ReactNode[];
  /** SVG de traço, 16px. Fica no quadrado roxo à esquerda. */
  icon: React.ReactNode;
  onOpen?: () => void;
  open?: boolean;
  title: React.ReactNode;
}
```

## Examples

### Lista

```jsx
() => {
  return (
    <div style={{ width: '34rem' }}>
      <ResultRows label="Verificações">
        <ResultRow
          badge={<Badge tone="ok">Verificado</Badge>}
          facts={['CNPJ 12.345.678/0001-90', 'Receita Federal', 'há 2 dias']}
          icon={<DocIcon />}
          title="Situação cadastral"
        />
        <ResultRow
          action={<TableLink>Abrir</TableLink>}
          badge={<Badge tone="attention">3 em andamento</Badge>}
          facts={['TJSP, TJRJ', 'R$ 1,2 mi em discussão']}
          icon={<ScaleIcon />}
          title="Processos judiciais"
        />
        <ResultRow
          badge={<Badge tone="gap">Fonte indisponível</Badge>}
          facts={['tentado 3×', 'última às 14h02']}
          icon={<GlobeIcon />}
          title="Mídia adversa"
        />
      </ResultRows>
    </div>
  );
}

/** Aberta: o detalhe aparece sob a linha, e só então ela vira botão. */
```

### ComDetalhe

```jsx
() => {
  return (
    <div style={{ width: '34rem' }}>
      <ResultRows>
        <ResultRow
          badge={<Badge tone="critical">Consta</Badge>}
          facts={['OFAC SDN', 'correspondência por nome e data de nascimento']}
          icon={<GlobeIcon />}
          onOpen={() => {}}
          open
          title="Listas restritivas"
        >
          <p>Correspondência parcial no nome do sócio administrador. A data de nascimento confere; o documento não foi divulgado pela fonte, então a identificação não é definitiva.</p>
          <p>Confirmação exige documento oficial do sócio — a análise não conclui sozinha.</p>
        </ResultRow>
      </ResultRows>
    </div>
  );
}
```
