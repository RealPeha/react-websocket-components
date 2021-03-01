import React, { useState, useEffect } from 'react'

import { useWebSocket } from './useWebSocket'
import { serializeChildren } from './serializeReactComponent'

const WebSocketComponent = (path) => ({ children, ...props } = {}) => {
    const [element, setElement] = useState('')

    const ws = useWebSocket()

    console.log(children, serializeChildren(children))

    const loadComponent = () => {
        ws.send(JSON.stringify({ path, props, children: serializeChildren(children) }))
    }

    useEffect(() => {
        ws.onComponent(path, (element) => setElement(element))
    }, [])

    useEffect(() => {
        loadComponent()
    }, [JSON.stringify(props)])

    return (
        <div dangerouslySetInnerHTML={{ __html: element }} />
    )
}

export default WebSocketComponent
