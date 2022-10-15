import { useEffect } from "react"
import { StatusBar } from "expo-status-bar"
import { Alert, StyleSheet, View } from "react-native"
import {
  Paragraph,
  Dialog,
  Portal,
  Provider,
  Button,
  Appbar,
  withTheme,
  Text,
} from "react-native-paper"
import QRCamaraScreen from "../Camara/QRCamaraScreen"
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import Navbar from "../Navbar/Navbar"
import TableSpace from "./TableSpace"
import storage from "../../Components/storage"

function Home({ navigation }) {
  storage
    .load({
      key: "loginState",
    })
    .then((ret) => {
      return (
        <View>
          <Navbar navigation={navigation} />
          <TableSpace />
        </View>
      )
    })
    .catch((err) => {
      navigation.navigate("Login")
    })
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
})

export default withTheme(Home)
