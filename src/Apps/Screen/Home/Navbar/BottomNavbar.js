import { useState } from "react"
import { BottomNavigation, Text } from "react-native-paper"
import QRCamaraScreen from "../../Camara/QRCamaraScreen"
import ListProvider from "../ListProvider"

const BottomNavbar = ({ navigation }) => {
  const [index, setIndex] = useState(0)
  const [routes] = useState([
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
    home: ListProvider,
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
