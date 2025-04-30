import { useEffect, useState } from 'react';
import { Question } from '../assets/types';

export function useQuestions() {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [selected, setSelected] = useState<Question | null>(null);

  useEffect(() => {
    fetch('/data/questions.json')
      .then(res => res.json())
      .then(setQuestions);
  }, []);

  const drawQuestion = () => {
    if (questions.length === 0) return;
    const index = Math.floor(Math.random() * questions.length);
    const picked = questions[index];
    const updated = [...questions];
    updated.splice(index, 1);
    setQuestions(updated);
    setSelected(picked);
  };

  return {
    questions,
    selectedQuestion: selected,
    drawQuestion,
    remainingCount: questions.length 
  };
}

