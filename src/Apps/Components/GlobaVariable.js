import AsyncStorage from "@react-native-async-storage/async-storage"

export async function getToken() {
  let param = await AsyncStorage.getItem("@token")
  console.log(param)
  return param
}
export async function setToken(param) {
  let payload = await AsyncStorage.setItem("@token", param)
  return payload
}
export async function getApi() {
  let payload = await AsyncStorage.getItem("@url", param)
  return payload
}
export async function setApi(param) {
  let payload = await AsyncStorage.setItem("@url", param)
  return payload
}
