import { useState } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router';
import { useAuth } from '../auth/AuthContext.jsx';
import { AppShell, MobileNavigation, Sidebar, Topbar } from '../ds/index.js';
import { NAV_GROUPS, NEW_CASE_HREF, ROLE_LABELS, initials, withActive } from './navigation.js';

const SIDEBAR_KEY = 'riskops.sidebar-expanded';

function readExpanded() {
  try {
    return localStorage.getItem(SIDEBAR_KEY) !== 'false';
  } catch {
    return true;
  }
}

/** Moldura das telas autenticadas: Sidebar (desktop), Topbar com menu móvel e o conteúdo. */
export function Layout() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const [expanded, setExpanded] = useState(readExpanded);

  const groups = withActive(NAV_GROUPS, pathname);
  const shared = {
    accountItems: [],
    groups,
    newAnalysisHref: NEW_CASE_HREF,
    newAnalysisLabel: 'Novo caso',
    onLogout: logout,
    onNavigate: (href) => navigate(href),
  };

  const toggle = () => {
    setExpanded((value) => {
      try {
        localStorage.setItem(SIDEBAR_KEY, String(!value));
      } catch {
        /* preferência só não persiste */
      }
      return !value;
    });
  };

  return (
    <AppShell
      sidebar={
        <Sidebar
          {...shared}
          brandAriaLabel="n-sights Risk Ops: resumo"
          brandTooltip="Resumo"
          expanded={expanded}
          onToggle={toggle}
        />
      }
      topbar={
        <Topbar
          accountLabel={ROLE_LABELS[user.role] ?? user.role}
          accountName={user.name}
          contextName="Casos de risco"
          initials={initials(user.name)}
          initialsLabel={`Conectado como ${user.name}`}
        >
          {/* O <details> do menu móvel não fecha sozinho ao navegar: a key o recria a cada rota. */}
          <MobileNavigation key={pathname} {...shared} />
        </Topbar>
      }
    >
      <Outlet />
    </AppShell>
  );
}
