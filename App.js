//React
import { AppRegistry } from "react-native"
// Expo App
import { StatusBar } from "expo-status-bar"
// App Name
import { name as appName } from "./app.json"
import ModuleProvider from "./src/ModuleProvider"
import { QueryClient, QueryClientProvider } from "react-query"
const queryClient = new QueryClient()

export default function App() {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <StatusBar />
        <ModuleProvider />
      </QueryClientProvider>
    </>
  )
}

AppRegistry.registerComponent(appName, () => App)
