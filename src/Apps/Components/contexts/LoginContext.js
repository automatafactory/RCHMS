import { useState, createContext } from "react"

const LoginProvider = ({ children }) => {
  const [token, setToken] = useState()
  const LoginContext = createContext(token)
  const LoginUpdateContext = createContext(setToken)

  return (
    <LoginContext.Provider value={token}>
      <LoginUpdateContext.Provider value={setToken}>
        {children}
      </LoginUpdateContext.Provider>
    </LoginContext.Provider>
  )
}
export default LoginProvider
