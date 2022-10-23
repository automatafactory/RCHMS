import { useMutation } from "react-query"
import axios from "axios"
import * as SecureStore from "expo-secure-store"
import { Alert } from "react-native"

const updateURL = async ({
  url,
  setURL,
  navigation,
  setEstatus,
  setLoading,
}) => {
  setLoading(isLoading)
  const _url = `http://${url}/verify`
  const networkAuthenticated = async ({ _url }) => {
    const config = {
      method: "post",
      url: _url,
      headers: {
        "Content-Type": "application/json",
      },
      data: JSON.stringify({ prodectid: "d6b05a143f1084108d071843c134a297" }),
    }
    const payload = await axios(config)
    return payload
  }

  const { isLoading, mutate } = useMutation(networkAuthenticated, {
    onSuccess: async () => {
      if (payload.status != 200) {
        setEstatus(true)
      } else {
        await SecureStore.setItemAsync("url", url)
        setURL(url)
        navigation.navigation.push()
      }
    },
    onError: (error) => {
      Alert.alert("Error", error)
    },
  })
}
export default updateURL
