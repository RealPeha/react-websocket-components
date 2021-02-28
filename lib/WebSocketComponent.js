import React, { useState, useEffect } from 'react'

import { useWebSocket } from './useWebSocket'

const mapChildren = (children) => {
    if (typeof children === 'string' || typeof children === 'number') {
        return children
    }

    return React.Children.map(children, child => {
        if (typeof child === 'string' || typeof child === 'number') {
            return child
        }

        const children = mapChildren(child.props.children)

        return {
            // type: typeof child.type === 'function' ? '' : child.type,
            type: child.type,
            props: {
                ...child.props,
                ...(children && { children } ),
            },
        }
    })
}

const WebSocketComponent = (path) => ({ children, ...props } = {}) => {
    const [html, setHtml] = useState('')

    const ws = useWebSocket()

    const loadComponent = () => {
        ws.send(JSON.stringify({ path, props, children: mapChildren(children) }))
    }

    useEffect(() => {
        ws.onComponent(path, (html) => setHtml(html))
    }, [])

    useEffect(() => {
        loadComponent()
    }, [JSON.stringify(props)])

    return (
        <div dangerouslySetInnerHTML={{ __html: html }} />
    )
}

export default WebSocketComponent
