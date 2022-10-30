import { useState, useEffect, useContext, createContext } from "react"
import storage from "../storage"

const HistoryContext = createContext()
const HistoryUpdateContext = createContext()

export const HistoryProvider = ({ children }) => {
  const [history, setHistory] = useState()

  useEffect(() => {
    const fatchData = async () => {
      const payload = await storage.getAllDataForKey("tableData")
      console.log("useEffect of HistoryProvider", payload)
      setHistory(payload)
    }
    fatchData()
  }, [])

  return (
    <HistoryContext.Provider value={history}>
      <HistoryUpdateContext.Provider value={setHistory}>
        {children}
      </HistoryUpdateContext.Provider>
    </HistoryContext.Provider>
  )
}

// ! Get Set Function
export const setHistory = () => {
  return useContext(HistoryUpdateContext)
}
export const getHistory = () => {
  return useContext(HistoryContext)
}
