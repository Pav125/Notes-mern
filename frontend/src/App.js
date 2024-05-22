import './App.css';
import Login from './components/login/Login';
import NotesMain from './components/notes/NotesMain';
import Signup from './components/singup/Signup';
import { Route, Routes, useNavigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import { useEffect } from 'react';

function App() {
  const [cookies] = useCookies(['token']);
  const navigate = useNavigate();

  useEffect(() => {
    if (cookies.token) {
      navigate('/');
    }
  }, [cookies, navigate]);

  return (
    <div className="App">
      <Routes>
        {cookies.token && (<Route path='/' element={<NotesMain />} />)}
        {!cookies.token && (
          <>
            <Route path='/login' element={<Login />} />
            <Route path='/signup' element={<Signup />} />
          </>
        )}
      </Routes>
    </div>
  );
}

export default App;
