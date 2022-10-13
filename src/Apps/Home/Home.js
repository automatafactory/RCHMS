import * as React from "react"
import { StatusBar } from "expo-status-bar"
import { StyleSheet, Text, View } from "react-native"
import {
  Paragraph,
  Dialog,
  Portal,
  Provider,
  Button,
  Appbar,
  withTheme,
} from "react-native-paper"
import QrScanner from "../Components/QrScanner"
import { createNativeStackNavigator } from "@react-navigation/native-stack"

function HomeScreen({ navigation, route }) {
  console.log("======= Called Home ========")
  const { setVisible, setAuth } = route.params

  // Navbar
  const _handleMore = () => console.log("Shown more")
  return (
    <View>
      <Appbar.Header elevated mode="large">
        <Appbar.BackAction onPress={() => setVisible(true)} />
        <Appbar.Content title="Hampo" />
        <Appbar.Action
          icon="qrcode-scan"
          onPress={() => navigation.navigate("CamaraScreen")}
        />
        <Appbar.Action icon="power" onPress={() => setAuth(false)} />
        <Appbar.Action icon="dots-vertical" onPress={_handleMore} />
      </Appbar.Header>
    </View>
  )
}

function CamaraScreen({ navigation }) {
  return <QrScanner />
}

function Home({ route, theme }) {
  // Theme properties
  const { colors } = theme
  const Stack = createNativeStackNavigator()
  const [visible, setVisible] = React.useState(false)
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
          initialParams={{ setVisible, setAuth }}
        />
        <Stack.Screen
          name="CamaraScreen"
          component={CamaraScreen}
          // initialParams={{ setAuth }}
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
      <Provider>
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
      </Provider>
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
