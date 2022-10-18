import { useState } from "react"
import { View } from "react-native"
import { Text, TextInput, Button } from "react-native-paper"
import * as SecureStore from "expo-secure-store"

async function save(key, value) {
  await SecureStore.setItemAsync(key, value)
}

async function getValueFor(key) {
  let result = await SecureStore.getItemAsync(key)
  if (result) {
    alert("🔐 Here's your value 🔐 \n" + result)
  } else {
    alert("No values stored under that key.")
  }
}

export default function SecureStorage() {
  const [key, onChangeKey] = useState("Your key here")
  const [value, onChangeValue] = useState("Your value here")

  return (
    <View>
      <Text>Save an item, and grab it later!</Text>

      <Text>🔐 Enter your key 🔐</Text>
      <TextInput
        onChangeText={(value) => {
          getValueFor(event.nativeEvent.text)
        }}
        placeholder="Enter the key for the value you want to get"
      />
      <Button
        title="Save this key/value pair"
        onPress={() => {
          save(key, value)
          onChangeKey("Your key here")
          onChangeValue("Your value here")
        }}
      />
    </View>
  )
}
