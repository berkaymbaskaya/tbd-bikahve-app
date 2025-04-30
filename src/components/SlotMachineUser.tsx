import { useRef, useState } from 'react';
import { User } from '../types';

interface Props {
  users: User[];
  onSelect: (u: User) => void;
}

export function SlotMachineUser({ users, onSelect }: Props) {
  const [spinning, setSpinning] = useState(false);
  const [displayedText, setDisplayedText] = useState<string>('Hazır');
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const spinSound = useRef<HTMLAudioElement>(new Audio('/sounds/spin.wav'));
  const winSound = useRef<HTMLAudioElement>(new Audio('/sounds/win.wav'));

  const handleStart = () => {
    if (users.length === 0 || spinning) return;

    setSpinning(true);

    spinSound.current.loop = true;
    spinSound.current.play();

    intervalRef.current = setInterval(() => {
      const randomIndex = Math.floor(Math.random() * users.length);
      setDisplayedText(users[randomIndex].name);
    }, 80);

    setTimeout(() => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;

        spinSound.current.pause();
        spinSound.current.currentTime = 0;

        const index = Math.floor(Math.random() * users.length);
        const selected = users[index];
        setDisplayedText(selected.name);
        setSelectedUser(selected);
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
      </div>

      <button onClick={handleStart} disabled={spinning} style={{ marginTop: '1rem' }}>
        👤 Kullanıcı Seç
      </button>
    </div>
  );
}
