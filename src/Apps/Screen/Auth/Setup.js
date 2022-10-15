import * as React from "react"
import { useState } from "react"
import { View, StyleSheet, StatusBar, Image, Alert } from "react-native"
import { TextInput, Button, Text, Title } from "react-native-paper"
import AsyncStorage from "@react-native-async-storage/async-storage"
import { setApi, setToken } from "../GlobaVariable"

const check = async ({ url }) => {
  await fetch(`http://${url}/test`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  })
    .then(async (response) => {
      if (response.status != "200") {
        alert("Error cunnecting with server failed")
        return false
      } else {
        await setApi(url)
        return true
      }
    })
    .then(async (payload) => {
      try {
        payload = payload.token
        payload = JSON.stringify(payload)

        const token = setToken(payload)
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
  console.log("======= Login ========")
  const [url, setUrl] = useState("")
  return (
    <View style={StyleSheet.absoluteFillObject}>
      <View style={styles.wrapper}>
        <Text style={styles.text} variant="displayLarge">
          Server
        </Text>

        <View style={styles.container}>
          <TextInput
            label="Email"
            value={addr}
            onChangeText={(addr) => setUrl({ addr })}
          />

          <Button
            style={styles.margins}
            mode="contained-tonal"
            onPress={() => check({ url })}
          >
            Login
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
