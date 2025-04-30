import { useEffect, useState } from 'react';
import { User } from '../types';
export function useUsers() {
  const [users, setUsers] = useState<User[]>([]);
  const [selected, setSelected] = useState<User | null>(null);

  useEffect(() => {
    fetch('/data/users.json')
      .then(res => res.json())
      .then(setUsers);
  }, []);

  const drawUser = () => {
    if (users.length === 0) return;
    const index = Math.floor(Math.random() * users.length);
    const picked = users[index];
    setSelected(picked);
  };

  return { users, selectedUser: selected, drawUser };
}
