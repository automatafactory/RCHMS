import { useState, useEffect } from "react"
import { BottomNavigation, Text } from "react-native-paper"
import QRCamaraScreen from "../../Camara/QRCamaraScreen"
import CamaraApp from "../../Camara/ExpoCamraraTest"

import ListProvider from "../ListProvider"

const BottomNavbar = ({ navigation, history, setHistory }) => {
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

  return (
    <BottomNavigation
      navigationState={{ index, routes }}
      onIndexChange={setIndex}
      renderScene={({ route, jumpTo }) => {
        switch (route.key) {
          case "home":
            return (
              <ListProvider
                history={history}
                setHistory={setHistory}
                jumpTo={jumpTo}
              />
            )
          case "camara":
            return <QRCamaraScreen setHistory={setHistory} jumpTo={jumpTo} />
        }
      }}
    />
  )
}

export default BottomNavbar
