import React from 'react'
import { importClientComponent } from '../../../lib'

const ClientCounter = importClientComponent('./components/example/client/ClientCounter') // import ClientComponent from '../client/ClientComponent'

const Test = () => {
    return <b>Server Component in Server Component</b>
}

const Counter = ({ children, value }) => {
    return (
        <>
            <div>
                <b>Value: </b> {value}

                <ClientCounter count={42}>
                    <b>child</b>
                </ClientCounter>
                <Test />
            </div>
            <b>Da</b><br />
            {children}
            <br />
        </>
    )
}

export default Counter
