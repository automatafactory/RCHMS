import { useState } from "react"

import {
  FlatList,
  Animated,
  StyleSheet,
  SafeAreaView,
  View,
  Appearance,
} from "react-native"
import {
  Avatar,
  Button,
  Card,
  Text,
  Title,
  Paragraph,
  AnimatedFAB,
  Provider,
} from "react-native-paper"
import moment from "moment"
import React from "react"

export default function ListProvider({
  animateFrom,
  navigation,
  history,
  setHistory,
  visible,
  theme,
}) {
  const [isExtended, setIsExtended] = useState(true)

  const [background, setBackground] = useState()
  Appearance.addChangeListener(({ colorScheme }) => {
    setBackground(colorScheme === "dark" ? "#000" : "#fff")
  })

  const onScroll = ({ nativeEvent }) => {
    const currentScrollPosition = Math.floor(nativeEvent?.contentOffset?.y) ?? 0
    setIsExtended(currentScrollPosition <= 0)
  }
  const fabStyle = { [animateFrom]: 16 }

  return (
    <>
      <SafeAreaView>
        <FlatList
          style={{ backgroundColor: background }}
          onScroll={onScroll}
          data={history}
          renderItem={({ item }) => CardComponent({ item, theme })}
        />
      </SafeAreaView>
      <AnimatedFAB
        icon={"qrcode-scan"}
        label={"Scan"}
        extended={isExtended}
        onPress={() =>
          navigation.navigate("CamaraScreen", { setHistory, setHistory })
        }
        visible={true}
        animateFrom={"right"}
        variant={"tertiary"}
        style={[styles({ theme }).fabStyle, styles({ theme }), fabStyle]}
      />
    </>
  )
}

const CardComponent = ({ item, theme }) => {
  const LeftContent = (props) => <Avatar.Icon {...props} icon="qrcode-scan" />
  return (
    <Card
      mode="elevated"
      style={{
        marginTop: 10,
        backgroundColor: theme.colors.surface,
      }}
    >
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

const styles = ({ theme }) =>
  StyleSheet.create({
    container: {
      // flex: 1,
      paddingTop: 22,
      flexGrow: 1,
    },
    back: {
      backgroundColor: theme.colors.surface,
    },

    item: {
      // marginTop: 10,
    },
    fabStyle: {
      bottom: 16,
      right: 16,
      position: "absolute",
      marginBottom: "5%",
    },
  })
