import React from 'react'
import { importClientComponent } from '../../../lib'

const ClientComponent = importClientComponent('./ClientCounter') // import ClientComponent from './ClientComponent'

const Test = () => {
    return <b>Server Component in Server Component</b>
}

const Counter = ({ value, children }) => {
    return (
        <div>
            <b>Value: </b> {value}
            <div>
                {children}
            </div>

            <ClientComponent count={42}>
                <b>11</b>
            </ClientComponent>

            <Test />
        </div>
    )
}

export default Counter
