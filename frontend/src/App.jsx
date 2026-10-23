import { BrowserRouter, Route, Routes } from 'react-router';
import { AuthProvider } from './auth/AuthContext.jsx';
import { RequireAuth } from './auth/RequireAuth.jsx';
import { Layout } from './layout/Layout.jsx';
import { Login } from './pages/Login.jsx';
import { NotFound } from './pages/NotFound.jsx';
import { Placeholder } from './pages/Placeholder.jsx';

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route
            element={
              <RequireAuth>
                <Layout />
              </RequireAuth>
            }
          >
            <Route
              index
              element={<Placeholder title="Resumo" description="Casos por status, nível de risco e responsável." />}
            />
            <Route
              path="casos"
              element={<Placeholder title="Casos" description="Fila de casos com busca, filtros e paginação." />}
            />
            <Route
              path="casos/novo"
              element={<Placeholder title="Novo caso" description="Abertura de um caso para uma entidade cadastrada." />}
            />
            <Route
              path="casos/:ref"
              element={<Placeholder title="Caso" description="Detalhe, timeline, notas e mudança de status." />}
            />
            <Route
              path="entidades"
              element={<Placeholder title="Entidades" description="Pessoas físicas e jurídicas sob análise." />}
            />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}
