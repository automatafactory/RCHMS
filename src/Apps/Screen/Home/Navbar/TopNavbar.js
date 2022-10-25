import { useState } from "react"
import { Appbar, Text, Menu, Divider, Button } from "react-native-paper"
import { Alert, StyleSheet, View, BackHandler } from "react-native"
import * as SecureStore from "expo-secure-store"
const logout = async ({ navigation }) => {
  await SecureStore.deleteItemAsync("token")
  navigation.navigator.back()
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
      { text: "Yes", onPress: () => BackHandler.exitApp() },
    ],
    { cancelable: false }
  )
  return true
}

const deleteAll = async () => {
  await storage
    .clearMap()
    .then(() => console.log("Deleting Data"))
    .catch((e) => console.log(e))
}

export default function TopNavbar({ navigation, setToken, theme }) {
  const [visible, setVisible] = useState(true)
  const openMenu = () => setVisible(true)
  const closeMenu = () => setVisible(false)
  return (
    <>
      <Appbar.Header
        elevated="true"
        dark={true}
        mode="large"
        // style={{ backgroundColor: theme.colors.primary }}
      >
        <Appbar.BackAction onPress={() => exit()} />
        <Appbar.Content
          title={
            <Text
              variant="headlineLarge"
              style={{ color: theme.colors.primary }}
            >
              Hampo
            </Text>
          }
        />
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
            leadingIcon="delete"
            onPress={() => {
              deleteAll()
            }}
            title="Reset"
          />
          <Menu.Item
            leadingIcon="power"
            onPress={() => logout({ navigation })}
            title="Log out"
          />
        </Menu>
      </Appbar.Header>
    </>
  )
}
