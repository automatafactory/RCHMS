import { useEffect, useState } from "react"
import axios from "axios"
import { View, StyleSheet, StatusBar, Image, Alert } from "react-native"
import { useMutation, useQueryClient } from "react-query"
import {
  TextInput,
  Portal,
  Paragraph,
  Provider,
  Button,
  Dialog,
  Text,
  MD3LightTheme as DefaultTheme,
} from "react-native-paper"
import { authenticated } from "./loginFun"

export default function Login(props) {
  const navigation = props.navigation
  let url = props.route.params.url
  url = `http://${url}/oauth`

  // State
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [secureText, setSecureText] = useState(true)
  const [visible, setVisible] = useState(false)
  const body = {
    username: username,
    password: password,
  }

  //  createPost({ url, username, password, setMessage }),

  console.log(isLoading)
  return (
    <Provider>
      <View style={styles.container}>
        <View style={styles.row}>
          <View style={styles.header}>
            <Image
              source={require("../../../../assets/icon.png")}
              style={styles.img}
            />
            <Text style={styles.text} variant="displayLarge">
              Login
            </Text>
          </View>
        </View>
        <View style={styles.row}>
          <View style={styles.body}>
            <TextInput
              label="Email"
              mode="outlined"
              value={username}
              onChangeText={(username) => setUsername(username)}
            />
            <TextInput
              mode="outlined"
              label="Password"
              placeholder={"********"}
              value={password}
              secureTextEntry={secureText}
              right={
                <TextInput.Icon
                  icon="eye"
                  onPress={() => setSecureText(!secureText)}
                />
              }
              onChangeText={(password) => {
                setPassword(password)
              }}
            />
            <Text style={styles.server}>Current Server: {url}</Text>

            <Button
              style={styles.margins}
              mode="contained"
              loading={isLoading}
              onPress={() => mutate()}
            >
              Login
            </Button>
            <View style={styles.row}>
              <Button
                style={styles.margins}
                mode="text"
                textColor={DefaultTheme.colors.secondary}
                onPress={() => setVisible(true)}
              >
                Forgot Password
              </Button>
              <Button
                style={styles.margins}
                textColor={DefaultTheme.colors.error}
                mode="text"
                onPress={() => navigation.navigate("Setup")}
              >
                Change Server
              </Button>
            </View>
          </View>
        </View>
        <View style={styles.row}>
          <View style={styles.footer}>
            <Text>Power by React Native</Text>
            <Text>Tanbin Hassan © 2022 </Text>
            <StatusBar style="auto" />
          </View>
        </View>
        <Portal>
          <Dialog visible={visible} onDismiss={() => setVisible(false)}>
            <Dialog.Icon icon="alert" />
            <Dialog.Title>Alert</Dialog.Title>
            <Dialog.Content>
              <Paragraph>
                Please contact Admin or related branch for Password Reset
              </Paragraph>
            </Dialog.Content>
            <Dialog.Actions>
              <Button onPress={() => setVisible(false)}>Done</Button>
            </Dialog.Actions>
          </Dialog>
        </Portal>
      </View>
    </Provider>
  )
}
const styles = StyleSheet.create({
  container: {
    backgroundColor: DefaultTheme.colors.surfaceVariant,
    width: "100%",
    flex: 1,
    flexDirection: "column",
    justifyContent: "space-around",
    alignItemsArr: "center",
  },
  row: {
    flexDirection: "row",
    justifyContent: "center",
    alignItemsArr: "center",
  },
  server: {
    textAlign: "center",
    paddingTop: 5,
  },
  header: {
    flex: 1,
    width: "100%",
    // padding: "20%",
    margin: "5%",
    flexDirection: "row",
    justifyContent: "center",
    alignItemsArr: "center",
  },
  btn: {
    flex: 1,
    width: "100%",
    padding: "10%",
    flexDirection: "column",
    justifyContent: "flex-start",
  },

  imgcontainer: {
    marginTop: 30,
    flex: 1,
    width: "100%",
    padding: 50,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  img: {
    width: 50,
    height: 50,
    margin: 10,
  },
  margins: {
    marginTop: "10%",
  },
  text: {
    fontFamily: DefaultTheme.colors.fontFamily,
    color: DefaultTheme.colors.primary,
    textAlign: "center",
  },
  body: {
    flex: 1,
    padding: "10%",
    width: "100%",
    flexDirection: "column",
    justifyContent: "center",
    alignItemsArr: "center",
  },
})
