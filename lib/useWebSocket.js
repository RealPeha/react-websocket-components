import { useContext, createContext } from 'react'

const WebSocketContext = createContext()

export const WebSocketProvider = WebSocketContext.Provider

export const useWebSocket = () => useContext(WebSocketContext)
