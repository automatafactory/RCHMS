import React, { useState, useEffect } from "react"
import { StyleSheet, Text, View } from "react-native"
import { Button } from "react-native-paper"
import { BarCodeScanner } from "expo-barcode-scanner"
import { Camera } from "expo-camera"
import codeProcesser from "./codeProcesser"

const QrScanner = () => {
  const [hasPermission, setHasPermission] = useState(null)
  const [scanned, setScanned] = useState(false)

  useEffect(() => {
    const getBarCodeScannerPermissions = async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync()
      setHasPermission(status === "granted")
    }

    getBarCodeScannerPermissions()
  }, [])

  const handleBarCodeScanned = async ({ type, data }) => {
    try {
      setScanned(true)
      let _data = await codeProcesser(type, data)
      _data = JSON.stringify(_data)
      alert(`Bar code with type ${type} and data ${_data} has been scanned!`)
      goBack()
    } catch (e) {
      return e
    }
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
        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
        style={StyleSheet.absoluteFillObject}
        barCodeTypes={[BarCodeScanner.Constants.BarCodeType.qr]}
      />

      {/* <View style={styles.row}>
        <Text style={styles.text} variant="displaySmall">
          Display small
        </Text>
      </View> */}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    // backgroundColor: "#000000", // the rock-solid workaround
    flexDirection: "row",
    alignItemsArr: "center",
    // height: "100%",
    width: "100%",
  },
  text: {
    margin: 50,
  },
  row: {
    width: "100%",
    flexDirection: "row",
    // backgroundColor: "#000077",
  },
})

export default QrScanner
