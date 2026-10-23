# Etapa 6: telas de negócio (relatório)

- **Commit:** `02b29b5`, no branch `main`
- **Data:** 2026-10-23
- **Status:** concluída. Todos os critérios de aceite foram atendidos.

## Resultado

O fluxo completo do console funciona pelo navegador, com analista e com admin:
- resumo da fila;
- lista de casos com busca, filtros, ordenação e paginação guardados na URL;
- detalhe do caso com timeline, notas, mudança de status e reatribuição;
- abertura e edição de caso;
- entidades: lista, detalhe e cadastro com validação de CPF/CNPJ.

Tudo é composto com os primitivos do Design System. Os erros de validação do backend aparecem no campo correspondente.

## Telas

| Rota | Tela | Destaques |
|---|---|---|
| `/` | Resumo | `MetricGrid` (ativos, atrasados, alto risco, encerrados), `BarList` por status e por risco, tabela de carga por responsável com link para a lista já filtrada |
| `/casos` | Casos | busca (código, título, entidade, documento), filtros de status, risco, responsável e prazo, ordenação, paginação; tudo na query string |
| `/casos/novo` | Novo caso | busca de entidade no servidor, score com o nível e o prazo padrão ao vivo, responsável conforme o papel |
| `/casos/:código` | Detalhe | fatos (status, risco, responsável, prazo), ações de decisão, timeline com antes/depois, nota, reatribuição (admin) |
| `/casos/:código/editar` | Editar caso | envia só os campos alterados; caso encerrado mostra aviso |
| `/entidades` | Entidades | busca por nome ou documento, filtro PF/PJ, ordenação, paginação na URL |
| `/entidades/:id` | Entidade | fatos, casos da entidade, "Abrir caso" com a entidade pré-selecionada |
| `/entidades/nova` | Nova entidade | máscara de CPF/CNPJ, erro de dígito verificador no campo, duplicado com link para a existente; `?voltar=` devolve ao formulário de caso |

## Verificações

Os roteiros Playwright rodaram numa stack isolada (`docker compose -p riskops-e2e`, banco limpo e outras portas), contra o build de produção servido pelo nginx.

| Verificação | Resultado |
|---|---|
| Fluxo de negócio com analista e admin | 38 checagens passaram |
| Analista abre caso | o formulário vazio mostra os 422 do backend em Entidade, Título e Score; o foco vai ao primeiro campo inválido; score 150 mostra "Deve ser menor ou igual a 100." no campo |
| Analista inicia a análise, anota, edita | diálogo com foco no comentário e Esc para fechar; a timeline mostra a transição, a nota e o evento de edição com antes e depois ("Score de risco: 75 → 82") |
| Analista tenta decidir | não vê "Aprovar" nem "Reprovar"; vê o aviso de que a decisão é do admin; não vê a reatribuição |
| Admin aprova | caso encerrado: sem "Editar", e a rota `/editar` mostra o aviso |
| Admin reprova sem justificativa | o 422 aparece no campo do diálogo; com justificativa, o caso é reprovado |
| Admin reatribui | o evento "Responsável: … → …" entra na timeline |
| Transição concorrente | o caso muda por fora; a ação devolve 409, aparece o aviso "O caso mudou" e a tela recarrega o estado real |
| Filtros e paginação | status, risco e busca vão para a URL; recarregar mantém tudo, inclusive o texto da busca; "Limpar filtros" zera; a página 2 entra na URL e o voltar do navegador retorna à 1 |
| Entidade | CPF com dígito errado mostra "CPF inválido" no campo; duplicado mostra o erro e o link; após cadastrar, volta ao novo caso com a entidade escolhida |
| Estados | loading com `Skeleton`; erro com `Alert` e "Tentar novamente"; vazio com `EmptyState`; 404 de caso |
| Console do navegador | nenhum erro ou aviso de React; só os 422/409/404 provocados de propósito |
| Roteiro da Etapa 5 (sessão) | 26 checagens continuam passando |
| 375px e 1366px | nenhuma tela com rolagem horizontal da página (tabelas rolam dentro do `TableScroll`) |
| axe-core (WCAG) em todas as telas e no diálogo | nenhuma violação do app; restam 2 achados do markup e das cores do DS (ver "Pendências") |
| `npm run build` e `docker compose up --build` | ok |

