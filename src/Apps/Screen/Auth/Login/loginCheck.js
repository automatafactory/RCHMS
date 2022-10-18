import React, { useContext, useState } from "react"
import storage from "../../../Components/storage"

export default async function loginCheck(username, password, navigation) {
  console.log("===============up=====================")
  console.log(username, password)

  //   const [_api, _setApi] = useState(undefined)
  const _api = "192.168.1.2:8000"
  //   storage
  //     .load({
  //       key: "api",
  //       autoSync: true,
  //       syncInBackground: true,
  //       syncParams: {
  //         someFlag: true,
  //       },
  //     })
  //     .then((ret) => {
  //       _setApi(ret.api)
  //     })
  //     .catch((err) => {
  //       _setApi(undefined)
  //     })

  const url = `http://${_api}/oauth`
  console.log(">>", url)
  fetch(url, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      username: username,
      password: password,
    }),
  })
    .then((response) => response.json())
    .then(async (payload) => {
      await storage.save({
        key: "loginState", // Note: Do not use underscore("_") in key!
        data: {
          token: payload.token,
        },
        expires: 1000 * 3600,
      })
    })
    .catch((error) => {
      throw new Error(error.message)
    })
    .finally(() => navigation.navigate("Home"))
}
