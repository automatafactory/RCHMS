import React, { useState, useEffect } from "react"
import { View, StyleSheet } from "react-native"
import { Text, Button, MD3LightTheme as DefaultTheme } from "react-native-paper"
import codeProcesser from "../../Components/codeProcesser"
import { Camera } from "expo-camera"

export default function QRCamaraScreen({ setHistory }) {
  const [hasPermission, setHasPermission] = useState(null)
  const [scanned, setScanned] = useState(false)

  const askForCameraPermission = () => {
    ;(async () => {
      const { status } = await Camera.requestPermissionsAsync()
      setHasPermission(status === "granted")
    })()
  }

  // Request Camera Permission
  useEffect(() => {
    askForCameraPermission()
  }, [])

  // What happens when we scan the bar code
  const handleBarCodeScanned = ({ type, data }) => {
    setScanned(true)
    codeProcesser(data, setHistory)
    console.log("Type: " + type + "\nData: " + data)
  }
  // Check permissions and return the screens
  if (hasPermission === null) {
    return (
      <View style={styles.container}>
        <Text>Requesting for camera permission</Text>
      </View>
    )
  }
  if (hasPermission === false) {
    return (
      <View style={styles.container}>
        <Text style={{ margin: 10 }}>No access to camera</Text>
        <Button
          title={"Allow Camera"}
          onPress={() => askForCameraPermission()}
        />
      </View>
    )
  }

  // Return the View
  return (
    <View style={styles.container}>
      <Camera
        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
        style={StyleSheet.absoluteFillObject}
      />

      <View style={styles.row}>
        <Button
          mode="contained"
          icon="send"
          style={styles.btn}
          onPress={() => codeProcesser(text, setHistory)}
        >
          Submit
        </Button>

        <Button
          icon="refresh"
          style={styles.btn}
          disabled={!scanned ? true : false}
          mode="contained"
          onPress={() => setScanned(false)}
        >
          Scan Again
        </Button>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
    flexDirection: "column",
    justifyContent: "flex-end",
    alignContent: "flex-end",
  },
  row: {
    width: "100%",
    padding: 20,
    backgroundColor: "#000",
    flexDirection: "row",
    justifyContent: "flex-start",
    alignContent: "center",
  },

  btn: {
    margin: 10,
  },
})
