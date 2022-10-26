import React, { useState, useEffect } from "react"
import { View, StyleSheet, Alert } from "react-native"
import {
  Text,
  Button,
  IconButton,
  Portal,
  Paragraph,
  Dialog,
} from "react-native-paper"
import codeProcesser from "../../Components/codeProcesser"
import { Camera, CameraType } from "expo-camera"
import { BarCodeScanner } from "expo-barcode-scanner"
import HomeScreen from "../Home/HomeScreen"

export default function QRCamaraScreen(props, { navigation }) {
  const setHistory = props.route.params.setHistory
  // const { setHistory } = props
  const [flash, setFlash] = useState("off")
  const [permission, requestPermission] = Camera.useCameraPermissions()
  const [scanned, setScanned] = useState(false)
  const [x, setX] = useState(0)
  const [y, setY] = useState(0)
  const [width, setWidth] = useState(0)
  const [height, setHight] = useState(0)

  const [visible, setVisible] = useState({
    status: false,
    head: "",
    body: "",
    callback: "",
  })
  const showDialog = (msg) => setVisible(msg)
  const hideDialog = () => setVisible({ status: false })

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
  const handleBarCodeScanned = ({ type, data, bounds }) => {
    setScanned(true)
    const { origin, size } = bounds
    setX(origin.x)
    setY(origin.y)
    setWidth(size.width)
    setHight(size.height)
    const tag = idExtracter(data)

    !tag
      ? showDialog({
          status: true,
          head: "Not Found",
          body: `Not valid tag. Reading data: ${data}`,
          btn_action: "Try again",
          callback: () => {
            setVisible({ status: false }) && setScanned(false)
          },
        })
      : showDialog({
          status: true,
          head: tag,
          body: `Details: ${data}`,
          btn_action: "Save",
          callback: () => {
            doSave(data, setHistory)
          },
        })
    console.log("Type: " + type + "\nData: " + data)
  }

  const doSave = async (data, setHistory) => {
    const temp = await codeProcesser(data, setHistory)
    console.log("temp", temp)
    if (temp) {
      setVisible({ status: false })
    }
  }

  return (
    <View style={styles.container}>
      <BarCodeScanner
        barCodeScannerSettings={
          {
            // barCodeTypes: [BarCodeScanner.Constants.BarCodeType.qr],
          }
        }
        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
        style={StyleSheet.absoluteFillObject}
      />

      <View
        style={{
          position: "absolute",
          top: y,
          left: x,
          width: width,
          height: height,
          borderColor: "red",
          borderWidth: 1,
        }}
      ></View>

      <Portal>
        <Dialog visible={visible.status} onDismiss={hideDialog}>
          <Dialog.Title>{visible.head}</Dialog.Title>
          <Dialog.Content>
            <Paragraph>{visible.body}</Paragraph>
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={visible.callback}>{visible.btn_action}</Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>

      <View style={styles.row}>
        <IconButton
          icon="refresh"
          style={styles.btn}
          disabled={!scanned ? true : false}
          mode="contained"
          size={40}
          onPress={() => setScanned(false)}
        />

        {/* <IconButton
          icon="flash"
          style={styles.btn}
          mode="contained"
          size={40}
          onPress={() => navigation.goBack()}
        /> */}
        {/* <IconButton
          icon={cameraIcon}
          style={styles.btn}
          mode="contained"
          size={40}
          onPress={toggleCameraType}
        /> */}
      </View>
    </View>
  )
}

const idExtracter = (raw) => {
  raw = raw.split(/\r?\n/)
  raw = Object.values(raw)
  return raw[5]
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

    flexDirection: "row",
    justifyContent: "space-evenly",
    alignContent: "center",
  },

  btn: {
    // padding: 10,
    margin: 4,
  },
})
