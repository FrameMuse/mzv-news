const fs = require("fs")

const __DIR__ = process.env.PWD + "/src/data"
const threshold = 1 * 60 * 1000

async function handleData() {
  const axios = require("axios")
  const dataRequest = axios.get("https://us-central1-mzv-news.cloudfunctions.net/function-2?max=2")
  const dataResponse = await dataRequest
  const dataResponseString = JSON.stringify(dataResponse.data)

  fs.writeFileSync(__DIR__ + "/data.json", dataResponseString)
  fs.writeFileSync(__DIR__ + "/lastUpdateTime.txt", String(Date.now()))

  return dataResponseString
}

const http = require('http')

const server = http.createServer((req, res) => {
  const lastUpdateTime = Number(fs.readFileSync(__DIR__ + "/lastUpdateTime.txt"))
  if ((Date.now() - lastUpdateTime) > threshold) {
    handleData().then(data => {
      res.writeHead(200).end(data)
    })
  } else {
    const data = fs.readFileSync(__DIR__ + "/data.json").toString()
    res.writeHead(200).end(data)
  }
})
server.listen(80)