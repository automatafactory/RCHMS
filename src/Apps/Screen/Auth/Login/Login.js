import React, { useState, useEffect, useContext } from "react"
import { useMutation } from "react-query"
import axios from "axios"
import { View, StyleSheet, StatusBar, Image, Appearance } from "react-native"
import {
  TextInput,
  Portal,
  Paragraph,
  Button,
  Dialog,
  Text,
} from "react-native-paper"
import * as SecureStore from "expo-secure-store"
import { getApi } from "../../../Components/contexts/ApiContext"
import { LoginContext } from "../../../Components/contexts/LoginContext"

// import {
//   getLoginToken,
//   setLoginToken,
// } from "../../../Components/contexts/LoginContext"

export default function Login(props) {
  console.log("Address :>> Login")
  /* --------------------------------------------------
  
  * Props   
  
  ----------------------------------------------------- */
  const navigation = props.navigation
  const themecheme = props.route.params.themecheme
  const theme = props.route.params.theme

  /* --------------------------------------------------
    
    State   
    
    ----------------------------------------------------- */
  const [alartTitel, setAlartTitel] = useState("Alart")
  const [alartMassaage, setAlartMassaage] = useState()
  const [username, setUsername] = useState()
  const [password, setPassword] = useState()
  const [secureText, setSecureText] = useState(true)
  const [visible, setVisible] = useState(false)
  const [loading, setLoading] = useState(true)
  const [logosrc, setLogosrc] = useState(
    require("../../../../assets/logo_d.png")
  )

  /* --------------------------------------------------
                      useEffect   
  ----------------------------------------------------- */
  const { token, fetchToken } = React.useContext(LoginContext)

  useEffect(() => {
    if (token) navigation.navigate("Home")
  }, [token])

  // useEffect(() => {
  //   setLogosrc(
  //     themecheme === "dark"
  //       ? require("../../../../assets/logo_d.png")
  //       : require("../../../../assets/logo_l.png")
  //   )
  // }, [])

  /* --------------------------------------------------

 ! Checking if the server url exists not

  ----------------------------------------------------- */

  // if (!api) {
  //   navigation.navigate("Setup")
  // }
  const url = getApi()
  // const token = getLoginToken()
  console.log("Login/api :>> ", url)
  // console.log("Login/Token>>", token)
  /* --------------------------------------------------

                      network   

  ----------------------------------------------------- */
  const networkAuthenticated = async ({ url, body }) => {
    const config = {
      method: "POST",
      url: `http://${url}/login`,
      headers: {
        "Content-Type": "application/json",
      },
      data: JSON.stringify(body),
    }
    const payload = await axios(config)
    console.log(">", payload)
    return payload
  }

  const { isLoading, isError, mutate } = useMutation(networkAuthenticated, {
    onSuccess: async ({ data }) => {
      await SecureStore.setItemAsync("token", data.token)
      const _token = await SecureStore.getItemAsync("token")
      setLoginToken(_token)
      // navigation.navigate("Home")
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
  // if (!loading) {
  return (
    <View style={styles({ theme }).container}>
      <View style={styles({ theme }).row}>
        <View style={styles({ theme }).header}>
          <Image
            source={require("../../../../assets/icon.png")}
            style={styles({ theme }).img}
          />
          <Text style={styles({ theme }).text} variant="displayLarge">
            Login
          </Text>
        </View>
      </View>
      <View style={styles({ theme }).row}>
        <View style={styles({ theme }).body}>
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
          <Text style={styles({ theme }).server}>Current Server: {url}</Text>

          <Button
            style={styles({ theme }).margins}
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
          <View style={styles({ theme }).row}>
            <Button
              style={styles({ theme }).margins}
              mode="text"
              textColor={theme.secondary}
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
              style={styles({ theme }).margins}
              textColor={theme.error}
              mode="text"
              onPress={() => navigation.navigate("Setup")}
            >
              Change Server
            </Button>
          </View>
        </View>
      </View>
      <View style={styles({ theme }).row}>
        <View style={styles({ theme }).footer}>
          <Image style={styles({ theme }).logoStyle} source={logosrc} />
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
  )
  // } else
  //   <>
  //     <ActivityIndicator animating={true} size="large" />
  //   </>
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

const styles = ({ theme }) =>
  StyleSheet.create({
    container: {
      backgroundColor: theme.colors.background,
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
      color: theme.primary,
    },
    body: {
      flex: 1,
      padding: "10%",
      width: "100%",
      flexDirection: "column",
      justifyContent: "center",
      alignItemsArr: "center",
    },
    logoStyle: {
      padding: "10%",
      justifyContent: "center",
      alignItemsArr: "center",
      width: 100,
      height: 80,
      resizeMode: "contain",
    },
  })
