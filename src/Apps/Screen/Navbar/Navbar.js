import * as React from "react"
import { Appbar } from "react-native-paper"
import { Alert, StyleSheet, View } from "react-native"

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
      <Appbar.Action
        icon="qrcode-scan"
        onPress={() => navigation.navigate("CamaraScreen")}
      />
      <Appbar.Action icon="dots-vertical" onPress={_handleMore} />
    </Appbar.Header>
  )
}

export default Navbar
