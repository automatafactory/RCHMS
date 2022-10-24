import { useState, useEffect, useCallback } from "react"
import { Appearance } from "react-native"
import { MD3DarkTheme, MD3LightTheme, Provider } from "react-native-paper"
import Main from "./Main"

export default function PaperProvider() {
  // Appearance.useColorScheme() === "dark" ? MD3DarkTheme : MD3LightTheme

  const dark = {
    ...MD3DarkTheme, // or MD3DarkTheme
    roundness: 2,
    colors: {
      ...MD3DarkTheme.colors,
      primary: "#3498db",
      secondary: "#f1c40f",
      tertiary: "#a1b2c3",
    },
  }
  const bright = {
    ...MD3LightTheme, // or MD3DarkTheme
    roundness: 2,
    colors: {
      ...MD3LightTheme.colors,
      primary: "#3498db",
      secondary: "#f1c40f",
      tertiary: "#a1b2c3",
    },
  }

  const [theme, setTheme] = useState()
  Appearance.addChangeListener(({ colorScheme }) => {
    setTheme(colorScheme === "dark" ? dark : bright)
  })

  return (
    <Provider theme={theme}>
      <Main theme={theme} />
    </Provider>
  )
}
