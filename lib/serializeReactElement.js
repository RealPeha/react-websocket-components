const decomposeFunctionElement = (Component, props) => {
    const decomposed = Component(props) // call function component as function :3

    return serializeReactElement(decomposed)
}

const serializeChildren = (children) => {
    if (children === null || typeof children === 'undefined') {
        return null
    }

    if (!Array.isArray(children)) {
        return serializeReactElement(children)
    }

    return children.map(serializeReactElement)
}

const serializeReactElement = (element) => {
    if (
        element === null ||
        typeof element === 'undefined' ||
        typeof element === 'string' ||
        typeof element === 'number'
    ) {
        return element
    }

    const {
        type,
        name, // name of the client component
        props: { children, ...props } = {},
    } = element

    // Children Tag
    if (type === 'CHILDREN') {
        return { type }
    }

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

    // Client Element Tag
    if (type === 'CLIENT_COMPONENT') {
        return { type, props, name }
    }

    // HTML Element
    return { type, props }
}

export {
    serializeReactElement,
    serializeChildren,
}
