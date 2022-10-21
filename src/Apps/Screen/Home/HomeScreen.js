import { useEffect, useState } from "react"
import { Provider } from "react-native-paper"
import TopNavbar from "./Navbar/TopNavbar"
import BottomNavbar from "./Navbar/BottomNavbar"
import storage from "../../Components/storage"

function HomeScreen(props) {
  const navigation = props.navigation
  const api = props.route.params.url
  const token = props.route.params.token
  const theme = props.route.params.theme

  const [history, setHistory] = useState()

  useEffect(() => {
    storage.getAllDataForKey("tableData").then((payload) => {
      setHistory(!payload ? payload : payload.reverse())
    })
  }, [])

  return (
    <Provider theme={theme}>
      <TopNavbar
        navigation={navigation}
        setToken={props.route.params.setToken}
      />
      <BottomNavbar
        navigation={navigation}
        history={history}
        setHistory={setHistory}
      />
    </Provider>
  )
}

export default HomeScreen
