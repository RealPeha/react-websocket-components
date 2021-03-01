export const CHILDREN = {
    type: 'CHILDREN'
}

export const CLIENT_COMPONENT = (path, props) => {
    return {
        type: 'CLIENT_COMPONENT',
        props,
        path,
    }
}
