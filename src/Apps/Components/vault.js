import * as SecureStore from "expo-secure-store"

export async function get(key) {
  let result = await SecureStore.getItemAsync(key)
  result ? false : result
}
export async function save(key, value) {
  await SecureStore.setItemAsync(key, value)
}
