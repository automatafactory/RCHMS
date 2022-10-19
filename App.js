//React
import { AppRegistry } from "react-native"
// Expo App
import { StatusBar } from "expo-status-bar"
// App Name
import { name as appName } from "./app.json"
import moduleProvider from "./src/moduleProvider"

export default function App() {
  return (
    <>
      <StatusBar />
      <moduleProvider />
    </>
  )
}

AppRegistry.registerComponent(appName, () => App)
