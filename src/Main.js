// // Navigation
// import { withTheme } from "react-native-paper"
// import { createNativeStackNavigator } from "@react-navigation/native-stack"
// import { NavigationContainer } from "@react-navigation/native"
// const Stack = createNativeStackNavigator()

// // Components
// import HomeScreen from "./Apps/Screen/Home/HomeScreen"
// import Setup from "./Apps/Screen/Auth/Setup/Setup"
// import Login from "./Apps/Screen/Auth/Login/Login"
// import QRCamaraScreen from "./Apps/Screen/Camara/QRCamaraScreen"

// const CamareScreen = ({ navigation }) => {
//   return <QRCamaraScreen navigation={navigation} />
// }

// const Main = ({ colors }) => {
//   return (
//     <NavigationContainer>
//       <Stack.Navigator
//         initialRouteName="Home"
//         screenOptions={{
//           headerMode: "screen",
//           headerTintColor: "white",
//           headerStyle: { backgroundColor: "tomato" },
//         }}
//       >
//         <Stack.Screen
//           name="Home"
//           component={HomeScreen}
//           options={{
//             headerShown: false,
//           }}
//         />

//         <Stack.Screen
//           name="CamaraScreen"
//           component={CamareScreen}
//           options={{
//             title: "Back to Home",
//             headerStyle: {
//               backgroundColor: colors.surfaceVariant,
//             },
//             headerTintColor: colors.onSurfaceVariant,
//             headerTitleStyle: {
//               fontWeight: "bold",
//             },
//           }}
//         />
//         <Stack.Screen
//           name="Setup"
//           component={Setup}
//           options={{
//             headerShown: false,
//           }}
//         />

//         <Stack.Screen
//           name="Login"
//           component={Login}
//           options={{
//             headerShown: false,
//           }}
//         />
//       </Stack.Navigator>
//     </NavigationContainer>
//   )
// }
// export default withTheme(Main)
