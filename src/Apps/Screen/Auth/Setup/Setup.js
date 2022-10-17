import { useState, useEffect } from "react"
import { View, StyleSheet, StatusBar, Image } from "react-native"
import { TextInput, Button, Text, MD3LightTheme } from "react-native-paper"
import storage from "../../../Components/storage"
import updateURL from "./updateURL"

const theme = {
  ...MD3LightTheme,
  colors: {
    ...MD3LightTheme.colors,
  },
}

export default function Setup({ navigation }) {
  // Veriables
  const defaultServer = "192.168.1.2:8000"
  // State
  const [estatus, setEstatus] = useState(false)
  const [url, setURL] = useState()
  const [api, setApi] = useState()

  storage
    .load({
      key: "api",
      autoSync: true,
      syncInBackground: true,
      syncParams: {
        someFlag: true,
      },
    })
    .then((ret) => {
      setApi(ret.api)
    })
    .catch((err) => {
      setApi(undefined)
    })
  if (!api) {
    console.log("No api found. Access setup page")

    return (
      <View style={StyleSheet.absoluteFillObject}>
        <View style={styles.container}>
          <View style={styles.imgcontainer}>
            <Image
              source={require("../../../../assets/icon.png")}
              style={styles.img}
            />
            <Text style={styles.text} variant="displayLarge">
              Hampo
            </Text>
          </View>
          <View style={styles.wrapper}>
            {estatus ? (
              <Text style={styles.errtext}>
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
              onChangeText={() => setURL(url)}
            />

            <Button
              style={styles.margins}
              mode="contained"
              onPress={() => updateURL(url, navigation, setEstatus)}
            >
              Connect
            </Button>
            <Button
              style={styles.margins}
              mode="text"
              onPress={() => updateURL(defaultServer, navigation, setEstatus)}
            >
              Default
            </Button>
          </View>
          <Text> Tanbin Hassan © 2022 - All Rights Reserved.</Text>
        </View>

        <StatusBar style="auto" />
      </View>
    )
  } else {
    console.log(`Api ${api} found. Access setup page`)
    navigation.navigate("Login")
  }
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
