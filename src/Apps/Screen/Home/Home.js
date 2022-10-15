import * as React from "react"
import { StatusBar } from "expo-status-bar"
import { Alert, StyleSheet, View } from "react-native"
import {
  Paragraph,
  Dialog,
  Portal,
  Provider,
  Button,
  Appbar,
  withTheme,
  Text,
} from "react-native-paper"
import QRCamaraScreen from "../Camara/QRCamaraScreen"
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import Navbar from "../Navbar/Navbar"

function HomeScreen({ navigation }) {
  return (
    <View>
      <Navbar navigation={navigation} />
    </View>
  )
}
function CamareScreen({ navigation }) {
  return <QRCamaraScreen navigation={navigation} />
}

function Home({ navigate, route, theme }) {
  // Theme properties
  const { colors } = theme
  const Stack = createNativeStackNavigator()
  const showDialog = () => setVisible(true)
  const hideDialog = () => setVisible(false)
  const gotoCamara = () => navigate("CamaraScreen")

  const { setAuth } = route.params
  return (
    <View style={styles.container}>
      {/* Navigator Start */}

      <Stack.Navigator>
        <Stack.Screen
          name="TableScreen"
          component={HomeScreen}
          options={{
            headerShown: false,
          }}
          // initialParams={{ setVisible, setAuth }}
        />
        <Stack.Screen
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
        />
      </Stack.Navigator>

      {/* 
            Navigator End
--------------------------------------------
            Popup Start 
            
            */}
      {/* <Provider>
        <Portal>
          <Dialog visible={visible}>
            <Dialog.Content>
              <Paragraph>Do you like to exit this app?</Paragraph>
            </Dialog.Content>
            <Dialog.Actions>
              <Button>Yes</Button>
              <Button onPress={hideDialog}>No</Button>
            </Dialog.Actions>
          </Dialog>
        </Portal>
      </Provider> */}
      <StatusBar style="auto" />
    </View>
  )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
})

export default withTheme(Home)
