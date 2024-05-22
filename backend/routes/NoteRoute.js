const express = require('express');
const Note = require('../models/NoteModel');
const router = express.Router();
const { getNotes, updateNote, createNote, deleteNote } = require('../controllers/NoteController');
const authenticateToken = require('../Middlewares/AuthMiddleware');

// Get all notes for the authenticated user
router.get('/', authenticateToken, getNotes);

// Create a note for the authenticated user
router.post('/', authenticateToken, createNote);

// Update a note for the authenticated user
router.put('/:id', authenticateToken, updateNote);

// Delete a note for the authenticated user
router.delete('/:id', authenticateToken, deleteNote);

module.exports = router;
