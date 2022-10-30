import TopNavbar from "./Navbar/TopNavbar"
import ListProvider from "./ListProvider"
import { getApi } from "../../Components/contexts/ApiContext"
import { View } from "react-native"

function HomeScreen(props) {
  console.log("Address :>> HomeScreen")
  const navigation = props.navigation
  const theme = props.route.params.theme

  // useEffect(() => {
  //   storage
  //     .getAllDataForKey("tableData")
  //     .then((payload) => {
  //       setHistory(!payload ? payload : payload)
  //     })
  //     .then(() => {
  //       SecureStore.getItemAsync("token").then((payload) => {
  //         console.log("Home Screen=>", payload)

  //         payload ? setLoading(false) : navigation.navigate("Login")
  //       })
  //     })
  // }, [])

  const api = getApi()
  console.log("api object :>> ", api)

  // if (api) {
  //   navigation.navigate("Login")
  // } else {
  return (
    <>
      <TopNavbar
        navigation={navigation}
        theme={theme}
        setToken={props.route.params.setToken}
      />
      <ListProvider theme={theme} navigation={navigation} />
    </>
  )
  // }
}

export default HomeScreen
