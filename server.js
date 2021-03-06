require('dotenv').config()
const express = require('express');
const mongoose = require('mongoose')
var cors = require('cors')

const app = express();

app.use(cors())

mongoose.connect('mongodb://localhost/users', { useNewUrlParser: true, useUnifiedTopology: true})

const database = mongoose.connection

database.on('error', (error) => console.error(error))
database.once('open', () => console.log('db connected'))

app.use(express.json())

const usersRouter = require('./routes/users')
app.use('/users', usersRouter)

const port = 4000;

app.listen(port, () => console.log(`server has started on ${port}`))    