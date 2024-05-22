const mongoose = require('mongoose')

const NoteSchema = mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true
        },
        title: {
            type: String,
            required: true,
        },

        note: {
            type: String,
            required: true,
        },

        createdAt: {
            type: Date,
            default: Date.now,
        }
    }
)

const Note = mongoose.model('Note', NoteSchema)
module.exports = Note