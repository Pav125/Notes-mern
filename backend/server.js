const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const cookieParser = require('cookie-parser')
const NoteRoute = require('./routes/NoteRoute')
const AuthRoute = require('./routes/AuthRoute')
require('dotenv').config()
const { MONGO_URL, PORT } = process.env

const cookiesMiddleware = require('universal-cookie-express');

const app = express()

app.use(
    cors({
        origin: ['http://localhost:3000','https://mymemo.vercel.app/'],
        methods: ['GET', 'POST', 'PUT', 'DELETE'],
        credentials: true
    })
)

app.use(express.json())
app.use(express.urlencoded({extended : false}))
app.use(cookieParser())
app.use(cookiesMiddleware())

// routes
app.use('/api/notes', NoteRoute)
app.use('/api/auth', AuthRoute)

app.get('/',(req,res)=>{
    res.send('Hello from server API')
})


mongoose.connect(
    MONGO_URL,
    // { useNewUrlParser: true, useUnifiedTopology: true }
)
    .then(() => {
        console.log('Connected to Database !')
        app.listen(PORT || 8080, () => {
            console.log('server is listening on 8080')
        })
    })
    .catch((error) => {
        console.error(error);
        console.log('Connection failed !')
    })

