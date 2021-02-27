require('babel-register')({
    presets: ['env', 'react'],
})

const WebSocket = require('ws')
const express = require('express')
const http = require('http')
const { renderToString } = require('react-dom/server')

const server = http.createServer(express())

server.listen(3000, () => console.log('Started'))

const wss = new WebSocket.Server({
    server,
    clientTracking: false
})

wss.on('connection', socket => {
    socket.on('message', message => {
        try {
            const { path, props } = JSON.parse(message)

            const Component = require(`./example/${path}`).default
            const html = renderToString(Component(props))

            socket.send(JSON.stringify({ path, html }))
        } catch (err) {
            console.log(err)
        }
    })
})
