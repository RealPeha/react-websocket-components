import { useState } from 'react'

import { useWebSocket } from './useWebSocket'

const WaitWebSocketOpen = ({ children, fallback = null }) => {
    const [isOpen, setOpen] = useState(false)
    const ws = useWebSocket()

    ws.onopen = () => setOpen(true)

    if (!isOpen) {
        return fallback
    }

    return children
}

export default WaitWebSocketOpen
