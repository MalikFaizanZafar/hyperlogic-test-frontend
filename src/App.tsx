import './App.css';
import { ToastContainer } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';
import TodoContainer from './components/Todolist';

function App() {


  return (
    <div className=" min-h-screen bg-gradient-to-r from-cyan-500 to-blue-500 gap-y-4 flex flex-col justify-center  items-center">
       <TodoContainer/>
       <ToastContainer />
    </div>
  );
}

export default App;
