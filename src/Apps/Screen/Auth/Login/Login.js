import { useEffect, useState } from "react"
import { useMutation } from "react-query"
import axios from "axios"
import { View, StyleSheet, StatusBar, Image, ScrollView } from "react-native"
import {
  TextInput,
  Portal,
  Paragraph,
  Provider,
  Button,
  Dialog,
  Text,
  MD3DarkTheme as Theme,
} from "react-native-paper"

export default function Login(props) {
  const navigation = props.navigation
  const setToken = props.route.params.setToken
  const colors = props.route.params.colors
  const url = `http://${props.route.params.url}/oauth`
  /* --------------------------------------------------

                      State   

  ----------------------------------------------------- */
  const [alartTitel, setAlartTitel] = useState("Alart")
  const [alartMassaage, setAlartMassaage] = useState()
  const [username, setUsername] = useState()
  const [password, setPassword] = useState()
  const [secureText, setSecureText] = useState(true)
  const [visible, setVisible] = useState(false)

  const networkAuthenticated = async ({ url, body }) => {
    var config = {
      method: "post",
      url: url,
      headers: {
        "Content-Type": "application/json",
      },
      data: JSON.stringify(body),
    }
    await axios(config)
  }

  // const networkAuthenticated = async ({ url, body }) =>
  //   await fetch(url, {
  //     method: "POST",
  //     headers: { "Content-Type": "application/json" },
  //     body: JSON.stringify(body),
  //     redirect: "follow",
  //   })

  // const { isLoading, isSuccess, isError, data, error, mutate } = useMutation(
  //   networkAuthenticated,
  //   {
  //     onSuccess: async (data, variables, context) => {
  //       if (data.status !== 200) {
  //         setVisible(true)
  //         setAlartTitel(`Login Error`)
  //         setAlartMassaage(data.massage)
  //       }
  //     },

  const { mutate, isLoading } = useMutation(networkAuthenticated, {
    onSuccess: async (data) => {
      // setToken(data.token)
      console.log("🚀 ~ file: Login.js ~ line 40 ~ Login ~ payload", await data)
    },
    onError: (error) => {
      error = error.message
      setVisible(true)
      setAlartTitel(`Login Error`)
      setAlartMassaage(error)
      console.log("e>>", error)
    },
    retry: () => {
      setVisible(true)
      setAlartTitel(`Alart`)
      setAlartMassaage("Retrying")
    },
  })

  return (
    <Provider theme={Theme}>
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
              onPress={() =>
                loginCheck({
                  url,
                  username,
                  password,
                  setVisible,
                  setAlartTitel,
                  setAlartMassaage,
                  mutate,
                })
              }
            >
              Login
            </Button>
            <View style={styles.row}>
              <Button
                style={styles.margins}
                mode="text"
                textColor={colors.secondary}
                onPress={() => {
                  setVisible(true)
                  setAlartTitel(`Notice`)
                  setAlartMassaage(
                    "Please contact Admin or related branch for Password Reset"
                  )
                }}
              >
                Forgot Password
              </Button>
              <Button
                style={styles.margins}
                textColor={colors.error}
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
          <Dialog
            style={{ maxHeight: "75%" }}
            visible={visible}
            onDismiss={() => setVisible(false)}
          >
            <Dialog.Icon icon="alert" />
            <Dialog.Title>{alartTitel}</Dialog.Title>
            <Dialog.Content>
              <Paragraph>{alartMassaage}</Paragraph>
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

const loginCheck = ({
  url,
  username,
  password,
  setVisible,
  setAlartTitel,
  setAlartMassaage,
  mutate,
}) => {
  if (
    username === "" ||
    password === "" ||
    username === undefined ||
    password === undefined
  ) {
    setVisible(true)
    setAlartTitel(`Alart`)
    setAlartMassaage("Username, Password cant be empty")
  } else {
    const body = {
      username: username,
      password: password,
    }

    mutate({ url, body })
  }
}

const styles = StyleSheet.create({
  container: {
    // backgroundColor: Theme.colors.surfaceVariant,
    backgroundColor: "#000",
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
    fontFamily: Theme.colors.fontFamily,
    color: Theme.colors.primary,
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
