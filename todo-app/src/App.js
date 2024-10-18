import logo from './logo.svg';
import './App.css';
import TodoList from './component/TodoList';
import TodoListPractice from './component/TodoListPractice';

function App() {
  return (
    <div className="App">
       <h1>TodoList app</h1>
       <TodoList></TodoList>
       <TodoListPractice/>
    </div>
  );
}

export default App;
