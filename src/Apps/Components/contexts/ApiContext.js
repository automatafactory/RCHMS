import React,{ useState, useEffect, useContext } from "react"
import * as SecureStore from "expo-secure-store"
const ApiContext = React.createContext()

export const getApi = () => {
  return useContext(ApiContext)
}

export const ApiProvider = ({children}) => {
  const [api, setApi] = useState()


  useEffect(() => {
    SecureStore.getItemAsync("url").then((payload) => {
      setApi(payload? payload : '192.168.1.2:8000')
    })
  }, [])

  return (<ApiContext.Provider value={api}>
    {children}
  </ApiContext.Provider>)
}
