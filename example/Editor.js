import React, { useState } from 'react'
import { importWSComponent } from '../lib'

import './style.css'

const Markdown = importWSComponent('Markdown') // import Markdown from './Markdown'

const Editor = () => {
    const [text, setText] = useState('<b>Yes</b> **No** [Link](google.com)')

    const handleInput = (e) => {
        setText(e.target.value)
    }

    return (
        <div className='editor'>
            <div className='left'>
                <textarea
                    value={text}
                    onChange={handleInput}
                ></textarea>
            </div>
            <div className='right'>
                <Markdown text={text} />
            </div>
        </div>
    )
}

export default Editor
