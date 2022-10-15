import React, { useState, useEffect } from "react"
import { View, StyleSheet } from "react-native"
import { Text, Button } from "react-native-paper"
// import { BarCodeScanner } from "expo-barcode-scanner"
import { Camera } from "expo-camera"

export default function QRCamaraScreen() {
  const [hasPermission, setHasPermission] = useState(null)
  const [scanned, setScanned] = useState(false)
  const [text, setText] = useState("Not yet scanned")

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
    setText(data)
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
      <View style={styles.barcodebox}>
        <Camera
          onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
          style={{ height: 400, width: 400 }}
        />
      </View>
      <Text style={styles.maintext}>{text}</Text>
      <View style={styles.btnview}>
        <Button
          mode="contained"
          icon="send"
          style={styles.btn}
          onPress={() => console.log("Pressed")}
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
    alignItems: "center",
    width: "100%",
    // justifyContent: "center",
  },
  maintext: {
    backgroundColor: "#000",
    color: "white",
    fontSize: 20,
    padding: 20,
    textAlign: "center",

    width: "100%",
  },
  btnview: {
    padding: "20%",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",

    width: "100%",
  },
  btn: {
    padding: 10,
    margin: 10,

    // borderRadius: "50%",
  },
  barcodebox: {
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    overflow: "hidden",
    backgroundColor: "#000000",
  },
})
