import { useEffect, useState } from "react"
import { View } from "react-native"
import { ActivityIndicator } from "react-native-paper"
import * as SecureStore from "expo-secure-store"

import TopNavbar from "./Navbar/TopNavbar"
import ListProvider from "./ListProvider"
import storage from "../../Components/storage"

function HomeScreen(props) {
  const navigation = props.navigation
  // navigation.navigate("Login")
  const theme = props.route.params.theme
  const [history, setHistory] = useState()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    storage
      .getAllDataForKey("tableData")
      .then((payload) => {
        setHistory(!payload ? payload : payload.reverse())
      })
      .then(() => {
        SecureStore.getItemAsync("token").then((payload) => {
          console.log("Home Screen=>", payload)

          payload ? setLoading(false) : navigation.navigate("Login")
        })
      })
  }, [])
  // useEffect(() => {
  //   storage.getAllDataForKey("tableData").then((payload) => {
  //     setHistory(!payload ? payload : payload.reverse())
  //   })
  // }, [])

  if (!loading) {
    return (
      <>
        <TopNavbar
          navigation={navigation}
          theme={theme}
          setToken={props.route.params.setToken}
        />
        {/* <BottomNavbar
        navigation={navigation}
        history={history}
        setHistory={setHistory}
      /> */}
        <ListProvider
          theme={theme}
          navigation={navigation}
          history={history}
          setHistory={setHistory}
        />
      </>
    )
  }
  return (
    <>
      <ActivityIndicator animating={true} size="large" />
    </>
  )
}

export default HomeScreen
