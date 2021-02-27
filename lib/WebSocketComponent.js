import React, { useState, useEffect } from 'react'

import { useWebSocket } from './useWebSocket'

const WebSocketComponent = (path) => (props = {}) => {
    const [html, setHtml] = useState()

    const ws = useWebSocket()

    const loadComponent = () => {
        ws.send(JSON.stringify({ path, props }))
    }

    useEffect(() => {
        loadComponent()

        ws.onComponent(path, (html) => setHtml(html))
    }, [])

    useEffect(() => {
        loadComponent()
    }, [props])

    return <div dangerouslySetInnerHTML={{ __html: html }}></div>
}

export default WebSocketComponent
