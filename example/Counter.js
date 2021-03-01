import React from 'react'

const Test = () => {
    return <b>Server Component in Server Component</b>
}

const Counter = ({ value, children }) => {
    return (
        <>
            <div>
                <b>Value: </b> {value}
                <div>
                    {children}
                </div>
            </div>
            <Test />
        </>
    )
}

export default Counter
