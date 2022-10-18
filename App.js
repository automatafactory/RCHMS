//React
import { AppRegistry, View } from "react-native"
// Expo App
import { StatusBar } from "expo-status-bar"
// App Name
import { name as appName } from "./app.json"

import ThemeProvider from "./src/ThemeProvider"

export default function App() {
  return (
    <>
      <StatusBar />
      <ThemeProvider />
    </>
  )
}

AppRegistry.registerComponent(appName, () => App)
