import Notes from './Notes';
import NoteList from './NoteList';
import { useEffect, useState, useMemo } from 'react';
import axios from 'axios';
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';
import Nav from '../nav/Nav';
import 'bootstrap/dist/css/bootstrap.min.css';

function NotesMain() {
    const navigate = useNavigate();
    const [cookies] = useCookies([]);

    const [user, updateUser] = useState('');
    const api = useMemo(() => axios.create({ baseURL: 'http://localhost:8080/api/notes' }), []);

    const [notes, setNotes] = useState([]);

    useEffect(() => {
        const fetchNotes = async () => {
            try {
                const { data } = await api.get('/', { withCredentials: true });
                updateUser(data.user.username);
                setNotes(data.notes);
                console.log(data);
                console.log(cookies.token);
            } catch (error) {
                console.error('Error fetching notes: ', error);
            }
        };
        fetchNotes();
    }, [api, cookies]);

    const deleteNote = async (id) => {
        try {
            await api.delete(`/${id}`, { withCredentials: true });
            setNotes(notes.filter((note) => note._id !== id));
        } catch (error) {
            console.error('Error deleting note: ', error);
        }
    };

    const updateNote = async (id, updatedTitle, updatedNote) => {
        try {
            const { data } = await api.put(`/${id}`, { title: updatedTitle, note: updatedNote }, { withCredentials: true });
            setNotes(notes.map((note) => note._id === id ? data : note));
            console.log(data);
        } catch (error) {
            console.error('Error updating note: ', error);
        }
    };

    const addNote = async (newdata) => {
        try {
            const { data } = await api.post('/', newdata, { withCredentials: true });
            setNotes([...notes, data]);
            console.log(data);
        } catch (error) {
            console.error('Error adding note: ', error);
        }
    };

    return (
        <div>
            {cookies.token && (
                <>
                    <Nav />
                    <div className="container mt-5">
                        <div className="row">
                            <div className="col-lg-4 col-md-6 mb-4">
                                <Notes addNote={addNote} user={user} />
                            </div>
                            <div className="col-lg-8 col-md-6">
                                <NoteList notes={notes} updateNote={updateNote} deleteNote={deleteNote} />
                            </div>
                        </div>
                    </div>
                </>
            )}
            {!cookies.token && (
                <div>
                    <p>You are not authorized to access this page. Please login.</p>
                </div>
            )}
        </div>
    );
}

export default NotesMain;
