import { Question } from "../assets/types";
export function QuestionCard({ question }: { question: Question }) {
  return (
    <div>
      <h3>Soru:</h3>
      <p>{question.question}</p>
      <small>Anahtar Kelimeler: {question.keywords.join(', ')}</small>
    </div>
  );
}
