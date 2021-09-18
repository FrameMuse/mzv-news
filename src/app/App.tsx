import "app/assets/scss/main.scss"
import Article from "app/components/Article/Article"
import CaptureGroup from "app/components/CaptureGroup/CaptureGroup"
import Appointment from "app/views/Appointment"
import { useState, useEffect } from "react"
import { ArticleProps } from "./components/Article/Article"

function App() {
	const [DataJSON, setDataJSON] = useState<ArticleProps[] | null>(null)
	useEffect(() => {
		fetch("https://us-central1-mzv-news.cloudfunctions.net/function-2")
		.then(data => data.json())
		.then(data => setDataJSON(data))
	}, [])
  return (
    <div className="news-list">
      <div className="news-list-header">
        <img src="/img/icon500px.png" alt="Logo" className="news-list-header__image" />
        <h1 className="news-list-header__title">MZV Новости</h1>
        <p className="news-list-header__desc">Последнии обновления (Beta) | Задержка ~3 минуты</p>
        {/* <p className="news-list-header__desc"></p> */}
      </div>
      <Appointment />
      <CaptureGroup title="Виза">
        {/* <div className="news-list-tags">
          <h3 className="news-list-tags__title">Tag filter</h3>
          <div className="news-list-tags__container">
            <ArticleTag color="red">Запись на регистрацию</ArticleTag>
          </div>
        </div> */}
        {DataJSON?.map((article, key) => (
          <Article {...article} key={key} />
        ))}
      </CaptureGroup>
    </div>
  )
}

export default App