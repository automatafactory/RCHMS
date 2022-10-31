import React from "react"
import * as SecureStore from "expo-secure-store"

const reducer = (state, action) => {
  switch (action.type) {
    case "SAVE_TOKEN":
      console.log("hello", action.payload)
      return action.payload
    default:
      return state
  }
}

const LoginContext = React.createContext()

const LoginProvider = ({ children }) => {
  const [state, dispatch] = React.useReducer(reducer, undefined)

  const value = {
    token: state,
    fetchToken: async () => {
      dispatch({
        type: "SAVE_TOKEN",
        payload: await SecureStore.getItemAsync("token"),
      })
    },
  }

  // useEffect(() => {
  //   SecureStore.getItemAsync("token").then((payload) => setToken(payload))
  // }, [])

  return <LoginContext.Provider value={value}>{children}</LoginContext.Provider>
}

export { LoginContext, LoginProvider }
// export const getLoginToken = () => useContext(LoginContext)
// export const setLoginToken = () => useContext(TokenUpdateContext)
