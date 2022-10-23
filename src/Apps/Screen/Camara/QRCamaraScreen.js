import React, { useState, useEffect } from "react"
import { View, StyleSheet } from "react-native"
import { Text, Button, IconButton } from "react-native-paper"
import codeProcesser from "../../Components/codeProcesser"
import { Camera, CameraType } from "expo-camera"
import { BarCodeScanner } from "expo-barcode-scanner"

export default function QRCamaraScreen({ setHistory }) {
  const [type, setType] = useState(CameraType.back)
  const [flash, setFlash] = useState("off")
  const [permission, requestPermission] = Camera.useCameraPermissions()
  const [scanned, setScanned] = useState(false)
  if (!permission) {
    // Camera permissions are still loading
    return <View />
  }

  if (!permission.granted) {
    // Camera permissions are not granted yet
    return (
      <View style={styles.container}>
        <Text style={{ textAlign: "center" }}>
          We need your permission to show the camera
        </Text>
        <Button onPress={requestPermission} title="grant permission" />
      </View>
    )
  }

  function toggleCameraType() {
    setType((current) =>
      current === CameraType.back ? CameraType.front : CameraType.back
    )
  }
  function toggleCameraFlash() {
    setFlash((current) => (current === "off" ? "on" : "off"))
  }

  // What happens when we scan the bar code
  const handleBarCodeScanned = ({ type, data }) => {
    setScanned(true)
    codeProcesser(data, setHistory)
    console.log("Type: " + type + "\nData: " + data)
  }

  return (
    <View style={styles.container}>
      <Camera
        barCodeScannerSettings={{
          barCodeTypes: [BarCodeScanner.Constants.BarCodeType.qr],
        }}
        type={type}
        flashMode={flash}
        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
        style={StyleSheet.absoluteFillObject}
      />

      <View style={styles.row}>
        <IconButton
          mode="contained"
          icon="send"
          style={styles.btn}
          onPress={() => codeProcesser(text, setHistory)}
        />

        <IconButton
          icon="refresh"
          style={styles.btn}
          disabled={!scanned ? true : false}
          mode="contained"
          onPress={() => setScanned(false)}
        />

        <IconButton
          icon="flash"
          style={styles.btn}
          mode="contained"
          onPress={toggleCameraFlash}
        />
        <IconButton
          icon="camera"
          style={styles.btn}
          mode="contained"
          onPress={toggleCameraType}
        />
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
    paddingBottom: 30,
  },
  row: {
    width: "100%",
    padding: 10,
    // backgroundColor: "#000",
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignContent: "center",
  },

  btn: {
    // padding: 10,
    margin: 4,
  },
})
