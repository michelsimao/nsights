// Ponte entre o bundle IIFE do Design System e os módulos do app.
// O bundle não tem fonte ESM: ele registra os componentes em `window.RiskOpsUI`.
import './react-global.js';
import '@ds/_ds_bundle.js';

const ui = window.RiskOpsUI;
if (!ui) throw new Error('Design System não carregou: window.RiskOpsUI ausente.');

export const {
  Alert,
  AppShell,
  Badge,
  BarList,
  Breadcrumb,
  Button,
  DataPanel,
  EmptyState,
  Fact,
  Facts,
  Field,
  Icon,
  InlineEmpty,
  MetricGrid,
  MetricTile,
  MobileNavigation,
  Modal,
  OperationalPage,
  PageHeader,
  Pagination,
  Panel,
  ResultRow,
  ResultRows,
  Segmented,
  Sidebar,
  Skeleton,
  Spinner,
  StatusPill,
  Table,
  TableScroll,
  Toast,
  ToastStack,
  Toolbar,
  Topbar,
  WorkspaceFilter,
  WorkspaceSearch,
} = ui;
