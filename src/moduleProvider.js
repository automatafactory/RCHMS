import * as React from "react"
import {
  MD3LightTheme as DefaultTheme,
  Provider as PaperProvider,
} from "react-native-paper"
import { QueryClient, QueryClientProvider } from "react-query"

import Main from "./Main"
const queryClient = new QueryClient()

const theme = {
  ...DefaultTheme,
  // colors: {
  //   ...DefaultTheme.colors,
  //   primary: "dodgerblue",
  //   secondary: "blue",
  // },
}

export default function moduleProvider() {
  const { colors } = theme
  return (
    <PaperProvider theme={theme}>
      <QueryClientProvider client={queryClient}>
        <Main colors={colors} />
      </QueryClientProvider>
    </PaperProvider>
  )
}
