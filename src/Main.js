// Navigation
import { useState, useEffect } from "react"
import { withTheme, Text, Button } from "react-native-paper"
import * as SecureStore from "expo-secure-store"
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import { NavigationContainer } from "@react-navigation/native"
import storage from "./Apps/Components/storage"
const Stack = createNativeStackNavigator()

// Components
import HomeScreen from "./Apps/Screen/Home/HomeScreen"
import Setup from "./Apps/Screen/Auth/Setup/Setup"
import Login from "./Apps/Screen/Auth/Login/Login"
import QRCamaraScreen from "./Apps/Screen/Camara/QRCamaraScreen"
import { get, save } from "./Apps/Components/vault"

const Main = ({ theme }) => {
  const [token, setToken] = useState(async () => {
    const data = await SecureStore.getItemAsync("token")
    if (data) {
      console.log("Token=>>", data)

      return data
    } else {
      return false
    }
  })
  const url = "192.168.1.2:8000"

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
              initialParams={{
                url: url,
                token: token,
                setToken: setToken,
                theme: theme,
              }}
            />
            <Stack.Screen
              name="CamaraScreen"
              component={QRCamaraScreen}
              options={{
                title: "Back to Home",
                headerStyle: {
                  backgroundColor: theme.colors.surfaceVariant,
                },
                headerTintColor: theme.colors.onSurfaceVariant,
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
            initialParams={{
              url: url,
              setToken: setToken,
              theme: theme,
            }}
          />
          <Stack.Screen
            name="Setup"
            component={Setup}
            options={{
              title: "Back Login",
              headerStyle: {
                backgroundColor: theme.colors.surfaceVariant,
              },
              headerTintColor: theme.colors.onSurfaceVariant,
              headerTitleStyle: {
                fontWeight: "bold",
              },
            }}
            initialParams={{ url: url, theme: theme }}
          />
        </Stack.Navigator>
      )}
    </NavigationContainer>
  )
}
export default withTheme(Main)
