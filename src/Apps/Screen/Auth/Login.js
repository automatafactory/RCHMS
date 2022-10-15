import { useEffect, useState } from "react"
import { View, StyleSheet, StatusBar, Image, Alert } from "react-native"
import { TextInput, Button, Text, Title } from "react-native-paper"

import storage from "../../Components/storage"

const logincheck = async ({ api, username, password }) => {
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
const loadStorage = async () => {
  try {
    return await storage.load({ key: "api" })
  } catch (error) {
    console.log("error>>>", error)
    await storage.remove({
      key: "api",
    })
    return false
  }
}

export default function Login({ navigation }) {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [payload, setPayload] = useState(async () => {
    await loadStorage()
  })

  console.log(">", payload)
  useEffect(() => {
    setPayload(loadStorage())
  }, [])
  console.log(">>", payload)

  if (payload) {
    return (
      <View style={StyleSheet.absoluteFillObject}>
        <View style={styles.wrapper}>
          <Text style={styles.text} variant="displayLarge">
            Login
          </Text>

          <View style={styles.container}>
            <TextInput
              label="Email"
              value={username}
              onChangeText={(username) => setUsername({ username })}
            />

            <TextInput
              style={styles.margins}
              label="Password"
              placeholder={"********"}
              value={password}
              secureTextEntry
              right={<TextInput.Icon icon="eye" />}
              onChangeText={(password) => setPassword({ password })}
            />
            <Button
              style={styles.margins}
              mode="contained-tonal"
              onPress={() => logincheck({ api, username, password })}
            >
              Login
            </Button>
            <Button
              style={styles.margins}
              mode="text"
              onPress={() => console.log("Pressed")}
            >
              Forgot Password
            </Button>
          </View>
        </View>

        {/* <View footer>
                <Text > Tanbin Hassan © 2022 - All Rights Reserved.</Text>
            </View> */}
        <StatusBar style="auto" />
      </View>
    )
  } else {
    navigation.navigate("Setup")
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: "100%",
    width: "100%",
    padding: "15%",
  },
  wrapper: {
    textAlign: "center",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: "3%",
    width: "100%",
  },
  text: {
    padding: "5%",
  },
  margins: {
    marginTop: "5%",
    width: "100%",
    marginBottom: "5%",
  },
  footer: {
    // width: '100%',
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
    padding: "5%",
    position: "absolute",
  },
})
