import { CLIENT_COMPONENT } from './tags'

const importClientComponent = (name) => (props) => {
    return CLIENT_COMPONENT(name, props)
}

export default importClientComponent
