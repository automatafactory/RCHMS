import moment from "moment"
import storage from "./storage"
import { Alart } from "react-native"

export default codeProcesser = (data, setHistory) => {
  return new Promise((resolve, reject) => {
    const _date = new Date()
    let _id = generateUUID(16)
    let _serialtag = idExtracter(data)

    const _data = {
      id: _id,
      serial: _serialtag ? _serialtag : "invalid",
      data: data,
      date: _date,
      updateid: "pending",
    }

    storage
      .save({
        key: "tableData",
        id: _id,
        data: _data,
        expires: null,
      })
      .then(() => storage.getAllDataForKey("tableData"))
      .then((temp) => {
        setHistory(temp)
      })
      .finally(() => resolve(true))
  })
}

const idExtracter = (raw) => {
  raw = raw.split(/\r?\n/)
  raw = Object.values(raw)
  return raw[5]
}

const networkproccess = () => {
  return new Promise(async (resolve, reject) => {
    let serialtag = await idExtracter(data)
    await fetch("http://192.168.1.2:8000/verify", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        productid: `${serialtag}`,
      }),
    })
      .then((response) => response.json())
      .then(async (payload) => {
        console.log(payload)
      })
  })
}
const generateUUID = (digits) => {
  let str = "123456789abcdefghjkmnpqrstuvwxyzABCDEFGHJKMNPQRSTUVXZ"
  let uuid = []
  for (let i = 0; i < digits; i++) {
    uuid.push(str[Math.floor(Math.random() * str.length)])
  }
  return uuid.join("")
}
