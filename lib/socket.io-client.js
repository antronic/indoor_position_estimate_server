'use strict'

const io = require('socket.io-client')

const config = require('../config.js')
const socket = io('ws://0.0.0.0:' + config.socket_io_port)

// socket io client emit function wrapper
exports.emit = (channel, msg) => socket.emit(channel, msg)