import React, { useState } from 'react'

const Counter = ({ count: initCount, children }) => {
    const [count, setCount] = useState(initCount)

    return (
        <div>
            {count}
            <button onClick={() => setCount(c => c + 1)}>Click</button>
            {children}
        </div>
    )
}

export default Counter
