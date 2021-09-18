// import { classWithModifiers } from "kotto-web-common";

import { classWithModifiers } from "kotto-web-common"

export interface ArticleProps {
  title: string
  text: string
  created_at: string
  updated_at: string
  tags: string[]
  link: string
}
export default function Article(props: ArticleProps) {
  return (
    <div className="news-article">
      <h3 className="news-article__title">{props.title}</h3>
      <small className="news-article__details">
        <span>
          Создано: {props.created_at} \ Обновлено: {props.updated_at} \ Тэги:
        </span>
        {/* {props.tags.map((tag, key) => (
          <ArticleTag color="red" key={key}>{tag}</ArticleTag>
        ))} */}
      </small>
      <p className="news-article__text">{props.text}</p>
      <a href={props.link} className="news-article__more">Подробнее...</a>
    </div>
  )
}


interface ArticleTagProps {
  color: "red" | "green" | "blue"
  children: any
}
export function ArticleTag(props: ArticleTagProps) {
  return (
    <span className={classWithModifiers("article-tag", props.color)}>{props.children}</span>
  )
}