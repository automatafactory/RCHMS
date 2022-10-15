// //React
// import { useEffect, useState } from "react"
// import { View } from "react-native"

// // Navigation
// import { createNativeStackNavigator } from "@react-navigation/native-stack"
// import storage from "./Apps/Components/storage"

// const Stack = createNativeStackNavigator()

// // Components
// import Home from "./Apps/Screen/Home/Home"
// import Login from "./Apps/Screen/Auth/Login"

// export default function Main() {
//   storage.save({
//     key: "loginState",
//     data: JSON.stringify({ token: "valud" }),
//   })
//   const [auth, setAuth] = useState(true)

//   useEffect(() => {
//     async function fetchData() {
//       await storage
//         .load({
//           key: "loginState",
//           autoSync: true,
//         })
//         .then((ret) => {
//           // found data go to then()
//           const _token = JSON.parse(ret)
//           if (_token.token) setAuth(true)
//           if (!_token.token) setAuth(false)
//         })
//         .catch((err) => {
//           setAuth(false)
//         })
//     }
//     fetchData()
//   }, [])

//   return (
//     <Stack.Navigator>
//       {auth ? (
//         <Stack.Screen
//           name="Home"
//           component={Home}
//           options={{
//             headerShown: false,
//           }}
//           initialParams={{ setAuth }}
//         />
//       ) : (
//         <Stack.Screen
//           name="Login"
//           component={Login}
//           options={{
//             headerShown: false,
//           }}
//         />
//       )}
//     </Stack.Navigator>
//   )
// }
