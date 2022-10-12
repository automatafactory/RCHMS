import * as React from "react"
import { useState } from "react"
import { View, StyleSheet, StatusBar, Image, Alert } from "react-native"
import { TextInput, Button, Text, Title } from "react-native-paper"
import AsyncStorage from "@react-native-async-storage/async-storage"
import { setToken } from "../GlobaVariable"

const logincheck = async ({ username, password }) => {
  await fetch("http://192.168.1.2:8000/login", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      username: username,
      password: password,
    }),
  })
    .then((response) => {
      if (response.status != "200") {
        alert("Login failed")
      } else {
        console.log("=================response===================")
        console.log(response)
        return response.json()
      }
    })
    .then(async (payload) => {
      try {
        payload = payload.token
        payload = JSON.stringify(payload)
        await AsyncStorage.setItem("@token", token)
        Alert(token)
      } catch (e) {
        Alert("Unable to store data.")
      }
    })
    .catch((error) => {
      console.log("error")
      console.error(error)
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
