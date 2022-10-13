//React
import { useEffect, useState } from "react"
import { AppRegistry, View, Appearance, PlatformColor } from "react-native"
// Expo App
import { StatusBar } from "expo-status-bar"
// App Name
import { name as appName } from "./app.json"
//Theam
import {
  MD3LightTheme as DefaultTheme,
  Provider as PaperProvider,
  Text,
} from "react-native-paper"
// Navigation
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import { NavigationContainer } from "@react-navigation/native"
import storage from "./src/Apps/storage"

const Stack = createNativeStackNavigator()
// Storage
// import AsyncStorage from "@react-native-async-storage/async-storage"
// Components
import Home from "./src/Apps/Home/Home"
import Login from "./src/Apps/Auth/Login"

// const theme = {
//   ...DefaultTheme,
//   roundness: 2,
//   version: 3,
//   mode: "exact",
//   dark: false,
//   colors: {
//     ...DefaultTheme.colors,
//     primary: "#3498db",
//   },
// }

async function fetchToken() {
  await storage
    .load({
      key: "loginState",
      autoSync: true,
    })
    .then((ret) => {
      console.log(ret)
      return true
    })
    .catch((err) => {
      switch (err.name) {
        case "NotFoundError":
          return "NotFoundError"
          break
        case "ExpiredError":
          return false
          break
      }
    })
}

export default function App() {
  // console.log(Appearance)
  const [auth, setAuth] = useState(true)

  fetchToken().then((ret) => {
    console.log(ret)
  })

  // useEffect(() => {
  //   async function fetchData() {
  //     await storage
  //       .load({
  //         key: "loginState",
  //         autoSync: true,
  //       })
  //       .then((ret) => {
  //         // found data go to then()
  //         console.log("================ret====================")
  //         console.log(ret)
  //         setAuth(true)
  //       })
  //       .catch((err) => {
  //         setAuth(false)
  //       })
  //   }
  //   fetchData()
  // }, [])

  return (
    <>
      {/* <PaperProvider theme={theme}> */}
      <StatusBar style="light" />
      <NavigationContainer>
        <Stack.Navigator>
          {auth ? (
            <Stack.Screen
              name="Home"
              component={Home}
              options={{
                headerShown: false,
              }}
              initialParams={{ setAuth }}
            />
          ) : (
            <Stack.Screen
              name="Login"
              component={Login}
              options={{
                headerShown: false,
              }}
            />
          )}
        </Stack.Navigator>
      </NavigationContainer>
      {/* </PaperProvider> */}
    </>
  )
}
AppRegistry.registerComponent(appName, () => App)
