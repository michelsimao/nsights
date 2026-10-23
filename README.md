# Nsights Risk Ops — como construir com este design system

Produto: KYC e operações de risco, multi-tenant, em pt-BR. Telas densas, de trabalho:
tabelas, painéis de resultado, assistentes de configuração. Nada de marketing.

## Setup

Não há provider, tema em JS nem contexto. Carregue **uma** folha —
`_ds/<pasta>/styles.css` — e os componentes já saem estilizados; ela traz as fontes
(Geist e Geist Mono, via Google Fonts), o reset (o Preflight do Tailwind, que o app
assume — pesos de heading e line-height dependem dele), os tokens em `:root`, a base
do documento e o CSS de todos os componentes. Sem ela, tudo sai com o desenho do browser.

```jsx
import { PageHeader, Panel, Badge, ResultRow, ResultRows, Button } from '@nsights/risk-ops-ui';
```

## O idioma: tokens em `var(--*)` + classes semânticas fixas

**Não é utility-first.** Não existe `p-4`, `text-sm`, `bg-surface`. O CSS é um
vocabulário fechado de classes semânticas (`result-panel`, `status-badge`,
`overview-metric`, `wizard-footer`…) que os componentes já emitem — você quase nunca
escreve classe: compõe componentes. Para o layout entre eles, use flex/grid com
`gap` e **estilo inline lendo os tokens**.

Tokens definidos em `:root` (são todos — não invente outros):
`--surface` `--surface-subtle` `--surface-raised` `--border` `--border-strong`
`--text` `--ink` `--muted` `--accent` `--accent-strong` `--accent-soft` `--coral`
`--dark` `--dark-raised` `--success` `--warning` `--danger`
`--font-geist` `--font-geist-mono`

O acento é roxo (`--accent: #7024c7`). Superfície é um cinza-lilás claro
(`--surface: #f2f0f3`), painéis são brancos com borda de 1px.

Três classes utilitárias que você usa direto, sem componente:
`mono` (todo identificador, valor e data-hora — Geist Mono com `tabular-nums`),
`eyebrow` (rótulo em caixa alta na cor de acento) e `sr-only`.

## Regras do produto que a UI carrega

- **Estado nunca depende só de cor.** Todo badge, filete e borda colorida vem com o
  rótulo textual junto. É por isso que `RiskVerdict` tem `label` além de `tone`.
- **Inconclusivo ≠ não incide.** `VerdictBadge verdict="inconclusive"` e
  `RiskScale` com `swatch: 'unknown'` são um estado próprio, com cor própria. Nunca os
  trate como "sem apontamento".
