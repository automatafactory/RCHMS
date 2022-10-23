import { useEffect, useState } from "react"
import { Provider } from "react-native-paper"
import TopNavbar from "./Navbar/TopNavbar"

import ListProvider from "./ListProvider"
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
    <Provider>
      <TopNavbar
        navigation={navigation}
        theme={theme}
        setToken={props.route.params.setToken}
      />
      {/* <BottomNavbar
        navigation={navigation}
        history={history}
        setHistory={setHistory}
      /> */}
      <ListProvider
        theme={theme}
        navigation={navigation}
        history={history}
        setHistory={setHistory}
      />
    </Provider>
  )
}

export default HomeScreen
