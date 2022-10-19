// import { Alert } from "react-native"
// import storage from "../../../Components/storage"

// const updateURL = async (api, navigation, setEstatus) => {
//   if (!api) {
//     Alert.alert("Error", "Please enter a Api Server Address")
//   } else {
//     try {
//       const response = await fetch(`http://${api}`, {
//         method: "GET",
//         headers: {
//           Accept: "application/json",
//           "Content-Type": "application/json",
//         },
//       })
//       if (response.status != "200") {
//         alert(
//           `Error connecting with server failed Status Code ${response.status}`
//         )
//         setEstatus(false)
//         return null
//       } else {
//         const _api = JSON.stringify(api)

//         await storage
//           .save({
//             key: "api", // Note: Do not use underscore("_") in key!
//             data: {
//               api: _api,
//             },
//             expires: null,
//           })
//           .then(() => {
//             storage
//               .load({
//                 key: "api",
//                 autoSync: true,
//                 syncInBackground: true,
//                 syncParams: {
//                   extraFetchOptions: {
//                     // blahblah
//                   },
//                   someFlag: true,
//                 },
//               })
//               .then((ret) => {
//                 Alert.alert("Server Update", `Server set to ${ret.api}`, [
//                   {
//                     text: "Update Again",
//                     onPress: () => {
//                       storage.remove({
//                         key: "api",
//                       })
//                     },
//                   },
//                   {
//                     text: "Confirm",
//                     onPress: () => {
//                       navigation.navigate("Login")
//                     },
//                   },
//                 ])
//               })
//           })
//       }
//     } catch (error) {
//       console.error("error", error)
//     }
//   }
// }

// export default updateURL
