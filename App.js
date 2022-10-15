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
import storage from "./src/Apps/Components/storage"

const Stack = createNativeStackNavigator()

// Components
import Home from "./src/Apps/Screen/Home/Home"
import Login from "./src/Apps/Screen/Auth/Login"

const theme = {
  ...DefaultTheme,
  roundness: 10,
  version: 3,
  mode: "adaptive",
  dark: false,
  // colors: {
  //   ...DefaultTheme.colors,
  //   primary: "#3498db",
  // },
}

export default function App() {
  // console.log(Appearance)
  storage.save({
    key: "loginState",
    data: JSON.stringify({ token: "valud" }),
  })
  const [auth, setAuth] = useState(true)

  useEffect(() => {
    async function fetchData() {
      await storage
        .load({
          key: "loginState",
          autoSync: true,
        })
        .then((ret) => {
          // found data go to then()
          const _token = JSON.parse(ret)
          if (_token.token) setAuth(true)
          if (!_token.token) setAuth(false)
        })
        .catch((err) => {
          setAuth(false)
        })
    }
    fetchData()
  }, [])

  return (
    <PaperProvider theme={theme}>
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
    </PaperProvider>
  )
}
AppRegistry.registerComponent(appName, () => App)
