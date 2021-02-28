require('babel-register')({
    presets: ['env', 'react'],
})

const WebSocket = require('ws')
const express = require('express')
const http = require('http')
const { resolve } = require('path')
const { createElement } = require('react')
const { renderToString } = require('react-dom/server')

const server = http.createServer(express())

server.listen(3000, () => console.log('Started'))

const wss = new WebSocket.Server({
    server,
    clientTracking: false,
})

const createChildren = (children) => {
    if (!children) {
        return []
    }

    if (typeof children === 'string' || typeof children === 'number') {
        return [children]
    }

    if (!Array.isArray(children)) {
        children = [children]
    }

    return children.map(child => {
        if (typeof child === 'string' || typeof child === 'number') {
            return child
        }

        const children = child.props && child.props.children

        return createElement(child.type, child.props, ...createChildren(children))
    })
}

wss.on('connection', socket => {
    socket.on('message', message => {
        try {
            const { path, props, children } = JSON.parse(message)

            const Component = require(resolve(__dirname, 'example', path)).default
            const element = createElement(Component, props, ...createChildren(children))

            const html = renderToString(element)

            socket.send(JSON.stringify({ path, html }))
        } catch (err) {
            console.log(err)
        }
    })
})
