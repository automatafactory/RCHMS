import moment from "moment"

const storeData = () => {}

export default async function codeProcesser(type, data) {
  return new Promise(async (resolve, reject) => {
    let tag = await idExtracter(data)
    await fetch("http://192.168.1.2:8000/verify", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        productid: `${tag}`,
      }),
    })
      .then((response) => response.json())
      .then((payload) => {
        console.log(payload)
        const _status = payload.Status
        const _tag = payload.tag
        if (_status === "Success") {
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
