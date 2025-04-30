import { SessionLog } from './SessionManager';

export function ResultsTable({ sessions }: { sessions: SessionLog[] }) {
  const handleReset = () => {
    window.location.reload();
  };
  function formatDuration(seconds: number) {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins} dk ${secs} sn`;
  }
  
  return (
    <div className="card" style={{ marginTop: '2rem', width: '100%', maxWidth: '700px' }}>
      <h2>📊 Sonuçlar</h2>
      <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '1rem' }}>
        <thead>
          <tr style={{ background: '#f0f0f0', color:'black' }}>
            <th style={{ padding: '8px', border: '1px solid #ccc' }}>Soru</th>
            <th style={{ padding: '8px', border: '1px solid #ccc' }}>Kullanıcı</th>
            <th style={{ padding: '8px', border: '1px solid #ccc' }}>Süre (dk)</th>
          </tr>
        </thead>
        <tbody>
          {sessions.map((s, i) => (
            <tr key={i}>
              <td style={{ padding: '8px', border: '1px solid #ccc' }}>{s.question}</td>
              <td style={{ padding: '8px', border: '1px solid #ccc' }}>{s.user}</td>
              <td style={{ padding: '8px', border: '1px solid #ccc' }}>{formatDuration(s.durationSeconds)}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <button
        onClick={handleReset}
        style={{
          marginTop: '2rem',
          backgroundColor: '#10b981',
          color: 'white',
          border: 'none',
          padding: '0.75rem 1.5rem',
          borderRadius: '6px',
          fontSize: '1rem',
          cursor: 'pointer'
        }}
      >
        🔄 Oyunu Baştan Başlat
      </button>
    </div>
  );
}
