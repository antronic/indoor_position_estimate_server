'use strict'

const app = require('express')
const http = require('http').Server(app)

// Create socket.io server
const config = require('../config')

const log = msg => console.log('WEB: ' + msg)

app.get('/script', (req, res) => {
  res.sendFile(__dirname + '/web/script.js')
})

app.get('/style', (req, res) => {
  res.sendFile(__dirname + '/web/style.css')
})

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/web/index.html')
})

// http server listening for socket io
http.listen(config.web_server_port, () => {
  log('Web Server is starting...')
})
