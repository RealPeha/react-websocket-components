import { createElement } from 'react'

const deserializeChildren = (children) => {
    if (!children || (Array.isArray(children) && !children.length)) {
        return null
    }

    if (!Array.isArray(children)) {
        return deserializeReactElement(children)
    }

    return children.map(deserializeReactElement)
}

const deserializeReactElement = (element) => {
    if (!element) {
        return null
    }

    if (typeof element === 'string' || typeof element === 'number') {
        return element
    }

    const { type, path, props = {} } = element

    if (type === 'CLIENT_COMPONENT') {
        // const Component = require(path).default // Parcel doesn't support runtime dynamic requires :(
        const Component = require('../example/components/client/ClientCounter').default // load ClientCounter only for test

        return createElement(Component, props, deserializeChildren(props.children))
    }

    return createElement(type, props, deserializeChildren(props.children))
}

export {
    deserializeReactElement,
    deserializeChildren,
}
