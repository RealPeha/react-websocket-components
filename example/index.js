import React from 'react'
import ReactDOM from 'react-dom'

import './style.css'

import { WebSocketProvider, WaitWebSocketOpen } from '../lib'

import App from './App'

const ws = new WebSocket('ws://localhost:3000')

// Shit
ws.componentsMap = new Map()
ws.onComponent = (path, callback) => {
    ws.componentsMap.set(path, callback)
}
ws.onmessage = message => {
    const data = JSON.parse(message.data)

    const callback = ws.componentsMap.get(data.path)

    if (callback) {
        callback(data)
    }
}

ReactDOM.render(
    <WebSocketProvider value={ws}>
        <WaitWebSocketOpen fallback={<h1>Loading...</h1>}>
            <App />
        </WaitWebSocketOpen>
    </WebSocketProvider>,
    document.getElementById('root')
)