- **Lacuna de cobertura diz o motivo.** `StatusBadge` separa `gap` (não foi
  verificado — passe o motivo real em `label`: "Fonte indisponível", "Pré-requisito
  ausente") de `empty` (não se aplica). Nunca rotule "Sem dado", e nunca funda os dois.
- **Nunca exiba o fornecedor da fonte.** O produto é white-label: fontes aparecem
  pela capacidade ("Processos judiciais"), jamais pelo nome do vendor.
- **Progresso não mente.** `Meter` trunca em 99% enquanto a resposta está em voo.

## Um exemplo idiomático

```jsx
<PageHeader
  kicker="Operações de risco"
  title="Análises"
  description="Toda análise de KYC iniciada nesta organização."
  action={<Button icon={<svg className="button-icon" viewBox="0 0 16 16" fill="none" stroke="currentColor"><path d="M8 3v10M3 8h10" /></svg>}>Nova análise</Button>}
/>

<div style={{ display: 'grid', gap: '.75rem', marginTop: '1rem' }}>
  <Panel title="Judicial" tag="3 processos">
    <ResultRows>
      <ResultRow
        icon={<svg viewBox="0 0 16 16"><path d="M8 2v12M4 5h8" /></svg>}
        title="1023456-78.2023.8.26.0100"
        facts={[<span className="mono">TJSP</span>, 'R$ 840 mil']}
        badge={<Badge tone="attention">Em andamento</Badge>}
      />
    </ResultRows>
  </Panel>
</div>
```

Note: o SVG de ícone de botão leva `className="button-icon"` (é como o app dimensiona
ícones de 0.95rem); o ícone de `ResultRow` não leva — o próprio componente o dimensiona.

## O roster, por papel

Fundações (Eyebrow, Mono, Alert, Skeleton, Dot, Icon) · estrutura de tela (AppShell,
Sidebar, Topbar, OperationalPage, PageHeader, Toolbar+WorkspaceSearch/Filter, FilterBar,
Tabs/TabsBar, Panel, DataPanel, EmptyState, Breadcrumb) · estado e veredito (Badge,
StatusBadge, StatusPill, VerdictBadge, Chip, CoveragePill, RiskVerdict, RiskScale) ·
formulário (Field, Checkbox, Radio/RadioGroup, Switch, FileUpload, DatePicker, Dropdown,
MultiSelect, RangeSlider) · dados (Table/TableScroll/TableLink, DataTable, DataList,
Fact/Facts, MetricGrid/MetricTile/MetricCard, KpiCard, Meter, ProgressBar, Pagination,
ChartShell/ChartPlot/ChartLegend, LineChart, BarChart/BarList, Sparkline, PieChart,
GaugeChart, RadarChart) · sobreposição (Modal, Popover, Tooltip, Toast/ToastStack,
CommandPalette) · IA (AiThread/AiTurn, AiStream, AiAsk, AiOpening, AiIdentity/AiSpark,
AiTrace, AiCite/AiCiteMarks, AiConfidence/AiHedge, AiVote, AiQuota) · telas prontas
(Screen*: Login, Dashboard, Analyses, NewAnalysis, Result, Consultations, Settings,
States — leia-as como referência de composição antes de montar uma página do zero).

## Duas convenções de CSS

- Classe SEM prefixo (`result-panel`, `status-badge`…) = extraída verbatim do app.
- Classe `ns-*` = extensão nova do design system (switch, toast, gráficos novos…),
  escrita só com tokens. Não invente uma terceira família.

## Avisos

`Alert` tem quatro tons: `warning` (o âmbar original do app, padrão), `info` (roxo
informacional), `success` e `danger` — os três novos são `ns-` e usam os MESMOS pares de
cor dos badges de estado, para aviso e badge dizerem a mesma coisa. `danger` anuncia com
`role="alert"`. Título opcional em `title`; a mensagem diz o que fazer, não só o que houve.

## Ícones e gráficos

- Ícone é sempre `<Icon name="…">` (nomes pt-BR: 'busca', 'processos', 'societario',
  'midia', 'download', 'fechar', 'avancar', 'aviso'…) ou SVG de traço 16px inline —
  NUNCA emoji, nunca glifo de texto.
- Série de gráfico segue a ordem fixa de cores da casa: #7024c7, #c85c75, #197054,
  #946310, #9c2943 (hex literal na série; o resto do gráfico usa tokens). Barra sem
  degradê; linha com ponto final enfatizado; número tabular.

## Onde está a verdade

`_ds/<pasta>/styles.css` é a folha inteira, legível — leia antes de estilizar
qualquer coisa por conta. Cada componente tem seu `.prompt.md` com os props reais e
a razão de existir. Prefira ler esses arquivos a adivinhar.

# RiskOpsUI (@nsights/risk-ops-ui@0.1.0)

This design system is the published @nsights/risk-ops-ui React library, bundled as a single
browser global. All 120 components are the real upstream code.

## Where things are

- `_ds_bundle.js` — the whole-DS bundle at the project root; loads every component to `window.RiskOpsUI`. First line is a `/* @ds-bundle: … */` metadata header.
- `styles.css` — the single stylesheet entry: it `@import`s the tokens, fonts, and component styles (`_ds_bundle.css`). Link this one file.
- `components/<group>/<Name>/<Name>.prompt.md` (example JSX + variants), `<Name>.d.ts` (types), `<Name>.html` (variant grid).
- `tokens/*.css` — CSS custom properties, names verbatim from upstream.
- `fonts/` — `@font-face` files + `fonts.css` (when the package ships fonts).
- `guidelines/` — the design system's own usage guidance (16 doc(s), see `guidelines/index.md`). Read these before composing larger layouts.

For a specific component, `read_file("components/<group>/<Name>/<Name>.prompt.md")`.

## Loading

Add these two lines to your page once (React must be on the page first):

```html
<link rel="stylesheet" href="styles.css">
<script src="_ds_bundle.js"></script>
```

Components are then available at `window.RiskOpsUI.*`. Mount into a dedicated child node (e.g. `<div id="ds-root">`), not the host page's own React root, so the two trees don't collide:

```jsx
const { AiAsk } = window.RiskOpsUI;
ReactDOM.createRoot(document.getElementById('ds-root')).render(<AiAsk />);
```

## Tokens

19 CSS custom properties from ../risk-ops-ui. Names are
preserved verbatim from upstream. See `tokens/` for the full list.

- **color** (4): `--surface`, `--surface-subtle`, `--surface-raised`, …
- **typography** (2): `--font-geist`, `--font-geist-mono`
- **other** (13): `--border`, `--text`, `--ink`, …

## Components

### Assistente
- `AiAsk` — O composer de pergunta do agente: textarea, anexos, seletor de fontes e o
- `AiCite` — As fontes que sustentam uma resposta da IA, na grade de cartões que o app
- `AiCiteMarks` — O grupo de marcas [1][2] sobrescritas que o app pendura no fim de uma
- `AiConfidence` — O vocabulário de incerteza de uma resposta da IA: a palavra + um medidor
- `AiHedge` — Um trecho incerto DENTRO da frase: sublinhado tracejado com a ressalva no
- `AiIdentity` — A identidade completa do agente: marca, nome e estado corrente.
- `AiOpening` — A abertura de uma conversa nova: saudação grande, linha de apoio, o composer
- `AiQuota` — O consumo de créditos do plano: um número gigante em mono roxo — o saldo — e,
- `AiQuotaBreakdown` — O extrato compacto de créditos de UMA rodada de consulta, no workspace:
- `AiSpark` — A marca do Agente de Consultas — o balão de conversa com o ponto de status.
- `AiStream` — A resposta do agente chegando — e os três estados que a espera atravessa.
- `AiThread` — A coluna que ordena os turnos de uma conversa com o agente.
- `AiTrace` — A trilha de consultas de uma resposta da IA: qual base foi consultada, com
- `AiTurn` — Um turno da conversa: quem falou e o que disse.
- `AiVote` — O feedback sobre uma resposta da IA: ajudou / não ajudou, com regenerar e

### Feedback
- `Alert` — Aviso em bloco, no fluxo da página — para o que o usuário precisa saber
- `Badge` — O estado de um item, em pílula.
- `Chip` — Filtro em pílula, com contagem e ponto de cor. É o que fica acima de uma
- `Dot` — O ponto de cor sozinho, para legendas de gráfico e listas densas onde uma
- `DotsLoader` — Os três pontos que pulsam enquanto o agente pensa ou o texto ainda está
- `EmptyState` — O vazio de um painel: marca, título e uma frase que diz o que fazer.
- `InlineEmpty` — O vazio miúdo, centralizado, para dentro de uma aba ou lista já pequena —
- `LiveDot` — O ponto verde de presença ("conectado", "ao vivo"). Decorativo por decisão:
- `Modal` — O diálogo sobre a tela, com o fundo escurecido.
- `ProgressBar` — O progresso determinado de uma rodada: contador-herói, barra segmentada e
- `Skeleton` — O bloco que pulsa enquanto o dado não chegou.
- `Spinner` — O anel que gira enquanto uma ação curta não termina.
- `StatusBadge` — O estado de uma verificação do checklist, com o ponto colorido à esquerda.
- `StatusPill` — Pílula compacta de situação para linhas de tabela e listas — menor e mais
- `Toast` — O aviso transitório sobre algo que já aconteceu — exportação pronta, análise
- `ToastStack` — A pilha fixa no canto inferior direito. Uma por aplicação: cada aviso novo
- `Tooltip` — Dica curta em hover E foco — o title nativo não aparece no teclado, e um

### Navegação
- `AppShell` — A moldura da plataforma inteira: grid de duas colunas com a Sidebar à
- `Breadcrumb` — Trilha de contexto do drill-down — "entidade › categoria › detalhe". No app
- `Eyebrow` — O rótulo em caixa alta que abre uma seção, na cor de acento.
- `MobileNavigation` — O menu principal em telas estreitas (≤ 850px, quando a Sidebar some):
- `OperationalPage` — O invólucro de TODA tela operacional do produto — é ele que dá a largura, o
- `PageHeader` — O topo de uma tela: rótulo, título grande e a ação da página.
- `Panel` — O painel branco de conteúdo — a superfície padrão das abas de resultado.
- `SectionHeading` — Cabeçalho de seção: rótulo em caixa alta, título e uma linha de apoio.
- `Sidebar` — A barra lateral escura da plataforma. Recolhida (4rem) por padrão, expandida
- `Tabs` — As abas. Duas variantes, e a escolha é de nível, não de gosto:
- `TabsBar` — A barra que segura as abas de painel: à esquerda as Tabs, à direita um
- `Topbar` — A faixa fixa no topo da coluna principal: contexto do workspace à esquerda,

### Identidade
- `Avatar` — Marca visual de uma entidade. No produto o PADRÃO é o monograma de duas
- `AvatarStack` — Fileira sobreposta de Avatar para resumir um lote de entidades sem listar
- `Icon` — A biblioteca de ícones do app, com nome do domínio em pt-BR — processos,

### Gráficos
- `BarChart` — Colunas agrupadas por categoria, sem eixo Y: o valor exato fica escrito no
- `BarList` — Barras horizontais com rótulo e total — o ranking compacto de "quanto por
- `ChartLegend` — A legenda de linhas do gráfico de tendência.
- `ChartPlot` — A moldura de plotagem do painel de tendência: grade horizontal discreta
- `ChartShell` — O cartão que emoldura qualquer gráfico do resultado: título em caixa alta,
- `GaugeChart` — Meia-lua estática para um valor contra um teto — cobertura de fontes,
- `GraphTooltip` — O cartão informativo do grafo de vínculos: nome da entidade, a banda de
- `LineChart` — A linha de evolução do perfil: grade horizontal discreta com três réguas
- `PieChart` — Donut estático para composição de um todo — consultas por família de fonte,
- `RadarChart` — Polígono estático para comparar perfis em várias dimensões — a exposição de
- `Sparkline` — A pílula de tendência do perfil: mini-linha, número e um fundo que já dá o

### Ações
- `Button` — A ação. Uma primary por tela — a que a tela existe para fazer.
- `CommandPalette` — Paleta de comandos (Cmd+K): campo de busca + lista filtrada por grupos.
- `Dropdown` — Menu de ações ancorado a um botão — o "Ações" no fim de uma linha da
- `Popover` — Painel não-modal ancorado a um gatilho — o lugar de uma explicação longa
- `SelectAllButton` — O link "Selecionar todas / Desmarcar todas" que acompanha uma lista de
- `TableLink` — A ação dentro de uma célula — "Abrir", "Ver processo". Sublinhado e na cor de
- `WorkspaceBack` — Botão de voltar do workspace dedicado — a seta que devolve a pessoa à

### Formulário
- `Checkbox` — A linha de seleção múltipla do produto — consultas no seletor do agente,
- `CheckCard` — A linha-cartão de uma verificação: categoria em caixa alta, nome e uma linha
- `DatePicker` — Campo de período pt-BR: exibe dd/mm/aaaa, troca valores em ISO. De propósito
- `Field` — Rótulo, campo e ajuda — a unidade de formulário do produto.
- `FileUpload` — A zona de soltar arquivos, com a lista de anexos embaixo.
- `FilterBar` — Barra de filtros do console — mais baixa e mais clara que Toolbar, para
- `MultiSelect` — Seleção múltipla compacta de filtro — status de processo, tribunais, UFs.
- `Radio` — Escolha única em linha de lista — quando as opções não pedem o peso do
- `RadioGroup` — Agrupador semântico dos rádios — fieldset/legend, não um div com título:
- `RangeSlider` — Faixa de mercado do pricing: mínimo e máximo nas pontas, cada comparável é
- `Segmented` — Alternador de poucas opções mutuamente exclusivas — período, densidade, modo
- `SelectableCard` — O cartão de escolha única do assistente — escopo da análise, modelo de risco.
- `SourceCard` — O cartão de uma fonte na seleção de fontes.
- `SourceCardGrid` — Duas colunas de SourceCard, uma só em telas estreitas.
- `Switch` — Liga/desliga de efeito imediato — monitoramento contínuo, alertas, opções de
- `Toolbar` — A barra branca de controles sob o cabeçalho da página: busca, selects,
- `WorkspaceFilter` — Um filtro da barra de trabalho: rótulo em caixa alta e o select como filho.
- `WorkspaceSearch` — O campo de busca da barra de trabalho: rótulo em caixa alta e input de busca

### Dados
- `CoveragePill` — O estado de uma fonte na cobertura de uma análise.
- `CoveragePills` — Agrupa CoveragePill numa faixa que quebra linha.
- `DataList` — A lista fina rótulo → valor dos resultados de consulta — "OFAC" → "Nada
- `DataPanel` — Painel de dados com cabeçalho e rodapé fixos — o invólucro de tabela e lista
- `DataTable` — A tabela operacional completa — busca, filtros, contagem, ordenação por
- `Fact` — Um fato do dossiê: rótulo, valor e ressalva, em cartão branco.
- `Facts` — Grade de Fact com fios de 1px entre as células, como a faixa de métricas.
- `KpiCard` — Um MetricTile com movimento: além de rótulo, valor e contexto, carrega o
- `Meter` — O progresso de uma análise: legenda, trilho e porcentagem.
- `MetricCard` — Número avulso em cartão branco, para quando não há uma faixa de quatro —
- `MetricGrid` — A faixa de números do topo de um painel: quatro colunas separadas por fios de
- `MetricTile` — Um número da faixa: rótulo em caixa alta, valor grande em Geist Mono e uma
- `Mono` — Identificador com cara de identificador: CPF/CNPJ, número de processo, hash,
- `Pagination` — Paginação numerada de listas longas (vínculos, estabelecimentos). Página é
- `PaginationLoadMore` — "Carregar mais" de listas com cursor (extrato de créditos): quando não há
- `PaginationPrevNext` — Paginação Anterior/Próxima da tabela granular do QSA — sem números, porque
- `ResultRow` — A linha padrão do resultado.
- `ResultRows` — Agrupa ResultRow. Usa role="group", não list: os filhos são linhas com
- `RiskScale` — A legenda da grade de risco — como ler as cores.
- `RiskVerdict` — A faixa de veredito no topo de um resultado: filete grosso à esquerda na cor
- `StageList` — Narra uma chamada longa como os estágios que ela de fato roda.
- `Table` — A tabela de resultados: cabeçalho em caixa alta miúda, linhas separadas por
- `TableScroll` — O invólucro que rola a tabela na horizontal. Recebe foco pelo teclado (e o
- `VerdictBadge` — O veredito da análise, em caixa alta.

### Telas
- `ScreenAnalyses` — A tela "Histórico de análises" — a lista de trabalho das diligências.
- `ScreenConsultations` — A tela do Agente de Consultas — a vitrine do subsistema Ai inteiro, no
- `ScreenDashboard` — A tela "Visão geral" — o painel gerencial de risk advisory que abre o app.
- `ScreenLogin` — Tela de login — o split de autenticação do app, inteiro.
- `ScreenNewAnalysis` — A tela "Nova análise" — o assistente de KYC parado na Etapa 3 (Coberturas).
- `ScreenResult` — A tela de resultado de uma análise de KYC, como o app a monta: o chrome da
- `ScreenSettings` — A administração do workspace, como o app a monta: PageHeader no topo, a
- `ScreenStates` — Estados da plataforma — as quatro telas de exceção que o app tem, lado a lado.

### Fluxo de análise
- `WizardCard` — Cartão cinza-claro dentro de um passo, para uma escolha secundária ou um resumo.
- `WizardFooter` — O rodapé escuro fixo do assistente: à esquerda o que a decisão custa, à
- `WizardHeader` — O cabeçalho do assistente: título grande e uma linha de apoio. Vem antes da
- `WizardProgress` — A trilha de passos do topo do assistente: um traço por passo, o percorrido em
- `WizardSection` — O bloco branco de um passo. Um por passo — dois blocos competindo pela mesma
