import { useState, useEffect } from 'react'

import { useWebSocket } from './useWebSocket'
import { deserializeReactElement, deserializeChildren } from './deserializeReactElement'

const importServerComponent = (path) => ({ children: clientChildren, fallback = null, ...props } = {}) => {
    const [element, setElement] = useState(null)
    const [isLoading, setLoading] = useState(false)

    const ws = useWebSocket()

    useEffect(() => {
        ws.onComponent(path, (data) => {
            setElement(data.element)
            setLoading(false)
        })
    }, [])

    useEffect(() => {
        setLoading(true)
        ws.send(JSON.stringify({ path, props }))
    }, [JSON.stringify(props)])

    if (isLoading) {
        return fallback
    }

    if (!element) {
        return true
    }

    return element.type // type is undefined for Fragment and maybe some another
        ? deserializeReactElement(element, clientChildren)
        : deserializeChildren(element.props.children, clientChildren)
}

export default importServerComponent
