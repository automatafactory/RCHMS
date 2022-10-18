import { useContext, useEffect, useState } from "react"
import { StyleSheet, View } from "react-native"
import { Searchbar } from "react-native-paper"
import Navbar from "../Navbar/Navbar"
import storage from "../../Components/storage"
import BottomNavbar from "../Navbar/BottomNavbar"
import { loginProvider } from "../../Components/contexts/loginProvider"

const loadLoginState = async () => {
  return await storage.load({
    key: "loginState",
  })
}

function Home({ navigation }) {
  const [loginState, setLginState] = useContext(loginProvider)
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
      setLginState(ret)
    })
    .catch((err) => {
      setLginState(undefined)
    })

  console.log(loginState)

  if (loginState)
    return (
      <>
        <Navbar navigation={navigation} />
        <BottomNavbar />
      </>
    )
  else {
    navigation.navigate("Login")
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
})

export default Home
