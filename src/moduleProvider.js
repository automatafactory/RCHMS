import { useState } from "react"
import { Appearance } from "react-native"
import {
  MD3DarkTheme,
  MD3LightTheme,
  Provider as PaperProvider,
} from "react-native-paper"

import Main from "./Main"

// const theme = {
//   ...DefaultTheme,
//   // colors: {
//   //   ...DefaultTheme.colors,
//   //   primary: "dodgerblue",
//   //   secondary: "blue",
//   // },
// }

export default function ModuleProvider() {
  const [theme, setTheme] = useState(MD3LightTheme)
  const colorScheme = Appearance.getColorScheme()
  Appearance.addChangeListener(({ colorScheme }) => {
    console.log(colorScheme)
  })
  console.log(colorScheme)

  if (colorScheme === "dark") {
    setTheme(MD3DarkTheme)
  }

  return (
    <PaperProvider theme={theme}>
      <Main theme={theme} />
    </PaperProvider>
  )
}
