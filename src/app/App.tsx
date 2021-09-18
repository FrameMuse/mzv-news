import "app/assets/scss/main.scss"
import Article from "app/components/Article/Article"
import CaptureGroup from "app/components/CaptureGroup/CaptureGroup"
import Novosti from "data/novosti.json"
import Appointment from "app/views/Appointment"

function App() {
  return (
    <div className="news-list">
      <div className="news-list-header">
        <h1 className="news-list-header__title">MZV Новости</h1>
        <p className="news-list-header__desc">Последнии обновления (Beta)</p>
        <p className="news-list-header__desc">| Задержка ~2 минуты</p>
      </div>
      <Appointment />
      <CaptureGroup title="Виза">
        {/* <div className="news-list-tags">
          <h3 className="news-list-tags__title">Tag filter</h3>
          <div className="news-list-tags__container">
            <ArticleTag color="red">Запись на регистрацию</ArticleTag>
          </div>
        </div> */}
        {Novosti.map((article, key) => (
          <Article {...article} key={key} />
        ))}
      </CaptureGroup>
    </div>
  )
}

export default App