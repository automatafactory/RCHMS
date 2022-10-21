import moment from "moment"
import storage from "./storage"
import { Alart } from "react-native"

export default function codeProcesser(qrdata, setHistory) {
  const _date = new Date()
  let _id = generateUUID(16)
  let _serialtag = idExtracter(qrdata)

  const _data = {
    id: _id,
    serial: _serialtag ? _serialtag : "invalid",
    data: qrdata,
    date: _date,
    status: "pending",
  }

  storage.save({
    key: "tableData",
    id: _id,
    data: _data,
    expires: null,
  })
  // storage.clearMap()
  storage.getAllDataForKey("tableData").then((data) => {
    console.log(data)
    console.log(setHistory)
    setHistory(data)
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
