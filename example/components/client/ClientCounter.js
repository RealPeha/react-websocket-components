import React, { useState, useEffect } from 'react'

const Counter = ({ count: initCount, children }) => {
    const [count, setCount] = useState(initCount)

    useEffect(() => {
        console.log('update')
    })

    useEffect(() => {
        console.log(`current count: ${count}`)
    }, [count])

    return (
        <div>
            {count}
            <button onClick={() => setCount(c => c + 1)}>Click</button>
            {children}
        </div>
    )
}

export default Counter
