import { createElement } from 'react'

const deserializeChildren = (children) => {
    if (!children || (Array.isArray(children) && !children.length)) {
        return null
    }

    if (!Array.isArray(children)) {
        children = [children]
    }

    return children.map(deserializeReactElement)
}

const deserializeReactElement = (element) => {
    if (typeof element === 'string' || typeof element === 'number') {
        return element
    }

    const { type, path, props = {} } = element

    if (type === 'CLIENT_COMPONENT') {
        const Component = require('../example/ClientCounter').default

        return createElement(Component, props, deserializeChildren(props.children))
    }

    return createElement(type, props, deserializeChildren(props.children))
}

export {
    deserializeReactElement,
    deserializeChildren,
}
