require('dotenv').config()

const app = require('./app')
const connectDatabase = require('./config/database')

const port = Number(process.env.PORT) || 5000

async function startServer() {
  try {
    await connectDatabase()
    app.listen(port, () => console.log(`API server listening on port ${port}`))
  } catch (error) {
    console.error('Failed to start the API server:', error.message)
    process.exit(1)
  }
}

startServer()
