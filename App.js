//React
import { AppRegistry } from "react-native"
// Expo App
import { StatusBar } from "expo-status-bar"
// App Name
import { name as appName } from "./app.json"
import PaperProvider from "./src/PaperProvider"
import { QueryClient, QueryClientProvider } from "react-query"
const queryClient = new QueryClient()

export default function App() {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <StatusBar />
        <PaperProvider />
      </QueryClientProvider>
    </>
  )
}

AppRegistry.registerComponent(appName, () => App)
