import React, { useState } from 'react'

import { useWebSocket } from './useWebSocket'

const WaitWebSocketOpen = ({ children }) => {
    const [isOpen, setOpen] = useState(false)
    const ws = useWebSocket()

    ws.onopen = () => setOpen(true)

    if (!isOpen) {
        return <h1>Loading...</h1>
    }

    return children
}

export default WaitWebSocketOpen
