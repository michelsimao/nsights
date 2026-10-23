// Ponte entre o bundle IIFE do Design System e os módulos do app.
// O bundle não tem fonte ESM: ele registra os componentes em `window.RiskOpsUI`.
import './react-global.js';
import '@ds/_ds_bundle.js';

const ui = window.RiskOpsUI;
if (!ui) throw new Error('Design System não carregou: window.RiskOpsUI ausente.');

export const {
  Alert,
  AppShell,
  Button,
  DataPanel,
  EmptyState,
  Field,
  Icon,
  MobileNavigation,
  OperationalPage,
  PageHeader,
  Sidebar,
  Spinner,
  Topbar,
} = ui;
