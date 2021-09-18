/**
 * Responds to any HTTP request.
 *
 * @param {!express:Request} req HTTP request context.
 * @param {!express:Response} res HTTP response context.
 */


class ArticleParser {
  constructor(data) {
    const articleList = new jsdom.JSDOM(data.replace(/\n|\t/g, "")).window.document.querySelector(".article_list")
    this.articles = [...articleList.querySelectorAll(".article")].map((articleNode) => {
      const anchor = articleNode.querySelector(".article_title a")
      const [created_at, updated_at] = articleNode.querySelector(".articleDate")?.textContent?.replace("Aktualizováno:", "")?.split("|") || []
      const text = articleNode.querySelector(".article_perex")?.textContent?.replace(" далее ►", "") || ""
      return {
        title: anchor.text,
        text,
        created_at: normalizeAndGetDate(created_at).getTime(),
        updated_at: normalizeAndGetDate(updated_at).getTime(),
        link: anchor.href,
        tags: []
      }
    })
  }
}

function normalizeAndGetDate(date) {
  const reverseDate = (date) => date.split(".").reverse().join(".")

  const [brokenDate, time] = date.split("/")
  const normalDate = reverseDate(brokenDate)
  return new Date(normalDate + time)
}


const axios = require("axios")
const jsdom = require("jsdom")

let cache = []
let cacheTime = 0

const threshold = 1 * 60 * 1000
async function cacheEffect(dataFactory) {
  if ((Date.now() - cacheTime) > threshold) {
    cache = await dataFactory()
    cacheTime = Date.now()
  }

  return cache
}

async function getAndSortArticles() {
  const response = await axios.get("https://www.mzv.cz/moscow/ru/vizy_i_konsulskaja/novosti")
  const { articles } = new ArticleParser(response.data)
  return articles.sort((a, b) => (a.updated_at >= b.updated_at) ? -1 : 1)
}

exports.parser = async (req, res) => {
  const max = req.query.max || req.body.max || 3
  const responseArticles = await cacheEffect(getAndSortArticles)

  res.status(200).send(responseArticles.slice(0, max))
}