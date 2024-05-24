import './App.css';
import Login from './components/login/Login';
import NotesMain from './components/notes/NotesMain';
import Signup from './components/signup/Signup';
import { Route, Routes, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

function App() {

  const token = localStorage.getItem('authToken')
  const navigate = useNavigate();

  useEffect(() => {
    if (token && token !== undefined) {
      navigate('/');
    }
  }, [token, navigate]);

  return (
    <div className="App">
      <Routes>
        {(token && token !== undefined) ? (
          <>
            <Route path='/' element={<NotesMain />} />
            {/* <Route path='*' element={<Login />} /> */}
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
