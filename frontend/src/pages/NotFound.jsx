import { Link } from 'react-router';
import { OperationalPage, PageHeader } from '../ds/index.js';
import { usePageTitle } from './usePageTitle.js';

export function NotFound() {
  usePageTitle('Página não encontrada');
  return (
    <OperationalPage>
      <PageHeader
        description="O endereço não corresponde a nenhuma tela do console."
        kicker="Erro 404"
        title="Página não encontrada"
      />
      <p style={{ marginTop: '1.5rem' }}>
        <Link className="button-link" to="/">
          Voltar para o resumo
        </Link>
      </p>
    </OperationalPage>
  );
}
