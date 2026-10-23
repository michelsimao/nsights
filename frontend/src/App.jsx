import { BrowserRouter, Route, Routes } from 'react-router';
import { AuthProvider } from './auth/AuthContext.jsx';
import { RequireAuth } from './auth/RequireAuth.jsx';
import { ToastProvider } from './components/toast.jsx';
import { Layout } from './layout/Layout.jsx';
import { CaseDetail } from './pages/CaseDetail.jsx';
import { CaseForm } from './pages/CaseForm.jsx';
import { Cases } from './pages/Cases.jsx';
import { Entities } from './pages/Entities.jsx';
import { EntityDetail } from './pages/EntityDetail.jsx';
import { EntityForm } from './pages/EntityForm.jsx';
import { Login } from './pages/Login.jsx';
import { NotFound } from './pages/NotFound.jsx';
import { Summary } from './pages/Summary.jsx';

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <ToastProvider>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route
              element={
                <RequireAuth>
                  <Layout />
                </RequireAuth>
              }
            >
              <Route index element={<Summary />} />
              <Route path="casos" element={<Cases />} />
              <Route path="casos/novo" element={<CaseForm key="novo" />} />
              <Route path="casos/:ref" element={<CaseDetail />} />
              <Route path="casos/:ref/editar" element={<CaseForm key="editar" />} />
              <Route path="entidades" element={<Entities />} />
              <Route path="entidades/nova" element={<EntityForm />} />
              <Route path="entidades/:id" element={<EntityDetail />} />
              <Route path="*" element={<NotFound />} />
            </Route>
          </Routes>
        </ToastProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}
