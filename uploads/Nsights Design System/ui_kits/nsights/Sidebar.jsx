// Nsights app sidebar — report themes navigation.
const REPORT_THEMES = [
  ['identidade', 'Identidade & cadastro', 'fingerprint'],
  ['societario', 'Estrutura societária', 'building-2'],
  ['sancoes_compliance', 'Sanções & Compliance', 'shield-check'],
  ['judicial', 'Processos judiciais', 'scale'],
  ['credito_financeiro', 'Crédito & situação financeira', 'banknote'],
  ['patrimonio', 'Patrimônio & bens', 'landmark'],
  ['propriedade_intelectual', 'Marcas e patentes', 'copyright'],
  ['trabalhista', 'Funcionários & vínculos', 'users'],
  ['falencias', 'Falências e recuperação', 'trending-down'],
  ['certidoes', 'Certidões negativas', 'file-check'],
  ['regulatorio', 'Atuação regulatória/setorial', 'gavel'],
  ['midia_politico', 'Mídia & exposição política', 'newspaper'],
  ['presenca_digital', 'Presença digital', 'globe'],
  ['pesquisa_aberta', 'Pesquisa aprofundada', 'search'],
];

function Sidebar({ active, onSelect, dark, onToggleTheme }) {
  const ns = window.NsightsDesignSystem_f2e488 || {};
  const Icon = ns.Icon || (() => null);
  return (
    <aside style={{
      width: 248, flexShrink: 0, background: 'var(--ns-bg-sidebar)',
      borderRight: '1px solid var(--ns-border)', display: 'flex', flexDirection: 'column',
      height: '100vh', boxSizing: 'border-box', position: 'sticky', top: 0,
    }}>
      <div style={{ padding: '18px 18px 14px', borderBottom: '1px solid var(--ns-border-subtle)' }}>
        <img src={dark ? ((window.__resources || {}).logoDark || '../../assets/logo_dark.png') : ((window.__resources || {}).logoLight || '../../assets/logo_light.png')} alt="Nsights" style={{ height: 22, display: 'block' }} />
      </div>
      <nav style={{ flex: 1, overflowY: 'auto', padding: '12px 10px' }}>
        <div className="ns-label-caps" style={{ padding: '0 8px 8px' }}>Fontes do relatório</div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          {REPORT_THEMES.map(([id, label, icon]) => (
            <button key={id} onClick={() => onSelect(id)} style={{
              display: 'flex', alignItems: 'center', gap: 9,
              textAlign: 'left', fontFamily: 'var(--ns-font-sans)', fontSize: 12.5,
              fontWeight: active === id ? 600 : 400,
              color: active === id ? 'var(--ns-accent-primary)' : 'var(--ns-text-secondary)',
              background: active === id ? 'var(--ns-bg-active)' : 'transparent',
              border: 'none', borderRadius: 6, padding: '7px 8px', cursor: 'pointer',
            }}>
              <Icon name={icon} size={14} strokeWidth={1.6} style={{ color: active === id ? 'var(--ns-accent-primary)' : 'var(--ns-text-muted)' }} />
              {label}
            </button>
          ))}
        </div>
      </nav>
      <div style={{ padding: 12, borderTop: '1px solid var(--ns-border-subtle)' }}>
        <button className="ns-btn ns-btn-secondary ns-btn-sm" style={{ width: '100%' }} onClick={onToggleTheme}>
          <Icon name={dark ? 'sun' : 'moon'} size={13} strokeWidth={1.6} />
          {dark ? 'Tema claro' : 'Tema escuro'}
        </button>
      </div>
    </aside>
  );
}

window.NsSidebar = Sidebar;
window.NS_REPORT_THEMES = REPORT_THEMES;
