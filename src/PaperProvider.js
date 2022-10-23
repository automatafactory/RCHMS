import { useState, useEffect, useCallback } from "react"
import { Appearance } from "react-native"
import { MD3DarkTheme, MD3LightTheme, Provider } from "react-native-paper"
import Main from "./Main"

export default function PaperProvider() {
  // Appearance.useColorScheme() === "dark" ? MD3DarkTheme : MD3LightTheme

  const [theme, setTheme] = useState()
  Appearance.addChangeListener(({ colorScheme }) => {
    setTheme(colorScheme === "dark" ? MD3DarkTheme : MD3LightTheme)
  })

  return (
    <Provider theme={theme}>
      <Main theme={theme} />
    </Provider>
  )
}
