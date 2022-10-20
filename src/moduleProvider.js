import * as React from "react"
import {
  MD3LightTheme as DefaultTheme,
  Provider as PaperProvider,
} from "react-native-paper"

import Main from "./Main"

const theme = {
  ...DefaultTheme,
  // colors: {
  //   ...DefaultTheme.colors,
  //   primary: "dodgerblue",
  //   secondary: "blue",
  // },
}

export default function ModuleProvider() {
  const { colors } = theme
  return (
    <PaperProvider theme={theme}>
      <Main colors={colors} />
    </PaperProvider>
  )
}
