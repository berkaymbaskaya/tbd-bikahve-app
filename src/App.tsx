import { useQuestions } from './hooks/useQuestions';
import { useUsers } from './hooks/useUsers';
import { SlotMachine } from './components/SlotMachine';
import { SlotMachineUser } from './components/SlotMachineUser';

function App() {
  const { questions, drawQuestion } = useQuestions();
  const { users, drawUser } = useUsers();

  return (
    <div style={{ padding: '2rem',width:'100%', display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center'  }}>
      <h1>🎡 Slot Makinesi Oyun</h1>
      <p>Kalan Soru Sayısı: {questions.length}</p>

      <SlotMachine questions={questions} onSelect={drawQuestion} />

      {/* {selectedQuestion && <QuestionCard question={selectedQuestion} />} */}

      <SlotMachineUser users={users} onSelect={drawUser} />

      {/* {selectedUser && <SelectedUser user={selectedUser} />} */}
    </div>
  );
}

export default App;
