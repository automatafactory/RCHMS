import React, { useState, createContext } from "react"
const LoginProvider = React.createContext()
import storage from "../storage"

export const loginProvider = ({ children }) => {
  const [api, setApi] = useState()
  storage
    .load({
      key: "loginState",
      autoSync: true,
      syncInBackground: true,
      syncParams: {
        someFlag: true,
      },
    })
    .then((ret) => {
      setApi(ret.api)
    })
    .catch((err) => {
      setApi(undefined)
    })
  return (
    <>
      <LoginContext.Provider value={api}>{children}</LoginContext.Provider>
    </>
  )
}
