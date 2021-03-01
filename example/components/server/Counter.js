import React from 'react'
import { importClientComponent } from '../../../lib'

const ClientCounter = importClientComponent('./components/client/ClientCounter') // import ClientComponent from '../client/ClientComponent'

const Test = () => {
    return <b>Server Component in Server Component</b>
}

const Counter = React.memo(({ value, children }) => {
    return (
        <>
            <div>
                <b>Value: </b> {value}
                <div>
                </div>

                <ClientCounter count={42}>
                    <b>child</b>
                </ClientCounter>
                <Test />
            </div>
            <b>Da</b>
                    {children}
        </>
    )
})

export default Counter
