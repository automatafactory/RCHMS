import { useState, useEffect } from "react"
import { View, StyleSheet, StatusBar, Image, Appearance } from "react-native"
import {
  TextInput,
  Button,
  Text,
  MD3LightTheme,
  MD3DarkTheme,
  Provider,
} from "react-native-paper"

import { get, save } from "../../../Components/vault"
import updateURL from "./updateURL"

const theme = {
  ...MD3LightTheme,
  colors: {
    ...MD3LightTheme.colors,
  },
}

export default function Setup(props) {
  const navigation = props.navigation

  const sysTheam = Appearance.getColorScheme()
  const [theme, setTheme] = useState(
    sysTheam === "dark" ? MD3DarkTheme : MD3LightTheme
  )
  const [loading, setLoading] = useState(false)
  Appearance.addChangeListener(({ colorScheme }) => {
    setTheme(colorScheme === "dark" ? MD3DarkTheme : MD3LightTheme)
  })
  const colors = theme.colors

  // State
  const [estatus, setEstatus] = useState(false)
  const [url, setURL] = useState(props.route.params.url)

  return (
    <Provider theme={theme}>
      <View style={styles({ colors }).container}>
        <View style={styles({ colors }).imgcontainer}>
          <Image
            source={require("../../../../assets/icon.png")}
            style={styles({ colors }).img}
          />
          <Text style={styles({ colors }).text} variant="displayLarge">
            Hampo
          </Text>
        </View>
        <View style={styles({ colors }).wrapper}>
          {estatus ? (
            <Text style={styles({ colors }).errtext}>
              Error Connecting to server please updateURL the address of the
              server of your connection.
            </Text>
          ) : null}

          <TextInput
            error={estatus}
            label="Server Address"
            placeholder="eg: 192.168.0.1:8000"
            value={url}
            mode="outlined"
            onChangeText={(url) => setURL(url)}
          />

          <Button
            style={styles({ colors }).margins}
            loading={loading}
            mode="contained"
            onPress={() =>
              updateURL({ url, setURL, navigation, setEstatus, setLoading })
            }
          >
            Connect
          </Button>
        </View>
        <Text> Tanbin Hassan © 2022 - All Rights Reserved.</Text>
      </View>
      <StatusBar style="auto" />
    </Provider>
  )
}

const styles = ({ colors }) =>
  StyleSheet.create({
    container: {
      backgroundColor: colors.background,
      textAlign: "center",
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      padding: "3%",
      width: "100%",
    },
    wrapper: {
      flex: 1,
      height: "100%",
      width: "100%",
      padding: "15%",
      justifyContent: "space-evenly",
    },
    imgcontainer: {
      marginTop: 30,
      flex: 1,
      width: "100%",
      padding: 50,
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
    },
    img: {
      width: 100,
      height: 100,
    },
    text: {
      padding: "5%",
      color: colors.primary,
    },
    errtext: {
      color: "red",
      // backgroundColor: "black",
      padding: 15,
    },
    margins: {
      marginTop: "5%",
      width: "100%",
      marginBottom: "5%",
    },
  })
