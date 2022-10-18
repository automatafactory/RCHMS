// Navigation

// Components
import { useState } from "react"
import HomeScreen from "./Screen/Home/HomeScreen"
import Login from "./Screen/Auth/Login/Login"
import Setup from "./Screen/Auth/Setup/Setup"

const validition = () => {
  const [api, setApi] = useState(true)
  const [token, setToken] = useState(true)

  if (api) {
    if (token) {
      return <HomeScreen />
    } else {
      return <Login />
    }
  } else {
    return <Setup />
  }
}
export default validition(Main)
