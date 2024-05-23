const Note = require('../models/NoteModel')

// Get all notes for the authenticated user
const getNotes = async (req, res) => {
    try {
        const notes = await Note.find({ user: req.user._id }).sort({ createdAt: -1 });
        res.status(200).json({ notes, user: req.user })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

// Create a note for the authenticated user
const createNote = async (req, res) => {
    try {
        const note = await Note.create(
            {
                ...req.body,
                user: req.user._id,
            }
        )
        res.status(201).json(note)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

// Update a note for the authenticated user
const updateNote = async (req, res) => {
    try {
        const { id } = req.params
        const updatedNote = await Note.findOneAndUpdate(
            { _id: id, user: req.user.id },
            req.body,
            { new: true, runValidators: true }
        )
        if (!updatedNote) {
            res.status(404).json({ error: 'Note not found' })
        }
        res.status(200).json(updatedNote)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

// Delete a note for the authenticated user
const deleteNote = async (req, res) => {
    try {
        const { id } = req.params
        const deletedNote = await Note.findOneAndDelete({
            _id: id,
            user: req.user._id
        })
        if (!deleteNote) {
            res.status(404).json({ error: 'Note not found' })
        }
        res.status(200).json({ message: 'Succesfully deleted' })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

module.exports = {
    getNotes,
    createNote,
    updateNote,
    deleteNote,
}