import { useContext, useEffect, useState } from "react"
import { StyleSheet, View } from "react-native"
import { Searchbar } from "react-native-paper"
import TopNavbar from "./Navbar/TopNavbar"
import BottomNavbar from "./Navbar/BottomNavbar"

function HomeScreen({ navigation }) {
  // const [loginState, setLginState] = useState(true)
  //
  // if (loginState)
  return (
    <>
      <TopNavbar navigation={navigation} />
      <BottomNavbar />
    </>
  )
  // else {
  // navigation.navigate("Login")
  // }
}
// import * as SecureStore from "expo-secure-store"

// async function save(key, value) {
//   await SecureStore.setItemAsync(key, value)
// }

// async function getValueFor(key) {
//   let result = await SecureStore.getItemAsync(key)
//   if (result) {
//     alert("🔐 Here's your value 🔐 \n" + result)
//   } else {
//     alert("No values stored under that key.")
//   }
// }
export default HomeScreen
