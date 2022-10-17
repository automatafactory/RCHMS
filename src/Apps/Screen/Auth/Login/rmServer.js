import storage from "../../../Components/storage"

const rmServer = async ({ navigation }) => {
  await storage.remove({
    key: "api",
  })
  await navigation.navigate("Setup")
}
export default rmServer
