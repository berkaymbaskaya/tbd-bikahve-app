import { useQuestions } from './hooks/useQuestions';
import { useUsers } from './hooks/useUsers';
import { QuestionCard } from './components/QuestionCard';
import { SelectedUser } from './components/SelectedUser';

function App() {
  const { selectedQuestion, drawQuestion, remainingCount } = useQuestions();
  const { selectedUser, drawUser } = useUsers();

  return (
    <div style={{ padding: '2rem' }}>
      <h1>🎡 Çarkıfelek Oyunu</h1>
      <p>Kalan Soru Sayısı: <strong>{remainingCount}</strong></p>
      <button onClick={drawQuestion}>1. Çevir: Soru Seç</button>
      {selectedQuestion && <QuestionCard question={selectedQuestion} />}

      <button onClick={drawUser} style={{ marginTop: '2rem' }}>
        2. Çevir: Kullanıcı Seç
      </button>
      {selectedUser && <SelectedUser user={selectedUser} />}
    </div>
  );
}

export default App;
