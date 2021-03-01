import { createElement } from 'react'

const deserializeChildren = (children, clientChildren) => {
    if (!children || (Array.isArray(children) && !children.length)) {
        return null
    }

    if (!Array.isArray(children)) {
        return deserializeReactElement(children, clientChildren)
    }

    return children.map(child => deserializeReactElement(child, clientChildren))
}

const deserializeReactElement = (element, clientChildren = null) => {
    if (!element) {
        return null
    }

    if (typeof element === 'string' || typeof element === 'number') {
        return element
    }

    const { type, path, props = {} } = element

    if (type === 'CHILDREN') {
        return clientChildren
    }

    if (type === 'CLIENT_COMPONENT' && path) {
        // const Component = require(path).default // Parcel doesn't support runtime dynamic requires :(
        const Component = require('../example/components/client/ClientCounter').default // load ClientCounter only for test

        return createElement(Component, props, deserializeChildren(props.children, clientChildren))
    }

    return createElement(type, props, deserializeChildren(props.children, clientChildren))
}

export {
    deserializeReactElement,
    deserializeChildren,
}
