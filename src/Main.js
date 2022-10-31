// Navigation
import { withTheme, Text, Button } from "react-native-paper"
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import { NavigationContainer } from "@react-navigation/native"
const Stack = createNativeStackNavigator()

// ! context menu
import { HistoryProvider } from "./Apps/Components/contexts/HistoryProvider"
import { LoginProvider } from "./Apps/Components/contexts/LoginContext"
import { ApiProvider } from "./Apps/Components/contexts/ApiContext"

import HomeScreen from "./Apps/Screen/Home/HomeScreen"
import Setup from "./Apps/Screen/Auth/Setup/Setup"
import Login from "./Apps/Screen/Auth/Login/Login"
import QRCamaraScreen from "./Apps/Screen/Camara/QRCamaraScreen"

const Main = ({ theme, colorScheme }) => {
  console.log("Address :>> Main")

  return (
    <ApiProvider>
      <LoginProvider>
        <HistoryProvider>
          <NavigationContainer>
            <Stack.Navigator initialRouteName="Home">
              <Stack.Screen
                name="Home"
                component={HomeScreen}
                options={{
                  headerShown: false,
                }}
                initialParams={{
                  theme: theme,
                }}
              />

              <Stack.Screen
                name="CamaraScreen"
                component={QRCamaraScreen}
                options={{
                  title: "Back to Home",
                  headerStyle: {
                    backgroundColor: theme.colors.primaryContainer,
                  },
                  headerTintColor: theme.colors.onSurfaceVariant,
                  headerTitleStyle: {
                    fontWeight: "bold",
                  },
                }}
              />

              <Stack.Screen
                name="Login"
                component={Login}
                options={{
                  headerShown: false,
                }}
                initialParams={{
                  theme: theme,
                  colorScheme: colorScheme,
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
                initialParams={{ theme: theme }}
              />
            </Stack.Navigator>
          </NavigationContainer>
        </HistoryProvider>
      </LoginProvider>
    </ApiProvider>
  )
}
export default withTheme(Main)
