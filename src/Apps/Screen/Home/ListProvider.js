import * as React from "react"
import { FlatList, StyleSheet, Text, View } from "react-native"
import { useEffect, useState } from "react"
// import { FlatList,  Text, View } from "react-native-paper"
import { Avatar, Button, Card, Title, Paragraph } from "react-native-paper"
import storage from "../../Components/storage"

export default function ListProvider() {
  // storage.getAllDataForKey("tableData").then((data) => {
  //   // if (data === undefined || data === null) {
  //   //   return <Text> Scan to add Data </Text>
  //   // } else {
  //   data = JSON.parse(data)
  //   console.log(data)
  const LeftContent = (props) => <Avatar.Icon {...props} icon="qrcode-scan" />
  return (
    <View style={styles.container}>
      <FlatList
        data={[
          { key: "Devin", body: "hrh hrh hrhrh " },
          { key: "Dan" },
          { key: "Dominic" },
          { key: "Jackson" },
          { key: "James" },
          { key: "Joel" },
          { key: "John" },
          { key: "Jillian" },
          { key: "Jimmy" },
          { key: "Julie" },
        ]}
        renderItem={({ item }) => (
          <Card style={styles.item}>
            <Card.Title title={item.key} left={LeftContent} />
            <Card.Content>
              <Title>{item.key}</Title>
              <Paragraph>{item.body}</Paragraph>
            </Card.Content>
            <Card.Actions>
              <Button>Ok</Button>
            </Card.Actions>
          </Card>
        )}
      />
    </View>
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
