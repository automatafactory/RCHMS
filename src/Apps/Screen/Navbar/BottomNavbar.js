import * as React from "react"
import { BottomNavigation, Text } from "react-native-paper"
import QRCamaraScreen from "../Camara/QRCamaraScreen"
import Home from "../Home/Home"

const BottomNavbar = () => {
  const [index, setIndex] = React.useState(0)
  const [routes] = React.useState([
    {
      key: "home",
      title: "Home",
      focusedIcon: "home",
      unfocusedIcon: "home-outline",
    },
    {
      key: "camara",
      title: "QR",
      focusedIcon: "qrcode-scan",
    },
  ])

  const renderScene = BottomNavigation.SceneMap({
    home: Home,
    camara: QRCamaraScreen,
  })

  return (
    <BottomNavigation
      navigationState={{ index, routes }}
      onIndexChange={setIndex}
      renderScene={renderScene}
    />
  )
}

export default BottomNavbar