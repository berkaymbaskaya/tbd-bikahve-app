import { useState } from 'react';
import { useQuestions } from './hooks/useQuestions';
import { useUsers } from './hooks/useUsers';
import { SlotMachine } from './components/SlotMachine';
import { SlotMachineUser } from './components/SlotMachineUser';
import { SessionManager, SessionLog } from './components/SessionManager';
import { Question, User } from './types';
import { ResultsTable } from './components/ResultsTable';

function App() {
  const { questions, drawQuestion } = useQuestions();
  const { users, drawUser } = useUsers();

  const [selectedQuestion, setSelectedQuestion] = useState<Question | null>(null);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [sessions, setSessions] = useState<SessionLog[]>([]);
  const [sessionActive, setSessionActive] = useState(false);

  const handleQuestionSelect = (q: Question) => {
    setSelectedQuestion(q);
    setSessionActive(false);
  };

  const handleUserSelect = (u: User) => {
    setSelectedUser(u);
    if (selectedQuestion) {
      setSessionActive(true);
    }
  };

  const handleSessionFinish = (session: SessionLog) => {
    setSessions(prev => [...prev, session]);
    setSelectedQuestion(null);
    setSelectedUser(null);
    setSessionActive(false);
  };
  // const resetGame = () => {
  //   window.location.reload();
  // };

  const isGameFinished =
    questions.length === 0 &&
    !sessionActive &&
    selectedQuestion === null &&
    selectedUser === null;

  return (
    <div style={{ padding: '2rem', width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      {isGameFinished ? (
        <ResultsTable sessions={sessions} />
      ) : (
        <>
          <div style={{ display: 'flex', flexDirection: 'row', gap: 10 }}>
            <img src='https://www.tbd.org.tr/wp-content/uploads/2016/06/logo_110_yeni.png'></img>
            <h1>  | BiKahve </h1>
          </div>
          <p>Kalan Soru Sayısı: {questions.length}</p>

          {!sessionActive && (
            <>
              <SlotMachine
                questions={questions}
                onSelect={(q) => {
                  drawQuestion(q);
                  handleQuestionSelect(q);
                }}
                disabled={selectedQuestion !== null || sessionActive}
              />

              <SlotMachineUser users={users} onSelect={handleUserSelect} disabled={!selectedQuestion} />
            </>
          )}

          {selectedQuestion && selectedUser && sessionActive && (
            <SessionManager
              questionText={selectedQuestion.question}
              questionKeywords={selectedQuestion.keywords}
              userName={selectedUser.name}
              onFinish={handleSessionFinish}
            />
          )}
        </>
      )}
    </div>
  );

}

export default App;
