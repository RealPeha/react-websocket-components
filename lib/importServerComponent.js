import { useState, useEffect } from 'react'

import { useWebSocket } from './useWebSocket'
import { deserializeReactElement, deserializeChildren } from './deserializeReactElement'

const importServerComponent = (path) => ({ children: clientChildren, ...props } = {}) => {
    const [element, setElement] = useState(null)

    const ws = useWebSocket()

    useEffect(() => {
        ws.onComponent(path, (data) => setElement(data.element))
    }, [])

    useEffect(() => {
        ws.send(JSON.stringify({ path, props }))
    }, [JSON.stringify(props)])

    if (!element) {
        return null
    }

    return element.type // type is undefined for Fragment and maybe some another
        ? deserializeReactElement(element, clientChildren)
        : deserializeChildren(element.props.children, clientChildren)
}

export default importServerComponent
