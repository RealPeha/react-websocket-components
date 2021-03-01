import { CLIENT_COMPONENT } from './tags'

const importClientComponent = (path) => (props) => {
    return CLIENT_COMPONENT(path, props)
}

export default importClientComponent
