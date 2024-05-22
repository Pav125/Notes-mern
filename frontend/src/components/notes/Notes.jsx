import { useState } from "react";

const Notes = ({ addNote, user }) => {

    const [title, setTitle] = useState('');
    const [note, setNote] = useState('')

    const handleSubmit = (e) => {
        e.preventDefault();
        if (title.trim() !== '' && note.trim() !== '') {
            addNote({ title: title, note: note });
            setTitle('');
            setNote('');
        }
    };

    return (
        <>
            <h1 className="mt-3" >Welcome {user}</h1>
            <div className="container mt-3 justify-content-center align-item mb-5">
                <h2 className="text-center">Add a new note</h2>
                <form className="form p-3" onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="title" className="form-label">Title</label>
                        <input
                            type="text"
                            id="title"
                            name="title"
                            className="form-control"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="note" className="form-label">Note</label>
                        <textarea
                            name="note"
                            id="note"
                            rows="5"
                            className="form-control"
                            value={note}
                            onChange={(e) => setNote(e.target.value)}
                        />
                    </div>
                    <button type="submit" className="btn btn-primary">Add Note</button>
                </form>

            </div>

        </>
    )
}

export default Notes