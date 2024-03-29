require('@babel/register')({
    presets: ['@babel/preset-env', '@babel/preset-react'],
    plugins: ['@babel/plugin-transform-runtime']
})

const WebSocket = require('ws')
const { resolve } = require('path')
const { createElement } = require('react')
const { serializeReactElement, Tags } = require('./lib')

const wss = new WebSocket.Server({
    port: 3000,
    clientTracking: false,
})

wss.on('connection', socket => {
    socket.on('message', async message => {
        try {
            const { path, props } = JSON.parse(message)

            let Component = require(resolve(__dirname, 'example', path)).default
            if (Component.isAsync) {
                Component = await Component(props)
            }
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