## O que foi criado

- **Páginas** (`src/pages/`): `Summary`, `Cases`, `CaseDetail`, `CaseForm` (criar e editar), `Entities`, `EntityDetail` e `EntityForm`. O `Placeholder` da Etapa 5 saiu.
- **`src/lib/`:**
  - `useApi.js`: leitura com loading, erro, recarga e cancelamento. Ao trocar o filtro, mantém o dado anterior visível (esmaecido, `aria-busy`), para a tabela não piscar.
  - `useQueryState.js`: filtros e página na query string, com a busca gravada na URL depois de uma pausa na digitação.
  - `errors.js`: `fieldErrors()` transforma `details` do envelope em `{campo: mensagem}` para cada `Field`.
  - `format.js`: rótulos do domínio, CPF/CNPJ, datas pt-BR, prazo relativo e o nível de risco calculado com a mesma regra do backend.
  - `links.js`: monta a URL da lista de casos com filtros (usado pelo resumo e pela entidade).
- **`src/components/`:**
  - `domain.jsx`: `CaseStatus` (`StatusPill`), `RiskBadge` (nível e score), `DueDate` (selo "Atrasado") e `Document`. Estado sempre com rótulo, nunca só cor.
  - `Dialog.jsx`: o `Modal` do DS com foco inicial, Tab preso no diálogo, Esc e retorno do foco ao botão que o abriu.
  - `toast.jsx`: uma `ToastStack` por app, com no máximo 3 avisos que somem sozinhos.
  - `states.jsx`: `ErrorState` (mostra o `request_id` para suporte) e `LoadingRows`.
- **`src/app.css`:** complementos ao CSS do DS, só com tokens (ver "O que mudou").

## O que mudou em relação ao plano

- **`DataTable` não foi usado.** Ele filtra, ordena e pagina no cliente, sobre as linhas recebidas, e não aceita total do servidor. As listas usam `Toolbar`, `WorkspaceSearch`, `WorkspaceFilter`, `TableScroll`, `Table` e `Pagination`, como no `ScreenAnalyses`.
- **Filtros com `<select>` nativo dentro de `WorkspaceFilter`**, que é o padrão do próprio DS. O `Dropdown` do DS é um menu de ações, não um seletor.
- **Status e risco num select de escolha única.** A API aceita listas; a tela oferece "Ativos" (aberto + em análise) e mostra "Personalizado" quando a URL traz outra combinação (por exemplo, vinda de um link).
- **Complementos de CSS em `app.css`.** O app não altera o DS. Os complementos são:
  - largura do diálogo de ação (o `Modal` nasce com 72rem);
  - estilo de `select` dentro de `Field` (o DS só estiliza `input` e `textarea`);
  - `Toolbar` que quebra linha com cinco filtros;
  - coluna de rótulo mais larga na `BarList`, que foi desenhada para siglas de UF;
  - `position: relative` no `TableScroll`: sem isso, um `.sr-only` dentro da tabela escapava do recorte e criava rolagem horizontal em 375px.
- **Painéis do detalhe com `DataPanel`, não `Panel`.** O `Panel` tem altura mínima de 18rem (é o painel das abas de resultado).
- **Além do previsto:**
  - tratamento de conflito (409) com recarga do estado real;
  - foco no primeiro campo com erro;
  - busca de entidade que já seleciona quando há um único resultado;
  - retorno do cadastro de entidade para o formulário de caso;
  - título da aba por tela.

## Pendências menores

Registradas em `docs/pendencias.md` para resolver no fim. Nenhuma bloqueia a Etapa 7.

