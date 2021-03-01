import { CLIENT_COMPONENT } from '../lib/symbols'

const importClientComponent = (path) => {
    return (props) => ({
        type: CLIENT_COMPONENT,
        props,
        path,
    })
}

export default importClientComponent
