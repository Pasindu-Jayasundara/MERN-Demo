const cors = require('cors')
const express = require('express')
const messageRoutes = require('./routes/messageRoutes')
const errorHandler = require('./middleware/errorHandler')

const app = express()

app.use(cors({ origin: process.env.CLIENT_ORIGIN || 'http://localhost:5173' }))
app.use(express.json({ limit: '10kb' }))

app.get('/api/health', (req, res) => res.json({ status: 'ok' }))
app.use('/api/messages', messageRoutes)

app.use((req, res) => res.status(404).json({ message: 'Route not found.' }))

app.use(errorHandler)

module.exports = app
