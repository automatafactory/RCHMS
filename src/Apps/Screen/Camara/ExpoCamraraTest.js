import React, { useState, useEffect } from "react"
import { Text, View, StyleSheet } from "react-native"
import { Button } from "react-native-paper"
import { BarCodeScanner } from "expo-barcode-scanner"
import { Camera } from "expo-camera"

export default function App() {
  const [hasPermission, setHasPermission] = useState(null)
  const [scanned, setScanned] = useState(false)
  const [facingCamara, setFacingCamara] = useState("back")
  useEffect(() => {
    const getBarCodeScannerPermissions = async ({ setHistory }) => {
      const { status } = await BarCodeScanner.requestPermissionsAsync()
      setHasPermission(status === "granted")
    }
    getBarCodeScannerPermissions()
  }, [])

  const handleBarCodeScanned = ({ type, data }) => {
    setScanned(true)
    codeProcesser(data, setHistory)
    alert(`Bar code with type ${type} and data ${data} has been scanned!`)
  }

  if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>
  }

  return (
    <View style={styles.container}>
      <Camera
        // barCodeScannerSettings={{
        //   barCodeTypes: [BarCodeScanner.Constants.BarCodeType.qr],
        // }}
        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
        type={facingCamara}
        style={StyleSheet.absoluteFillObject}
      />
      {/* {scanned && (
        <Button title={"Tap to Scan Again"} onPress={() => setScanned(false)} />
      )} */}

      <View style={styles.row}>
        <Button
          mode="contained"
          icon="disk"
          style={styles.btn}
          onPress={() => codeProcesser(text, setHistory)}
        >
          Save
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
})
