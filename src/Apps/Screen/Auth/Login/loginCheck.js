import React, { useContext, useState } from "react"
import { useQuery } from "react-query"
import { Alert } from "react-native"

export default async function loginCheck(username, password, url) {
  const _url = `http://${url}/oauth`
  const fetchPosts = async () => {
    const { data } = await fatch.post(_url)
    return data
  }
  fetch(_url, {
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
      await Vault.save(payload.token)
    })
    .catch((error) => {
      throw new Error(error.message)
    })
    .finally(() => navigation.navigate("Home"))
}
