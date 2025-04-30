import { useEffect, useRef, useState } from 'react';

export interface SessionLog {
    question: string;
    user: string;
    startTime: Date;
    endTime: Date;
    durationSeconds: number;
  }
  

interface Props {
  questionText: string;
  questionKeywords: string[];
  userName: string;
  onFinish: (session: SessionLog) => void;
}

export function SessionManager({ questionText, questionKeywords, userName, onFinish }: Props) {
  const [seconds, setSeconds] = useState(0);
  const [active, setActive] = useState(true);
  const startTimeRef = useRef<Date>(new Date());

  useEffect(() => {
    if (!active) return;

    const interval = setInterval(() => {
      setSeconds(prev => prev + 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [active]);

  const handleFinish = () => {
    setActive(false);
    const endTime = new Date();

    const durationSeconds = seconds;
    onFinish({
      question: questionText,
      user: userName,
      startTime: startTimeRef.current,
      endTime,
      durationSeconds
    });
  };

  return (
    <div
      style={{
        marginTop: '2rem',
        backgroundColor: '#fff',
        padding: '1.5rem',
        borderRadius: '10px',
        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
        minWidth: '300px',
        maxWidth: '700px',
        width: '100%',
        textAlign: 'left'
      }}
    >
      <h3 style={{ marginBottom: '1rem' }}>⏱ Oturum Aktif</h3>

      <p  style={{ margin: '1rem 0', color:'black' }}><strong >Kullanıcı:</strong> {userName}</p>

      <div style={{ margin: '1rem 0', color:'black' }}>
        <p><strong>Soru:</strong> {questionText}</p>

        {questionKeywords && questionKeywords.length > 0 && (
          <div style={{ marginTop: '0.5rem', display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
            {questionKeywords.map((keyword, index) => (
              <span
                key={index}
                style={{
                  backgroundColor: '#e0e7ff',
                  color: 'black',
                  padding: '0.3rem 0.6rem',
                  borderRadius: '999px',
                  fontSize: '0.85rem'
                }}
              >
                {keyword}
              </span>
            ))}
          </div>
        )}
      </div>

      <p style={{color:'black'}}> <strong>Süre:</strong> {Math.floor(seconds / 60)} dk {seconds % 60} sn</p>

      <button
        onClick={handleFinish}
        style={{
          marginTop: '1rem',
          backgroundColor: '#dc2626',
          color: '#fff',
          border: 'none',
          padding: '0.75rem 1.5rem',
          borderRadius: '6px',
          fontSize: '1rem',
          cursor: 'pointer'
        }}
      >
        🛑 Oturumu Bitir
      </button>
    </div>
  );
}
