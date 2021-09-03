
const express = require('express')
const cors = require('cors')

const app = express()

app.use(express.json());

app.use(cors())

const mongoose = require('mongoose')

mongoose.connect("mongodb://mongo:27017/bike-app", { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true })
const db = mongoose.connection
db.on('error', (error) => console.error(error))
db.once('open', () => console.log('Connected to db'))

app.use(express.json())

app.get('/health', (req, res) => {
    res.send("It Works!")
})

const ridersRoutes = require('./routes/riders')
app.use('/riders', ridersRoutes)

const trainingPlansRoutes = require('./routes/trainingPlans')
app.use('/trainingplans', trainingPlansRoutes)

const authRoutes = require('./routes/auth')
app.use('/auth', authRoutes)

// const PORT = process.env.PORT || 5000

app.listen(5000, () => console.log('Server started'))
