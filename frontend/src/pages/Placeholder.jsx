import { DataPanel, EmptyState, OperationalPage, PageHeader } from '../ds/index.js';
import { usePageTitle } from './usePageTitle.js';

// Telas de negócio chegam na Etapa 6; por ora cada rota já existe com o seu cabeçalho.
export function Placeholder({ kicker = 'Operação de risco', title, description }) {
  usePageTitle(title);
  return (
    <OperationalPage>
      <PageHeader description={description} kicker={kicker} title={title} />
      <div style={{ marginTop: '1.5rem' }}>
        <DataPanel title={title}>
          <EmptyState description="Esta tela será construída na próxima etapa." title="Em construção" />
        </DataPanel>
      </div>
    </OperationalPage>
  );
}
