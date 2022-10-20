import { useState } from "react"
import { Appbar, Avatar, Menu, Divider, Button } from "react-native-paper"
import { Alert, StyleSheet, View } from "react-native"
import storage from "../../../Components/storage"
import Setup from "../../Auth/Setup/Setup"

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

export default function TopNavbar({ navigation, setToken }) {
  const [visible, setVisible] = useState(true)
  const openMenu = () => setVisible(true)
  const closeMenu = () => setVisible(false)
  const _handleMore = () => console.log("Shown more")
  return (
    <>
      <Appbar.Header elevated mode="large">
        <Appbar.BackAction onPress={() => exit()} />
        <Appbar.Content title="Hampo" />
        {/* <Appbar.Action
        icon="qrcode-scan"
        onPress={() => navigation.navigate("CamaraScreen")}
      /> */}

        <Menu
          visible={visible}
          onDismiss={closeMenu}
          anchor={<Appbar.Action icon="dots-vertical" onPress={openMenu} />}
        >
          {/* <Menu.Item onPress={() => {}} title="Item 1" /> */}
          {/* <Menu.Item onPress={navigation.navigate("Setup")} title="Item 2" /> */}
          <Divider />
          <Menu.Item
            icon="power"
            onPress={() => setToken(false)}
            title="Log out"
          />
        </Menu>
      </Appbar.Header>
    </>
  )
}
