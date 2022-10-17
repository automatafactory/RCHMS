import moment from "moment"
import storage from "./storage"
import uuid from "react-native-uuid"

export default async function codeProcesser(data) {
  const _date = new Date()
  let _id = uuid.v4()
  // console.log("codeProcesser", data)

  let serialtag = await idExtracter(data)

  const _data = JSON.stringify({
    id: _id,
    date: _date,
    tag: serialtag,
    status: "pending",
  })

  storage.save({
    key: "tableData",
    id: data,
    data: _data,
    expires: null,
  })

  //   await storage
  //     .load({
  //       key: "productdata",
  //     })
  //     .then((data) => {
  //       console.log(data)
  //     })
  //     .catch(async (err) => {
  //       console.warn(err.message)
  //       switch (err.name) {
  //         case "NotFoundError":
  //           await storage.save({
  //             key: "productdata", // Note: Do not use underscore("_") in key!
  //             data: {
  //               id: _id,
  //               date: moment(_date).format("MMMM Do YYYY, h:mm:ss a"),
  //               tag: serialtag,
  //               status: "pending",
  //             },
  //           })
  //           resolve(`Product added ${serialtag} successfully`)
  //           break
  //         case "ExpiredError":
  //           await storage.save({
  //             key: "productdata", // Note: Do not use underscore("_") in key!
  //             data: {
  //               date: moment(_date).format("MMMM Do YYYY, h:mm:ss a"),
  //               id: serialtag,
  //               status: _status,
  //             },
  //             // if expires not specified, the defaultExpires will be applied instead.
  //             // if set to null, then it will never expire.
  //             expires: 1000 * 3600,
  //           })
  //           resolve(`Product added ${serialtag} successfully`)
  //           break
  //       }
  //     })
  //     .catch((error) => {
  //       reject(`Error ${error} `)
  //       console.error(error)
  //     })
  // })
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
