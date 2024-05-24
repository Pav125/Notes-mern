const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const cookieParser = require('cookie-parser')
const NoteRoute = require('./routes/NoteRoute')
const AuthRoute = require('./routes/AuthRoute')
require('dotenv').config()
const { MONGO_URL } = process.env
const PORT = process.env.PORT;

const cookiesMiddleware = require('universal-cookie-express');

const app = express()

app.use(
    cors({
        origin: ['https://mymemo.vercel.app','http://localhost:3001'], // 'https://mymemo.vercel.app','http://localhost:3000'
        methods: ['GET', 'POST', 'PUT', 'DELETE'],
        credentials: true,
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
        app.listen(PORT, () => {
            console.log('server is listening on 8080 || 4000')
        })
    })
    .catch((error) => {
        console.error(error);
        console.log('Connection failed !')
    })

