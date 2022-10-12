import React, { useState, useEffect } from "react"
import { StyleSheet, Text, View } from "react-native"
import { Button } from "react-native-paper"
import { Camera } from "react-native-vision-camera"
import codeProcesser from "./codeProcesser"

const QrScanner = () => {
  const [hasPermission, setHasPermission] = useState(null)
  const [scanned, setScanned] = useState(false)

  useEffect(() => {
    const getBarCodeScannerPermissions = async () => {
      const { status } = await Camera.getCameraPermissionStatus()
      setHasPermission(status === "granted")
    }

    getBarCodeScannerPermissions()
  }, [])

  if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>
  }

  const devices = useCameraDevices()
  const device = devices.back

  if (device == null) return <LoadingView />
  return (
    <Camera style={StyleSheet.absoluteFill} device={device} isActive={true} />
  )
  //   return (
  //     <View style={styles.container}>
  //       <View style={styles.test}>
  //         <View style={styles.row}>
  //           {/* <Camera
  //           onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
  //           // style={StyleSheet.absoluteFillObject}
  //           barCodeTypes={[BarCodeScanner.Constants.BarCodeType.qr]}
  //         /> */}
  //         </View>
  //         <View style={styles.row}>
  //           <Text style={styles.text} variant="displaySmall">
  //             Display small
  //           </Text>
  //         </View>
  //         <View style={styles.row}>
  //           <Button
  //             style={styles.btn}
  //             icon="camera"
  //             mode="contained"
  //             onPress={() => console.log("Pressed")}
  //           >
  //             Press me
  //           </Button>
  //         </View>
  //       </View>
  //     </View>
  //   )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#000000", // the rock-solid workaround
    flexDirection: "row",
    alignItemsArr: "center",
    height: "100%",
    width: "100%",
  },
  text: {
    margin: 50,
  },
  row: {
    width: "100%",
    flexDirection: "row",
    backgroundColor: "#000077",
  },
  btn: {
    margin: 50,
  },
  test: {
    width: "100%",
    height: "100%",
  },
})

export default QrScanner
