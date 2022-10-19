import { useContext, useEffect, useState } from "react"
import { StyleSheet, View } from "react-native"
import { Searchbar } from "react-native-paper"
import TopNavbar from "./Navbar/TopNavbar"
import BottomNavbar from "./Navbar/BottomNavbar"

function HomeScreen({ navigation }) {
  return (
    <>
      <TopNavbar navigation={navigation} />
      {/* <BottomNavbar /> */}
    </>
  )
}

export default HomeScreen
