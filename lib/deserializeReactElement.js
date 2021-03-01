import { createElement } from 'react'

const deserializeChildren = (children) => {
    if (!children) {
        return []
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

    const { type, props = {} } = element

    return createElement(type, props, ...deserializeChildren(props.children))
}

export {
    deserializeReactElement,
    deserializeChildren,
}
