require('@babel/register')({
    presets: ['@babel/preset-env', '@babel/preset-react'],
})

const WebSocket = require('ws')
const express = require('express')
const http = require('http')
const { resolve } = require('path')
const { createElement } = require('react')
const { serializeReactElement, Tags } = require('./lib')

const server = http.createServer(express())

server.listen(3000, () => console.log('Started'))

const wss = new WebSocket.Server({
    server,
    clientTracking: false,
})

wss.on('connection', socket => {
    socket.on('message', message => {
        try {
            const { path, props } = JSON.parse(message)

            const Component = require(resolve(__dirname, 'example', path)).default

            const element = createElement(Component, props, Tags.CHILDREN)

            socket.send(JSON.stringify({
                path,
                element: serializeReactElement(element)
            }))
        } catch (err) {
            console.log(err)
        }
    })
})
