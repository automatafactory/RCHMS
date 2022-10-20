import { FlatList, StyleSheet, View } from "react-native"
import {
  Avatar,
  Button,
  Card,
  Text,
  Title,
  Paragraph,
} from "react-native-paper"
import storage from "../../Components/storage"

export default function ListProvider() {
  const data = storage.getAllDataForKey("tableData").then((data) => {
    console.log(data)
    return data
  })
  const LeftContent = (props) => <Avatar.Icon {...props} icon="qrcode-scan" />
  return (
    <View style={styles.container}>
      <FlatList
        data={data}
        renderItem={({ item }) => (
          <Card style={styles.item}>
            <Card.Title title={item.id} left={LeftContent} />
            <Card.Content>
              <Title>{item.serial}</Title>
              <Paragraph>{item.body}</Paragraph>
              <Text>{item.date}</Text>
            </Card.Content>
            <Card.Actions>
              <Button>Ok</Button>
            </Card.Actions>
          </Card>
        )}
      />
    </View>
  )
  // })
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 22,
  },
  item: {
    marginTop: 10,
  },
})
