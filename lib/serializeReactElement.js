import { Children } from 'react'

import { CLIENT_COMPONENT } from './symbols'

const decomposeFunctionElement = (Component, props) => {
    const decomposed = Component(props) // call function component as function :3

    return serializeReactElement(decomposed)
}

const serializeChildren = (children) => {
    if (!children) {
        return null
    }

    if (!Array.isArray(children)) {
        return serializeReactElement(children)
    }

    return Children.map(children, serializeReactElement)
}

const serializeReactElement = (element) => {
    if (!element || typeof element === 'string' || typeof element === 'number') {
        return element
    }

    const {
        type,
        path, // path to client component
        props: { children, ...props },
    } = element

    // Memo Element
    if (typeof type === 'object') {
        return decomposeFunctionElement(type.type, element.props)
    }

    // Function Element
    if (typeof type === 'function') {
        return decomposeFunctionElement(type, element.props)
    }

    const serializedChildren = serializeChildren(children)

    if (serializedChildren) {
        props.children = serializedChildren
    }

    // Client Element
    if (type === CLIENT_COMPONENT) {
        return {
            type: 'CLIENT_COMPONENT',
            props,
            path,
        }
    }

    // HTML Element
    return { type, props }
}

export {
    serializeReactElement,
    serializeChildren,
}
