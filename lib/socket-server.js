'use strict'

const net = require('net')

const io = require('./socket.io-client')
const config = require('../config.js')

const log = msg => console.log('SOCKET-C: ' + msg)

const server = net.createServer((socket) => {
  // client connected
  log('Client connected!')

  // On data flowing
  socket.on('data', (data) => {
    log(data.toString())
    // Send incoming sensor data to socket io server
    io.emit('send_sensor_data', data.toString())
  })

  // On socket client has errors
  socket.on('error', (err) => {
    log('Caught flash policy server socket error: ')
    log(err.stack)
  })

  socket.pipe(socket)
})

// socket communication server listen
server.listen(config.socket_port, () => {
  log('Socket Communication Server is starting...')

  log('Waiting for connection...')
})