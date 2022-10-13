import * as React from "react"
import { useState } from "react"
import { View, StyleSheet, StatusBar, Image, Alert } from "react-native"
import { TextInput, Button, Text, Title } from "react-native-paper"
import storage from "../storage"

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

  const url = "http://192.168.0.4:8000/oauth"

  await fetch(url, requestOptions)
    .then((response) => {
      if (response.status != "200") {
        alert("Login failed")
      } else {
        return response.json()
      }
    })
    .then(async () => {
      try {
        // payload = payload.token
        // console.log(payload)
        // payload = JSON.stringify(payload)

        storage.save({
          key: "loginState", // Note: Do not use underscore("_") in key!
          data: payload,
          expires: 1000 * 3600,
        })
      } catch (e) {
        Alert("Unable to store data.")
      }
    })
    .catch((error) => {
      console.log("error", error)
    })
}

export default function Login() {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
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
            onPress={() => logincheck({ username, password })}
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
