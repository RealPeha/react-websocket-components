import { Children } from 'react'

import { CLIENT_COMPONENT } from './symbols'

const serializeChildren = (children) => {
    if (!Array.isArray(children)) {
        children = [children]
    }

    return Children.map(children, serializeReactElement)
}

const serializeReactElement = (element) => {
    if (!element || typeof element === 'string' || typeof element === 'number') {
        return element
    }

    const { type, path, props = {} } = element

    const children = serializeChildren(props.children)

    if (type === CLIENT_COMPONENT) {
        return {
            type: 'CLIENT_COMPONENT',
            path,
            props: {
                ...props,
                ...(children && { children: children.length === 1 ? children[0] : children }),
            },
        }
    }

    if (typeof type === 'function') {
        const element = type(props)

        return serializeReactElement(element)
    }

    return {
        type,
        props: {
            ...props,
            ...(children && { children: children.length === 1 ? children[0] : children }),
        },
    }
}

export {
    serializeReactElement,
    serializeChildren,
}
