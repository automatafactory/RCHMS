import { useState, useEffect } from "react"
import { useMutation } from "react-query"
import axios from "axios"
import { View, StyleSheet, StatusBar, Image } from "react-native"
import {
  TextInput,
  Portal,
  Paragraph,
  Button,
  Dialog,
  Text,
  ActivityIndicator,
} from "react-native-paper"
import * as SecureStore from "expo-secure-store"

export default function Login(props) {
  /* --------------------------------------------------

                      Props   

  ----------------------------------------------------- */
  const navigation = props.navigation
  const theme = props.route.params.theme
  const colors = theme.colors
  /* --------------------------------------------------

                      State   

  ----------------------------------------------------- */
  const [url, setUrl] = useState()
  const [alartTitel, setAlartTitel] = useState("Alart")
  const [alartMassaage, setAlartMassaage] = useState()
  const [username, setUsername] = useState()
  const [password, setPassword] = useState()
  const [secureText, setSecureText] = useState(true)
  const [visible, setVisible] = useState(false)
  const [loading, setLoading] = useState(true)
  /* --------------------------------------------------

                      useEffect   

  ----------------------------------------------------- */
  useEffect(() => {
    SecureStore.getItemAsync("url").then((payload) => {
      console.log("Home/Login>", payload)
      setUrl(payload)
      setLoading(false)
    })
  }, [])

  // if (!_url) navigation.navigate("Setup")

  // useEffect(() => {
  //   async function fetchData() {
  //     const _url = await SecureStore.getItemAsync("url")
  //     console.log("e>", _url)
  //     setUrl(`http://${_url}:8000/login`)
  //   }
  //   fetchData()
  // }, [])
  /* --------------------------------------------------

                      network   

  ----------------------------------------------------- */
  const networkAuthenticated = async ({ url, body }) => {
    const config = {
      method: "post",
      url: `http://${url}:8000/login`,
      headers: {
        "Content-Type": "application/json",
      },
      data: JSON.stringify(body),
    }
    const payload = await axios(config)
    return payload
  }

  const { isLoading, isError, mutate } = useMutation(networkAuthenticated, {
    onSuccess: async ({ data }) => {
      await SecureStore.setItemAsync("token", data.token)
      const _token = await SecureStore.getItemAsync("token")
      navigation.navigate("Home")
    },

    onError: (error) => {
      error = error.message
      setVisible(true)
      setAlartTitel(`Login Error`)
      setAlartMassaage(error.message)
      console.log("e>>", error)
    },
    // retry: () => {
    //   setVisible(true)
    //   setAlartTitel(`Alart`)
    //   setAlartMassaage("Retrying")
    // },
  })
  if (!loading) {
    return (
      <>
        <View style={styles({ colors }).container}>
          <View style={styles({ colors }).row}>
            <View style={styles({ colors }).header}>
              <Image
                source={require("../../../../assets/icon.png")}
                style={styles({ colors }).img}
              />
              <Text style={styles({ colors }).text} variant="displayLarge">
                Login
              </Text>
            </View>
          </View>
          <View style={styles({ colors }).row}>
            <View style={styles({ colors }).body}>
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
              <Text style={styles({ colors }).server}>
                Current Server: {url}
              </Text>

              <Button
                style={styles({ colors }).margins}
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
              <View style={styles({ colors }).row}>
                <Button
                  style={styles({ colors }).margins}
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
                  style={styles({ colors }).margins}
                  textColor={colors.error}
                  mode="text"
                  onPress={() => navigation.navigate("Setup")}
                >
                  Change Server
                </Button>
              </View>
            </View>
          </View>
          <View style={styles({ colors }).row}>
            <View style={styles({ colors }).footer}>
              <Text>Power by Tanbin Hassan © 2022 </Text>
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
      </>
    )
  } else
    <>
      <ActivityIndicator animating={true} size="large" />
    </>
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

const styles = ({ colors }) =>
  StyleSheet.create({
    container: {
      backgroundColor: colors.background,

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
      textAlign: "center",
      color: colors.primary,
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
