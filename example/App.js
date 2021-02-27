import React, { useState } from 'react'
import { importWSComponent } from '../lib'

import Editor from './Editor'
const Test = importWSComponent('components/server/Test') // import Test from './components/server/Test'

const App = () => {
    const [isVisible, setVisible] = useState(true)

    return (
        <div>
            <Editor />
            <Test heading="Text" isVisible={isVisible}/>
            <button onClick={() => setVisible(v => !v)}>Toggle</button>
        </div>
    )
}

export default App
