// Nsights report view — cover + TOC rail + relatorio-prose article.
function ReportView({ activeTheme }) {
  const ns = window.NsightsDesignSystem_f2e488 || {};
  const Badge = ns.Badge || (({ variant, children }) => <span className={'ns-badge ns-badge-' + (variant || 'default')}>{children}</span>);
  const Icon = ns.Icon || (() => null);
  const label = (window.NS_REPORT_THEMES.find(([id]) => id === activeTheme) || [])[1] || 'Relatório';
  return (
    <main style={{ flex: 1, display: 'flex', gap: 40, padding: '40px 48px', boxSizing: 'border-box', minWidth: 0 }}>
      <div style={{ flex: 1, minWidth: 0, maxWidth: 780 }}>
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 20 }}>
          <div className="ns-cover-kicker" style={{ paddingTop: 6 }}>Relatório de diligência</div>
          <div style={{ display: 'flex', gap: 8, flexShrink: 0 }}>
            <button className="ns-btn ns-btn-secondary ns-btn-sm"><Icon name="download" size={13} strokeWidth={1.6} /> Exportar PDF</button>
            <button className="ns-btn ns-btn-secondary ns-btn-sm ns-btn-iconly" aria-label="Compartilhar"><Icon name="share-2" size={13} strokeWidth={1.6} /></button>
          </div>
        </div>
        <h1 className="ns-cover-title" style={{ margin: '10px 0 8px' }}>Meridiano Participações S.A.</h1>
        <p className="ns-cover-lead" style={{ margin: 0 }}>Verificação cadastral, societária e reputacional consolidada a partir de quatorze fontes.</p>
        <dl className="ns-cover-meta" style={{ display: 'flex', gap: 32, margin: '20px 0 0', paddingBottom: 18, borderBottom: '1px solid var(--ns-border)' }}>
          <div><dt>Data-base</dt><dd>4 jul 2026</dd></div>
          <div><dt>Escopo</dt><dd>Pessoa jurídica</dd></div>
          <div><dt>Fontes</dt><dd>14 consultadas</dd></div>
          <div><dt>Status</dt><dd><Badge variant="success">Concluído</Badge></dd></div>
        </dl>
        <article className="relatorio-prose">
          <h1>{label}</h1>
          <p className="has-dropcap">A verificação abrangeu os cadastros públicos e bases restritivas aplicáveis ao escopo contratado, com data-base de 4 de julho de 2026. Não foram identificadas ocorrências impeditivas na cadeia societária direta da entidade analisada.<sup className="cite">1</sup></p>
          <blockquote>Não foram identificados vínculos com pessoas expostas politicamente na cadeia societária direta.</blockquote>
          <h3>Síntese das consultas</h3>
          <table>
            <thead><tr><th>Cadastro</th><th>Órgão</th><th>Resultado</th></tr></thead>
            <tbody>
              <tr><td>CEIS</td><td>CGU</td><td>Nada consta</td></tr>
              <tr><td>CNEP</td><td>CGU</td><td>Nada consta</td></tr>
              <tr><td>OFAC SDN</td><td>Tesouro dos EUA</td><td>Nada consta</td></tr>
            </tbody>
          </table>
          <p>A holding controladora detém participação em duas outras sociedades ativas, ambas no mesmo setor de atuação, sem sobreposição de quadros diretivos.<sup className="cite">2</sup></p>
        </article>
      </div>
      <nav className="ns-toc" style={{ flexShrink: 0, position: 'sticky', top: 40, alignSelf: 'flex-start', paddingTop: 8 }}>
        <div className="ns-toc-label" style={{ marginBottom: 10 }}>Sumário</div>
        <a href="#" className="lvl-1 active">{label}</a>
        <a href="#" className="lvl-2">Síntese das consultas</a>
        <a href="#" className="lvl-3">Bases restritivas</a>
        <a href="#" className="lvl-1">Conclusão</a>
      </nav>
    </main>
  );
}

window.NsReportView = ReportView;
