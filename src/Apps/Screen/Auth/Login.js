import { useEffect, useState } from "react"
import { View, StyleSheet, StatusBar, Image, Alert } from "react-native"
import {
  TextInput,
  Button,
  Text,
  MD3LightTheme as DefaultTheme,
} from "react-native-paper"

import storage from "../../Components/storage"

const logincheck = async ({ username, password }) => {
  const _headers = new Headers()
  _headers.append("Content-Type", "application/json")
  _headers.append("Access-Control-Allow-Origin", "*")
  _headers.append("Access-Control-Allow-Headers", "Content-Type")

  const _body = JSON.stringify({
    username: username,
    password: password,
  })

  const requestOptions = {
    method: "POST",
    headers: _headers,
    body: _body,
    redirect: "follow",
  }

  const api = await loadStorage()

  const url = `http://${api}/oauth`
  console.log(url)

  try {
    const response = await fetch(url, requestOptions)

    if (response.status != "200") alert("Login failed")
    else return response.json()

    await storage.save({
      key: "loginState", // Note: Do not use underscore("_") in key!
      data: payload,
      expires: 1000 * 3600,
    })
  } catch (error) {
    console.log("error", error)
  }
}

const rmServer = async ({ navigation }) => {
  await storage.remove({
    key: "api",
  })
  await navigation.navigate("Setup")
}

const serverAlart = ({ navigation }) => {
  Alert.alert(
    "Warning",
    "Do you really want to remove the current server address?",
    [
      {
        text: "Yes",
        onPress: () => rmServer({ navigation }),
        style: "cancel",
      },
      {
        text: "Cancel",
        onPress: () => Alert.alert("Cancel Pressed"),
        style: "cancel",
      },
    ]
  )
}

const loadStorage = async () => {
  try {
    return await storage.load({ key: "api" })
  } catch (error) {
    console.log("error>>>", error)
    // await storage.remove({
    //   key: "api",
    // })
    return false
  }
}

/*****************
 *
 *    MAIN
 *
 * ***************/

export default function Login({ navigation }) {
  // console.log("color>>>", DefaultTheme.colors)
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [payload, setPayload] = useState("192.168.1.2:8000")

  console.log(">", payload)
  useEffect(() => {
    setPayload(loadStorage())
  }, [])
  console.log(">>", payload)

  if (payload) {
    return (
      <View style={styles.container}>
        <View style={styles.row}>
          <View style={styles.header}>
            <View style={styles.imgcontainer}>
              <Image
                source={require("../../../assets/icon.png")}
                style={styles.img}
              />
              <Text style={styles.text} variant="displayLarge">
                Login
              </Text>
            </View>
          </View>
        </View>

        <View style={styles.row}>
          <TextInput
            style={styles.margins}
            label="Email"
            mode="outlined"
            value={username}
            onChangeText={(username) => setUsername({ username })}
          />
          <TextInput
            style={styles.margins}
            mode="outlined"
            label="Password"
            placeholder={"********"}
            value={password}
            secureTextEntry
            right={<TextInput.Icon icon="eye" />}
            onChangeText={(password) => setPassword({ password })}
          />

          <Button
            style={styles.margins}
            mode="contained"
            onPress={() => logincheck({ username, password })}
          >
            Login
          </Button>
          <View style={styles.row}>
            <Button
              style={styles.margins}
              mode="text"
              textColor={DefaultTheme.colors.secondary}
              onPress={() => Alert.alert("Contact Admin for reset password")}
            >
              Forgot Password
            </Button>
            <Button
              style={styles.margins}
              textColor={DefaultTheme.colors.error}
              mode="text"
              onPress={() => serverAlart({ navigation })}
            >
              Update Server
            </Button>
          </View>
        </View>
        <View style={styles.row}>
          <View style={styles.footer}>
            <Text>Power by React Native</Text>
            <Text>Tanbin Hassan © 2022 </Text>
            <StatusBar style="auto" />
          </View>
        </View>
      </View>
    )
  }
}
const styles = StyleSheet.create({
  container: {
    backgroundColor: DefaultTheme.colors.surfaceVariant,
    width: "100%",
    flex: 1,
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItemsArr: "center",
  },
  row: {
    flexDirection: "row",
    justifyContent: "center",
    alignItemsArr: "center",
  },
  camara: {
    flex: 1,
    width: "100%",
    // padding: "20%",
    margin: "5%",
    flexDirection: "column",
    justifyContent: "center",
    alignItemsArr: "center",
  },
  btn: {
    flex: 1,
    height: "100%",
    width: "100%",
    padding: "10%",
    flexDirection: "column",
    justifyContent: "flex-start",
  },

  // imgcontainer: {
  //   marginTop: 30,
  //   flex: 1,
  //   width: "100%",
  //   padding: 50,
  //   flexDirection: "row",
  //   justifyContent: "center",
  //   alignItems: "center",
  // },
  // img: {
  //   width: 50,
  //   height: 50,
  //   margin: 10,
  // },
  text: {
    fontFamily: DefaultTheme.colors.fontFamily,
    color: DefaultTheme.colors.primary,
    textAlign: "center",
  },
})
