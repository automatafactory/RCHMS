import { useContext, useEffect, useState } from "react"
import { StyleSheet, View } from "react-native"
import { Provider, Menu, Divider, Button } from "react-native-paper"
import TopNavbar from "./Navbar/TopNavbar"
import BottomNavbar from "./Navbar/BottomNavbar"

function HomeScreen(props) {
  const navigation = props.navigation
  const api = props.route.params.url
  const token = props.route.params.token

  return (
    <Provider>
      <TopNavbar
        navigation={navigation}
        // openMenu={openMenu}
        setToken={props.route.params.setToken}
      />

      <BottomNavbar navigation={navigation} />
    </Provider>
  )
}

export default HomeScreen
