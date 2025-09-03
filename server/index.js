import express from 'express'
import logger from 'morgan'
import {Server} from 'socket.io' 
import {createServer} from 'node:http'

const PORT = process.env.PORT ?? 1234

const app = express()
const server = createServer(app)
const io = new Server(server, {
  connectionStateRecovery:{ }
})

io.on('connection', (socket) => {
  console.log('A user has connected!!')
  socket.on('disconnect',() => {
    console.log('An user has disconnected :(')
  })

  socket.on('chat message', (msg) => {
    io.emit('chat message',msg)
  })
})

app.use(logger('dev'))
app.get('/', (req, res) => {
  res.sendFile(process.cwd() + '/client/index.html')
})

server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`)
})