- axe-core aponta dois itens que vêm do DS, não do app:
  - `label-content-name-mismatch` no link da marca da `Sidebar`;
  - contraste de textos do cartão de login.
- Avisos `<select>`/`<input>` da regra de aderência: o DS não tem esses controles; é o padrão dele.
- Os roteiros Playwright (sessão e fluxo de negócio) continuam fora do repo.
- Os prazos do seed (Etapa 4) seguem deixando 17 dos 18 casos ativos atrasados; o resumo mostra 94% de atraso.

## Próxima etapa

Etapa 7: documentação, CI e acabamento. README (como rodar e testar, credenciais demo, variáveis, decisões, o que ficaria para depois), `NOTES.md`, CI com ruff, pytest e build do front, e validação seguindo o README num clone limpo.

## Como validar

Rode os comandos na raiz do repo. As ações abaixo alteram os dados da demo; para voltar ao estado inicial, use `docker compose down -v && docker compose up -d`.

### 1. Subir
```bash
docker compose up --build -d && docker compose ps     # 3 serviços (healthy)
```

### 2. Analista (http://localhost:5173, `analista@nsights.demo` / `riskops123`)
1. **Resumo:** quatro números no topo, barras por status e por risco, e a carga por responsável. Em "Rafael Lima", clique em "Ver casos": a lista abre filtrada (veja a URL).
2. **Casos:**
   - escolha Status "Ativos" e Risco "Alto" e digite `sanções` na busca: a URL ganha `status`, `risk_level` e `q`;
   - recarregue: os filtros e o texto continuam;
   - clique em "Limpar filtros" e depois na página 2: a URL ganha `page=2`, e o voltar do navegador volta à página 1.
3. **Novo caso:**
   - clique em "Abrir caso" com o formulário vazio: aparecem erros embaixo de Entidade, Título e Score;
   - digite `Rota Sul` em "Buscar entidade": ela é selecionada;
   - preencha título e score `75` (a dica mostra "prazo padrão de 3 dias") e abra o caso.
4. **Detalhe do caso:**
   - "Iniciar análise" abre um diálogo (Esc fecha);
   - confirme: a timeline ganha "Status: Aberto → Em análise", e aparece o aviso de que aprovar é exclusivo do admin;
   - adicione uma nota;
   - em "Editar", mude o score para `82`: a timeline mostra "Score de risco: 75 → 82".
5. **Entidades → Nova entidade:**
   - escolha PF e digite `529.982.247-26`: aparece "CPF inválido";
   - com `529.982.247-25`, aparece o erro de duplicado com o link para a entidade existente.

### 3. Admin (`admin@nsights.demo` / `riskops123`)
1. **Caso criado no passo 2:**
   - "Aprovar" e confirmar: o caso fica encerrado, sem "Editar";
   - abrir `/casos/<código>/editar` mostra o aviso de caso encerrado.
2. **Em `/casos/RK-2026-0004`:** "Reprovar" sem justificativa mostra o erro no campo; com justificativa, o caso é reprovado.
3. **Em `/casos/RK-2026-0001`:** troque o responsável no painel "Responsável" e salve; a timeline registra a troca.

### 4. Mobile e console
- No DevTools, use o modo dispositivo com 375px de largura e percorra as telas: não há rolagem horizontal da página; as tabelas rolam dentro do painel.
- Na aba Console, não devem aparecer erros de React. Os únicos erros esperados são as respostas 422/409 provocadas nos passos acima.

### 5. Build local
```bash
cd frontend && npm ci && npm run build && cd ..
```

### 6. Revisar o código
```bash
git show --stat 02b29b5
```
Os arquivos principais são:
- `frontend/src/pages/Cases.jsx`
- `frontend/src/pages/CaseDetail.jsx`
- `frontend/src/pages/CaseForm.jsx`
- `frontend/src/lib/useQueryState.js`
- `frontend/src/lib/errors.js`
- `frontend/src/components/Dialog.jsx`
