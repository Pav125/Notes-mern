import './App.css';
import Login from './components/login/Login';
import NotesMain from './components/notes/NotesMain';
import Signup from './components/signup/Signup';
import { Route, Routes, useNavigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import { useEffect } from 'react';

function App() {
  const [cookies] = useCookies(['token']);
  const navigate = useNavigate();

  useEffect(() => {
    if (cookies.token && cookies.token !== undefined) {
      navigate('/');
    }
  }, [cookies, navigate]);

  return (
    <div className="App">
      <Routes>
        {(cookies.token && cookies.token !== undefined) ? (
          <>
            <Route path='/' element={<NotesMain />} />
            <Route path='*' element={<Login />} />
          </>
        ) : (
          <>
            <Route path='/login' element={<Login />} />
            <Route path='/signup' element={<Signup />} />
            <Route path='*' element={<Login />} />
          </>
        )}
      </Routes>
    </div>
  );
}

export default App;
