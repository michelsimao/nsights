// Placeholder da etapa 1: confirma que a folha do DS (tokens, fontes, reset) está carregada.
// O bundle de componentes e o shell entram na etapa 5.
export default function App() {
  return (
    <main className="min-h-screen grid place-items-center p-6" style={{ background: 'var(--surface)' }}>
      <div
        className="w-full max-w-md p-6"
        style={{ background: 'var(--surface-raised)', border: '1px solid var(--border)', borderRadius: 8 }}
      >
        <p className="eyebrow">Nsights Risk Ops</p>
        <h1 style={{ fontSize: '1.5rem', fontWeight: 600, color: 'var(--ink)', marginTop: '.25rem' }}>
          Console de casos de risco
        </h1>
        <p style={{ color: 'var(--muted)', marginTop: '.5rem' }}>
          Infraestrutura no ar. Versão <span className="mono">0.1.0</span>.
        </p>
      </div>
    </main>
  );
}
