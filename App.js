//React
import { useEffect, useState } from "react"
import { AppRegistry, View } from "react-native"
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
const Stack = createNativeStackNavigator()
// Storage
// import AsyncStorage from "@react-native-async-storage/async-storage"
// Components
import Home from "./src/Apps/Home/Home"
import Login from "./src/Apps/Auth/Login"
import { getToken } from "./src/Apps/GlobaVariable"

const theme = {
  ...DefaultTheme,
  roundness: 2,
  version: 3,
  // colors: {
  //   ...DefaultTheme.colors,
  //   primary: "#1E90FF",
  //   secondary: "#6495ed ",
  //   tertiary: "#a1b2c3",
  // },
}

export default function App() {
  const [auth, setAuth] = useState(true)

  // const value = getToken()
  // if (value != undefined) {
  //   setAuth(true)
  // }

  // useEffect(() => {
  //   const value = getToken()
  //   if (value !== null) setAuth(true)
  // })
  return (
    <NavigationContainer>
      <PaperProvider theme={theme}>
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
      </PaperProvider>
    </NavigationContainer>
  )
  // return (
  //   <View>
  //     <Home initialParams={{ setAuth }} />
  //   </View>
  // )
}
