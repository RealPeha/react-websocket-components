import React, { useState } from 'react'
import { importServerComponent } from '../lib'

import Editor from './components/client/Editor'
const Article = importServerComponent('./components/server/Article') // import Article from './Article'
const Counter = importServerComponent('./components/server/Counter')  // import Counter from './Counter'

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
                </Counter>
                <button onClick={() => setCount(c => c + 1)}>Increase</button>
                <button onClick={() => setCount(c => c - 1)}>Decrease</button>
            </div>

            <div>
                <Article heading="Hello" isVisible={isVisible} />
                <button onClick={() => setVisible(v => !v)}>Toggle</button>
            </div>
        </div>
    )
}

export default App
