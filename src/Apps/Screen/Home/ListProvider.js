import { FlatList, StyleSheet, SafeAreaView } from "react-native"
import {
  Avatar,
  Button,
  Card,
  Text,
  Title,
  Paragraph,
} from "react-native-paper"
import moment from "moment"

export default function ListProvider({ history, setHistory }) {
  return (
    <SafeAreaView>
      <FlatList
        inverted="true"
        data={history}
        renderItem={({ item }) => CardComponent(item)}
      />
    </SafeAreaView>
  )
}

const CardComponent = (item) => {
  const LeftContent = (props) => <Avatar.Icon {...props} icon="qrcode-scan" />
  return (
    <Card mode="elevated" style={{ marginTop: 10 }}>
      <Card.Title title={item.serial} left={LeftContent} />
      <Card.Content>
        <Title>Scan ID: {item.id}</Title>
        <Paragraph>{item.data}</Paragraph>

        <Text>Scan Date: {moment(item.date).startOf("hour").fromNow()}</Text>
      </Card.Content>
      <Card.Actions>
        <Button>Recived</Button>
      </Card.Actions>
    </Card>
  )
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
