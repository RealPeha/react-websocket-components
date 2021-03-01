import React from 'react'

const serializeChildren = (children) => {
    if (typeof children === 'string' || typeof children === 'number') {
        return children
    }

    return React.Children.map(children, serializeReactElement)
}

const serializeReactElement = (element) => {
    if (typeof element === 'string' || typeof children === 'number') {
        return element
    }

    const { type, props = {} } = element

    const children = serializeChildren(props.children)

    return {
        type,
        props: {
            ...props,
            ...(children && { children }),
        },
    }
}

export {
    serializeReactElement,
    serializeChildren,
}
