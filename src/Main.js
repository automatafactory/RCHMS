// Navigation
import { useState } from "react"
import { withTheme, Text, Button } from "react-native-paper"
import * as SecureStore from "expo-secure-store"
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import { NavigationContainer } from "@react-navigation/native"
const Stack = createNativeStackNavigator()

// Components
import HomeScreen from "./Apps/Screen/Home/HomeScreen"
import Setup from "./Apps/Screen/Auth/Setup/Setup"
import Login from "./Apps/Screen/Auth/Login/Login"
import QRCamaraScreen from "./Apps/Screen/Camara/QRCamaraScreen"
import { get, save } from "./Apps/Components/vault"

const Main = ({ colors }) => {
  const [token, setToken] = useState()
  //   save("token", "htyhney6547nurtnju56nyyetuyt-neye5y")
  //   save("url", "192.168.1.2:8000")
  //   const token = get("token")
  //   const url = get("url")

  const url = "192.168.0.5:8000"

  console.log("> > > > >", token)
  console.log("> > > > >", url)

  return (
    <NavigationContainer>
      {token ? (
        <Stack.Navigator>
          <>
            <Stack.Screen
              name="Home"
              component={HomeScreen}
              options={{
                headerShown: false,
              }}
              initialParams={{ url: url, token: token, setToken: setToken }}
            />
            <Stack.Screen
              name="CamaraScreen"
              component={QRCamaraScreen}
              options={{
                title: "Back to Home",
                headerStyle: {
                  backgroundColor: colors.surfaceVariant,
                },
                headerTintColor: colors.onSurfaceVariant,
                headerTitleStyle: {
                  fontWeight: "bold",
                },
              }}
            />
          </>
        </Stack.Navigator>
      ) : (
        <Stack.Navigator initialRouteName={url ? Login : Setup}>
          <Stack.Screen
            name="Login"
            component={Login}
            options={{
              headerShown: false,
            }}
            initialParams={{ url: url, setToken: setToken }}
          />
          <Stack.Screen
            name="Setup"
            component={Setup}
            options={{
              title: "Back Login",
              headerStyle: {
                backgroundColor: colors.surfaceVariant,
              },
              headerTintColor: colors.onSurfaceVariant,
              headerTitleStyle: {
                fontWeight: "bold",
              },
            }}
            initialParams={{ url: url }}
          />
        </Stack.Navigator>
      )}
    </NavigationContainer>
  )
}
export default withTheme(Main)
