import * as React from "react"
import { Appbar } from "react-native-paper"
import { Alert, StyleSheet, View } from "react-native"
import storage from "../../Components/storage"

const logout = async () => {
  await storage.remove({
    key: "loginState",
  })
}

const exit = () => {
  Alert.alert(
    "Exit App",
    "Do you want to exit?",
    [
      {
        text: "No",
        onPress: () => console.log("Cancel Pressed"),
        style: "cancel",
      },
      { text: "Yes", onPress: () => console.log("Exit Pressed") },
    ],
    { cancelable: false }
  )
  return true
}

const Navbar = ({ navigation }) => {
  const _handleMore = () => console.log("Shown more")
  return (
    <Appbar.Header elevated mode="large">
      <Appbar.BackAction onPress={() => exit()} />
      <Appbar.Content title="Hampo" />
      {/* <Appbar.Action
        icon="qrcode-scan"
        onPress={() => navigation.navigate("CamaraScreen")}
      /> */}
      <Appbar.Action icon="power" onPress={logout} />
      <Appbar.Action icon="dots-vertical" />
    </Appbar.Header>
  )
}

export default Navbar
