import moment from "moment"
import storage from "../storage"
const storeData = () => {}

export default async function codeProcesser(type, data) {
  const _date = new Date()
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
        const _status = payload.Statusr
        const _tag = payload.tag
        /* Check for old data*/
        if (_status === "Success") {
          storage
            .load({
              key: "productdata",
            })
            .then((data) => {
              // found data goes to then()
              console.log(data)
            })
            .catch((err) => {
              // any exception including data not found
              // goes to catch()
              console.warn(err.message)
              switch (err.name) {
                case "NotFoundError":
                  storage.save({
                    key: "productdata", // Note: Do not use underscore("_") in key!
                    data: {
                      date: moment(_date).format("MMMM Do YYYY, h:mm:ss a"),
                      id: serialtag,
                      status: _status,
                    },
                  })
                  break
                case "ExpiredError":
                  storage.save({
                    key: "productdata", // Note: Do not use underscore("_") in key!
                    data: {
                      date: moment(_date).format("MMMM Do YYYY, h:mm:ss a"),
                      id: serialtag,
                      status: _status,
                    },

                    // if expires not specified, the defaultExpires will be applied instead.
                    // if set to null, then it will never expire.
                    expires: 1000 * 3600,
                  })
                  break
              }
            })

          resolve(`Product ${_tag} verification successfully`)
        } else {
          resolve(`Product ${_tag} verification not successful`)
        }
      })
      .catch((error) => {
        reject(`Error ${error} `)
        console.error(error)
      })
  })
}

const idExtracter = (raw) => {
  console.log(raw)
  raw = raw.split(/\r?\n/)
  raw = Object.values(raw)
  return raw[5]
}
