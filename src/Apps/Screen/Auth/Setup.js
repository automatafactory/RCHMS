import * as React from "react"
import { useState } from "react"
import { View, StyleSheet, StatusBar, Image, Alert } from "react-native"
import {
  TextInput,
  Button,
  Text,
  Title,
  Avatar,
  MD3LightTheme,
} from "react-native-paper"
import storage from "../../Components/storage"

const theme = {
  ...MD3LightTheme,
  colors: {
    ...MD3LightTheme.colors,
  },
}

const check = async ({ apiUrl, navigation, setConerr }) => {
  console.log("url", apiUrl)

  if (!apiUrl) {
    Alert.alert("Error", "Please enter a Api Server Address")
    return
  }

  await fetch(`http://${apiUrl}/test`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  })
    .then((response) => {
      if (response.status != "200") {
        alert(
          `Error connecting with server failed Status Code ${response.status}`
        )
        console.log(response)
        setConerr(false)
        return
      } else {
        storage
          .save({
            key: "api",
            data: JSON.stringify(apiUrl),
          })
          .then(() => {
            navigation.navigate("Login")
          })
      }
    })

    .catch((error) => {
      console.error(error)
    })
}

export default function Setup({ navigation }) {
  const [conerr, setConerr] = useState(async () => {
    await storage.load({
      key: "api",
    })
  })

  console.log(conerr)

  const [apiUrl, setApiUrl] = useState()

  return (
    <View style={StyleSheet.absoluteFillObject}>
      <View style={styles.container}>
        <View style={styles.imgcontainer}>
          <Image
            source={require("../../../assets/icon.png")}
            style={styles.img}
          />

          <Text style={styles.text} variant="displayLarge">
            Hampo
          </Text>
        </View>

        <View style={styles.wrapper}>
          {conerr ? (
            <Text style={styles.errtext}>
              Error Connecting to server please check the address of the server
              of your connection.
            </Text>
          ) : null}

          <TextInput
            error={conerr}
            label="Server Address"
            placeholder="eg: 192.168.0.1:8000"
            value={apiUrl}
            mode="outlined"
            onChangeText={(apiUrl) => setApiUrl(apiUrl)}
          />

          <Button
            style={styles.margins}
            mode="contained"
            onPress={() => check({ apiUrl, navigation, setConerr })}
          >
            Connect
          </Button>
        </View>
        <Text> Tanbin Hassan © 2022 - All Rights Reserved.</Text>
      </View>

      <StatusBar style="auto" />
    </View>
  )
}
const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.surfaceVariant,
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
