import { CLIENT_COMPONENT } from '../lib/symbols'

const importClientComponent = (path) => (props) => {
    return {
        type: CLIENT_COMPONENT,
        props,
        path,
    }
}

export default importClientComponent
