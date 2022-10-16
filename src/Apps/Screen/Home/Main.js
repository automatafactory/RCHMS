import { useEffect, useState } from "react"
import { StyleSheet, View } from "react-native"
import { Searchbar } from "react-native-paper"
import Navbar from "../Navbar/Navbar"
import storage from "../../Components/storage"
import BottomNavbar from "../Navbar/BottomNavbar"

const loadLoginState = async () => {
  return await storage.load({
    key: "loginState",
  })
}

function Home({ navigation }) {
  // const [status, setStatus] = useState(() => {
  //    loadLoginState()
  // })
  const [status, setStatus] = useState("true")

  console.log(status)

  if (!status)
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
