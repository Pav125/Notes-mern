import './App.css';
import Login from './components/login/Login';
import NotesMain from './components/notes/NotesMain';
import { Route, Routes } from 'react-router-dom'
import Signup from './components/singup/Signup';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='/Home' element={<NotesMain />} />
        <Route path='/' element={<Login />} />
        <Route path='/signup' element={<Signup />} />
      </Routes>
    </div>
  );
}

export default App;
