import { useState, useEffect } from "react"
import {
  View,
  StyleSheet,
  StatusBar,
  Image,
  Appearance,
  Alert,
} from "react-native"
import {
  TextInput,
  Button,
  Text,
  MD3LightTheme,
  MD3DarkTheme,
  Provider,
} from "react-native-paper"
import { useMutation } from "react-query"
import axios from "axios"
import * as SecureStore from "expo-secure-store"

const Setup = (props) => {
  const navigation = props.navigation
  const sysTheam = Appearance.getColorScheme()
  const [theme, setTheme] = useState(
    sysTheam === "dark" ? MD3DarkTheme : MD3LightTheme
  )

  Appearance.addChangeListener(({ colorScheme }) => {
    setTheme(colorScheme === "dark" ? MD3DarkTheme : MD3LightTheme)
  })
  const colors = theme.colors

  // State
  const [estatus, setEstatus] = useState(false)
  const [url, setURL] = useState(props.route.params.url)

  const networkAuthenticated = async ({ url }) => {
    const config = {
      method: "post",
      url: `http://${url}/verify`,
      headers: {
        "Content-Type": "application/json",
      },
      data: JSON.stringify({ prodectid: "d6b05a143f1084108d071843c134a297" }),
    }
    const payload = await axios(config)
    console.log(payload)
    return payload
  }

  const { isLoading, mutate } = useMutation(networkAuthenticated, {
    onSuccess: async () => {
      if (payload.status != 200) {
        setEstatus(true)
      } else {
        await SecureStore.setItemAsync("url", url)
        const _url = SecureStore.getItemAsync("url")
        setURL(_url)
        navigation.navigate("Login")
      }
    },
    onError: (error) => {
      Alert.alert("Error", error)
    },
  })

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
            loading={isLoading}
            mode="contained"
            onPress={() => mutate({ url })}
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

export default Setup
