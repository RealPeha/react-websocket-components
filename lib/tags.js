export const CHILDREN = {
    type: 'CHILDREN'
}

export const CLIENT_COMPONENT = (name, props) => {
    return {
        type: 'CLIENT_COMPONENT',
        props,
        name,
    }
}
