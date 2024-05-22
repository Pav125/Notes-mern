import Notes from './Notes';
import NoteList from './NoteList'
import { useEffect, useState, useMemo } from 'react';
import axios from 'axios'
import { useCookies } from 'react-cookie'
import { useNavigate } from 'react-router-dom';
import Nav from '../nav/Nav';

function NotesMain() {
  const navigate = useNavigate()
  const [cookies] = useCookies([])

  useEffect(
    () => {
      if (!cookies.token) {
        navigate('/login')
      }
    }, [cookies, navigate]
  )
  const [user, updateUser] = useState('')
  const api = useMemo(() => axios.create({ baseURL: 'http://localhost:8080/api/notes' }), []);

  const [notes, setNotes] = useState([])

  useEffect(
    () => {
      const fetchNotes = async () => {
        try {
          const { data } = await api.get('/', { withCredentials: true })
          updateUser(data.user.username)
          setNotes(data.notes)
          console.log(data)
          console.log(cookies.token)
        } catch (error) {
          console.error('Error fetching notes: ', error)
        }
      }
      fetchNotes()
    }, [api, cookies]
  )

  const deleteNote = async (id) => {
    try {
      await api.delete(`/${id}`, { withCredentials: true })
      setNotes(notes.filter((note) => note._id !== id))
      // console.log(data)
    } catch (error) {
      console.error('Error deleting note: ', error)
    }
  }

  const updateNote = async (id, updatedTitle, updatedNote) => {
    // const updNote = notes.map((note) => {
    //   return note.id === id ? { ...note, title: updatedTitle, note: updatedNote } : note
    // })
    // setNotes(updNote)
    try {
      const { data } = await api.put(`/${id}`, { title: updatedTitle, note: updatedNote }, { withCredentials: true })
      setNotes(notes.map((note) => note._id === id ? data : note))
      console.log(data)
    } catch (error) {
      console.error('Error updating note: ', error)
    }
  }

  const addNote = async (newdata) => {
    // const id = notes.reduce((max,note)=>(max<note.id)?note.id:max)
    // setNotes([...notes, { ...newdata, id: id + 1 }])
    try {
      const { data } = await api.post('/', newdata, { withCredentials: true })
      setNotes([...notes, data])
      console.log(data)
    } catch (error) {
      console.error('Error adding note: ', error)
    }
  }
  return (
    <div className="App">
      {
        cookies.token && (
          <>
            <Nav />
            <Notes addNote={addNote} user={user} />
            <NoteList notes={notes} updateNote={updateNote} deleteNote={deleteNote} />
          </>
        )
      }
      {!cookies.token && (
        <div>
          {/* Display a message indicating no access without a cookie */}
          <p>You are not authorized to access this page. Please login.</p>
        </div>
      )}
    </div>
  );
}

export default NotesMain;
