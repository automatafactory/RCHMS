import * as React from "react"
import { Appbar } from "react-native-paper"

const Navbar = ({ navigation, route }) => {
  const _handleMore = () => console.log("Shown more")
  const { setAuth } = route.params

  return (
    <Appbar.Header elevated mode="small">
      <Appbar.BackAction onPress={() => setVisible("true")} />
      <Appbar.Content title="Hampo" />
      {/* <Appbar.Action onPress={navigation} icon="barcode-scan" /> */}
      {/* <Appbar.Action onPress={() => setAuth(false)} icon="barcode-scan" /> */}
      <Appbar.Action icon="dots-vertical" onPress={_handleMore} />
    </Appbar.Header>
  )
}

export default Navbar
