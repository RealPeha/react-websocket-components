import React from 'react'
import marked from 'marked'
import sanitizeHtml from 'sanitize-html'

const Markdown = ({ text }) => {
    const html = sanitizeHtml(marked(text))

    return <div dangerouslySetInnerHTML={{__html: html }} />
}

export default Markdown
