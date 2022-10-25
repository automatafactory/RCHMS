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
  Paragraph,
  Dialog,
  Portal,
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

  const [alartMsg, setAlartMsg] = useState({
    visible: false,
    body: "",
    titel: "",
  })

  const hideDialog = () =>
    setAlartMsg({
      visible: false,
      body: "",
      titel: "",
    })
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
    return payload
  }

  const { isLoading, mutate, isError } = useMutation(networkAuthenticated, {
    onSuccess: async ({ data, status }) => {
      console.log(">", data)
      console.log(">", status)
      if (status === 200 && data.Status === "Success") {
        await SecureStore.setItemAsync("url", url)
        const _url = await SecureStore.getItemAsync("url")

        console.log("Update url:", _url)

        setURL(_url)
        navigation.navigate("Login")
      }
    },

    onError: ({ message, code }) => {
      setAlartMsg({
        visible: true,
        body: message + "/n Error Code:" + code,
      })
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
          {/* {isError ? (
            <Text style={styles({ colors }).errtext}>{alartMsg.body}</Text>
          ) : null} */}

          <TextInput
            error={isError}
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

        <Text>Tanbin Hassan © 2022 - All Rights Reserved.</Text>
      </View>
      <Portal>
        <Dialog visible={alartMsg.visible} onDismiss={hideDialog}>
          <Dialog.Title>Server Error</Dialog.Title>
          <Dialog.Content>
            <Paragraph>{alartMsg.body}</Paragraph>
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={hideDialog}>Dismiss</Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
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
      // height: "100%",
      width: "100%",
      padding: "15%",
      justifyContent: "space-evenly",
    },
    imgcontainer: {
      marginTop: "5%",
      flex: 1,
      width: "100%",
      padding: "5%",
      flexDirection: "column",
      flexWrap: "wrap",
      justifyContent: "center",
      alignContent: "center",
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
      padding: 15,
    },
    margins: {
      marginTop: "5%",
      width: "100%",
      marginBottom: "5%",
    },
  })

export default Setup
