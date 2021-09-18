const fs = require("fs")

const threshold = 1 * 60 * 1000
const lastUpdateTime = Number(fs.readFileSync("lastUpdateTime.txt"))

async function handleData() {
  const axios = require("axios")
  const dataRequest = axios.get("https://us-central1-mzv-news.cloudfunctions.net/function-2?max=2")
  const dataResponse = await dataRequest

  fs.writeFileSync("data.json", dataResponse)
  fs.writeFileSync("lastUpdateTime.txt", Date.now())

  return dataResponse
}

if ((Date.now() - lastUpdateTime) > threshold) {
  handleData().then(console.log)
} else {
  console.log(fs.readFileSync("data.json"))
}

// (req, res) => {
//   const max = req.query.max || req.body.max || 3
//   cacheEffect(async () => {
//     const response = await axios.get("https://www.mzv.cz/moscow/ru/vizy_i_konsulskaja/novosti")
//     const articleParser = new ArticleParser(response.data)
//     return articleParser.articles.sort((a, b) => a.updated_at >= b.updated_at ? -1 : 1).slice(0, max)
//   }).then(res.status(200).send)
// }