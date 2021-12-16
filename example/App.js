import React, { useState } from 'react'
import { importServerComponent } from '../lib'

import Editor from './components/client/Editor'
const Article = importServerComponent('./components/server/Article') // import Article from './components/server/Article'
const Counter = importServerComponent('./components/server/Counter')  // import Counter from './components/server/Counter'

const Test = () => {
    const [v, setV] = useState(1)

    return <b onClick={() => setV(Math.random())}>(Click here): {v}</b>
}

const App = () => {
    const [count, setCount] = useState(42)
    const [isVisible, setVisible] = useState(true)

    return (
        <div>
            <h3>Server Component with props</h3>
            <Editor />

            <h3>Server Component with Client Component</h3>
            <div>
                <Counter value={count}>
                    <b>Children Value:</b> {count}

                    <Test />
                </Counter>
                <button onClick={() => setCount(c => c + 1)}>Increase</button>
                <button onClick={() => setCount(c => c - 1)}>Decrease</button>
            </div>

            <div>
                <Article fallback={<h1>Loading...</h1>} heading="Hello" isVisible={isVisible} />
                <button onClick={() => setVisible(v => !v)}>Toggle</button>
            </div>
        </div>
    )
}

export default App
