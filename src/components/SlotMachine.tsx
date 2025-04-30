import { useRef, useState } from 'react';
import { Question } from '../types';

interface Props {
  questions: Question[];
  onSelect: (q: Question) => void;
}

export function SlotMachine({ questions, onSelect }: Props) {
  const [spinning, setSpinning] = useState(false);
  const [displayedText, setDisplayedText] = useState<string>('Hazır');
  const [selectedQuestion, setSelectedQuestion] = useState<Question | null>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const spinSound = useRef<HTMLAudioElement>(new Audio('/sounds/spin.wav'));
  const winSound = useRef<HTMLAudioElement>(new Audio('/sounds/win.wav'));

  const handleStart = () => {
    if (questions.length === 0 || spinning) return;

    setSpinning(true);

    spinSound.current.loop = true;
    spinSound.current.play();

    intervalRef.current = setInterval(() => {
      const randomIndex = Math.floor(Math.random() * questions.length);
      setDisplayedText(questions[randomIndex].question);
    }, 70);

    setTimeout(() => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;

        spinSound.current.pause();
        spinSound.current.currentTime = 0;

        const index = Math.floor(Math.random() * questions.length);
        const selected = questions[index];
        setDisplayedText(selected.question);
        setSelectedQuestion(selected);
        onSelect(selected);

        winSound.current.play();
        setSpinning(false);
      }
    }, 3000);
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '2rem' }}>
      <div
        style={{
          fontSize: '1.25rem',
          padding: '1rem',
          border: '2px solid #007bff',
          borderRadius: '10px',
          height: '100px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          background: '#fff',
          minWidth: '300px',
          margin: '0 auto',
          boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
          color: 'black'
        }}
      >
        {displayedText}

      {selectedQuestion?.keywords && (
        <div style={{ marginTop: '1rem', display: 'flex', justifyContent: 'center', gap: '0.5rem', flexWrap: 'wrap' }}>
          {selectedQuestion.keywords.map((k, i) => (
            <span
              key={i}
              style={{
                backgroundColor: '#e0e7ff',
                color: '#1e3a8a',
                padding: '0.3rem 0.6rem',
                borderRadius: '999px',
                fontSize: '0.85rem'
              }}
            >
              {k}
            </span>
          ))}
        </div>
      )}
      </div>

      <button onClick={handleStart} disabled={spinning} style={{ marginTop: '1rem' }}>
        🎰 Soruyu Çek
      </button>

    </div>
  );
}
