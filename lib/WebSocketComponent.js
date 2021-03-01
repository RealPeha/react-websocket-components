import React, { useState, useEffect } from 'react'

import { useWebSocket } from './useWebSocket'
import { serializeChildren } from './serializeReactElement'

const WebSocketComponent = (path) => ({ children, ...props } = {}) => {
    const [html, setHTML] = useState('')

    const ws = useWebSocket()

    useEffect(() => {
        ws.onComponent(path, (data) => setHTML(data.html))
    }, [])

    useEffect(() => {
        ws.send(JSON.stringify({
            path,
            props,
            children: serializeChildren(children),
        }))
    }, [JSON.stringify(props)])

    return (
        <div dangerouslySetInnerHTML={{ __html: html }} />
    )
}

export default WebSocketComponent
