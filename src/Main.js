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
  const [isSignedIn, setSignedIn] = useState()
  //   save("token", "htyhney6547nurtnju56nyyetuyt-neye5y")
  //   save("url", "192.168.1.2:8000")
  //   const isSignedIn = get("token")
  //   const url = get("url")

  const url = "10.140.8.126:8000"

  console.log("> > > > >", isSignedIn)
  console.log("> > > > >", url)

  return (
    <NavigationContainer>
      {isSignedIn ? (
        <Stack.Navigator>
          <>
            <Stack.Screen
              name="Home"
              component={HomeScreen}
              options={{
                headerShown: false,
              }}
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
            initialParams={{ url: url, setSignedIn: setSignedIn }}
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
