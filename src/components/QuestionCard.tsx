import { Question } from "../types";
export function QuestionCard({ question }: { question: Question }) {
  return (
    <div className="card">
      <h3>Soru</h3>
      <p>{question.question}</p>

      <div style={{ marginTop: '1rem', display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
        {question.keywords.map((keyword, index) => (
          <span
            key={index}
            style={{
              backgroundColor: '#e0e7ff',
              color: '#1e3a8a',
              padding: '0.3rem 0.6rem',
              borderRadius: '999px',
              fontSize: '0.875rem'
            }}
          >
            {keyword}
          </span>
        ))}
      </div>
    </div>
  );
}
