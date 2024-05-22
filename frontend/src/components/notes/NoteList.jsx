import { useState } from "react";

const NoteList = ({ notes, updateNote, deleteNote }) => {
    const [editedTitle, setEditedTitle] = useState('');
    const [editedNote, setEditedNote] = useState('')
    const [editNoteID, setEditNoteID] = useState(null);

    const handleEdit = (id) => {
        setEditNoteID(id);
        const noteToEdit = notes.find((note) => note._id === id)
        setEditedTitle(noteToEdit.title);
        setEditedNote(noteToEdit.note);
    }

    const handleUpdate = (id) => {

        updateNote(id, editedTitle, editedNote);
        setEditNoteID(null);

    }

    const handleDelete = (id) => {
        deleteNote(id);
    }
    return (
        <div>
            <h2>Saved Notes :</h2>
            {notes.map((note) => (
                <div key={note._id} className="card mb-3">
                    <div className="card-body">
                        {editNoteID === note._id ? (
                            <>
                                <label htmlFor="title">Title</label>
                                <input
                                    type="text"
                                    id="title"
                                    value={editedTitle}
                                    onChange={(e) => setEditedTitle(e.target.value)}
                                    className="form-control"
                                />
                                <label htmlFor="note">Note</label>
                                <textarea
                                    rows="3"
                                    id="note"
                                    value={editedNote}
                                    onChange={(e) => setEditedNote(e.target.value)}
                                    className="form-control mb-2"
                                />
                                <button onClick={() => handleUpdate(note._id)} className="btn btn-secondary" >Update</button>
                                <button onClick={() => setEditNoteID(null)} className="btn btn-secondary">cancel</button>
                            </>
                        ) : (
                            <>

                                <h5 className="card-title">{note.title}</h5>
                                <p className="card-text">{note.note}</p>
                                <button onClick={() => handleEdit(note._id)} className="btn btn-secondary ">Edit</button>
                                <button onClick={() => handleDelete(note._id)} className="btn btn-danger ms-3" >Delete</button>
                            </>
                        )}
                    </div>
                </div>
            ))}
        </div>
    );
}

export default NoteList;
