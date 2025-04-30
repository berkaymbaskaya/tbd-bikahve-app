import { useEffect, useState } from 'react';
import { Question } from '../types';
export function useQuestions() {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [selected, setSelected] = useState<Question | null>(null);

  useEffect(() => {
    fetch('/data/questions.json')
      .then(res => res.json())
      .then(setQuestions);
  }, []);

  const drawQuestion = (picked: Question) => {
    const updated = questions.filter(q => q.question !== picked.question);
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
