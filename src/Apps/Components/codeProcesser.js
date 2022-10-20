import moment from "moment"
import storage from "./storage"
import uuid from "react-native-uuid"

export default function codeProcesser(qrdata) {
  const _date = new Date()
  let _id = uuid.v1()
  console.log("codeProcesser", qrdata)

  let _serialtag = idExtracter(qrdata)

  const _data = {
    id: _id,
    serial: _serialtag ? _serialtag : "invalid",
    date: _date,
    status: "pending",
  }
  // const _data = JSON.stringify({
  //   id: _id,
  //   tag: _serialtag,
  //   date: _date,
  //   status: "pending",
  // })
  // storage.remove({
  //   key: "tableData",
  // })

  storage.save({
    key: "tableData",
    id: "data",
    data: _data,
    expires: null,
  })

  storage.getAllDataForKey("tableData").then((data) => {
    console.log(data)
  })
}

const idExtracter = (raw) => {
  console.log(raw)
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
