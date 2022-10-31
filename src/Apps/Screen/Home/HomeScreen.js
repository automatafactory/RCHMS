import React, { useEffect, useState } from "react"
import TopNavbar from "./Navbar/TopNavbar"
import ListProvider from "./ListProvider"
import { LoginContext } from "../../Components/contexts/LoginContext"

function HomeScreen(props) {
  console.log("Address :>> HomeScreen")
  const navigation = props.navigation
  const theme = props.route.params.theme
  const { token, fetchToken } = React.useContext(LoginContext)

  useEffect(() => {
    fetchToken()
  }, [])

  useEffect(() => {
    if (!token) navigation.navigate("Login")
  }, [token])

  return (
    <>
      <TopNavbar navigation={navigation} theme={theme} />
      <ListProvider theme={theme} navigation={navigation} />
    </>
  )
}

export default HomeScreen
