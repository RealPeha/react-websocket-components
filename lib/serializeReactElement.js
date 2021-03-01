import React, { Children, createElement } from 'react'

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

    const { type, props = {} } = element

    const children = serializeChildren(props.children)

    // if (typeof type === 'function') {
    //     const element = createElement(type(props), props, ...children) // createElement(type, props, ...children)

    //     return serializeReactElement(element)
    // }

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
