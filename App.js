//React
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
  withTheme,
} from "react-native-paper"
// Navigation
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import { NavigationContainer } from "@react-navigation/native"
const Stack = createNativeStackNavigator()

// Components
import Main from "./src/Apps/Screen/Home/Main"
import Setup from "./src/Apps/Screen/Auth/Setup/Setup"
import Login from "./src/Apps/Screen/Auth/Login/Login"
import QRCamaraScreen from "./src/Apps/Screen/Camara/QRCamaraScreen"

function CamareScreen({ navigation }) {
  return <QRCamaraScreen navigation={navigation} />
}
const theme = {
  ...DefaultTheme,
  roundness: 10,
  version: 3,
  mode: "adaptive",
  dark: true,
  // colors: {
  //   ...DefaultTheme.colors,
  //   primary: "#43C59E",
  //   secondary: "#3498db",
  // },
}

function App() {
  const { colors } = theme
  return (
    <PaperProvider theme={theme}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="Home"
            component={Main}
            options={{
              headerShown: false,
            }}
          />

          {/* <Stack.Screen
            name="CamaraScreen"
            component={CamareScreen}
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
          /> */}
          <Stack.Screen
            name="Setup"
            component={Setup}
            options={{
              headerShown: false,
            }}
          />

          <Stack.Screen
            name="Login"
            component={Login}
            options={{
              headerShown: false,
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </PaperProvider>
  )
}
export default withTheme(App)

AppRegistry.registerComponent(appName, () => App)
