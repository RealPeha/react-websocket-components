import { useState, useEffect } from 'react'

import { useWebSocket } from './useWebSocket'
import { serializeChildren } from './serializeReactElement'
import { deserializeReactElement, deserializeChildren } from './deserializeReactElement'

const WebSocketComponent = (path) => ({ children, ...props } = {}) => {
    const [element, setElement] = useState(null)

    const ws = useWebSocket()

    useEffect(() => {
        ws.onComponent(path, (data) => setElement(data.element))
    }, [])

    useEffect(() => {
        ws.send(JSON.stringify({
            path,
            props,
            children: serializeChildren(children),
        }))
    }, [JSON.stringify(props)])

    if (!element) {
        return null
    }

    return element.type ? deserializeReactElement(element) : deserializeChildren(element.props.children)
}

export default WebSocketComponent
