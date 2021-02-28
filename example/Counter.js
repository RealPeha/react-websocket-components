import React from 'react'

const Counter = ({ value, children }) => {
    return (
        <div>
            <b>Value: </b> {value}
            <div>
                {children}
            </div>
        </div>
    )
}

export default Counter
