'use client';

export default function Error({ error, reset }) {
  return (
    <div style={{ padding: '2rem', textAlign: 'center', color: '#f0f4ff', background: '#05080f', minHeight: '100vh' }}>
      <h2>Algo deu errado</h2>
      <button onClick={reset} style={{ marginTop: '1rem', padding: '0.5rem 1rem', background: '#a78bfa', border: 'none', borderRadius: '8px', color: '#fff', cursor: 'pointer' }}>
        Tentar novamente
      </button>
    </div>
  );
}
