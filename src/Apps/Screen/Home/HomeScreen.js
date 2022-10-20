import { useContext, useEffect, useState } from "react"
import { StyleSheet, View } from "react-native"
import { Searchbar } from "react-native-paper"
import TopNavbar from "./Navbar/TopNavbar"
import BottomNavbar from "./Navbar/BottomNavbar"

function HomeScreen(props) {
  const navigation = props.navigation
  const api = props.route.params.url
  const token = props.route.params.token

  return (
    <>
      <TopNavbar
        navigation={navigation}
        setToken={props.route.params.setToken}
      />
      <BottomNavbar navigation={navigation} />
    </>
  )
}

export default HomeScreen
