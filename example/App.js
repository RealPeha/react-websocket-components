import React, { useState } from 'react'
import { importWSComponent } from '../lib'

import Editor from './Editor'
const Test = importWSComponent('./Test') // import Test from './Test'
const Counter = importWSComponent('./Counter')  // import Counter from './Counter'

const App = () => {
    const [isVisible, setVisible] = useState(true)
    const [count, setCount] = useState(42)

    return (
        <div>
            <Counter value={count}>
                <b>Children Value:</b> {count}
            </Counter>
            <button onClick={() => setCount(c => c + 1)}>Increase</button>
            <button onClick={() => setCount(c => c - 1)}>Decrease</button>
            <Editor />
            <Test heading="Text" isVisible={isVisible} />
            <button onClick={() => setVisible(v => !v)}>Toggle</button>
        </div>
    )
}

export default App
