'use strict'

const app = require('express')
const http = require('http').Server(app)

// Create socket.io server
const io = require('socket.io')(http)
const config = require('../config')

const log = msg => console.log('SOCKET-IO: ' + msg)

// when socket.io client connected
io.on('connection', (socket) => {
  log('io client connected!')

  socket.on('send_sensor_data', (msg) => {
    io.emit('sensor_update', msg)
  })
})

// http server listening for socket io
http.listen(config.socket_io_port, () => {
  log('Socket IO Server is starting...')

  log('Waiting for connection...')
})
