import * as React from "react"
import {
  MD3LightTheme as DefaultTheme,
  Provider as PaperProvider,
} from "react-native-paper"

// import Main from "./Main"
import validition from "./Apps/validition"

const theme = {
  ...DefaultTheme,
  // colors: {
  //   ...DefaultTheme.colors,
  //   primary: "dodgerblue",
  //   secondary: "blue",
  // },
}

export default function ThemeProvider() {
  const { colors } = theme
  return (
    <PaperProvider theme={theme}>
      {/* <Main colors={colors} /> */}
      <validition colors={colors} />
    </PaperProvider>
  )
}
