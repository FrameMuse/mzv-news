import "app/assets/scss/appointment.scss"
import { ArticleProps } from "app/components/Article/Article"
import { classWithModifiers } from "kotto-web-common"
import { useEffect, useState } from "react"

const appointmentWords = ["возобновление регистрации", "регистрация на долгосрочную визу"]
export default function Appointment(props: { data: ArticleProps[] }) {
  const [date, setDate] = useState<Date | null>(null)
  useEffect(() => {
    const appointmentArticle = props.data?.find(article => {
      if (appointmentWords.some(word => article.title.toLocaleLowerCase().includes(word))) {
        return true
      }

      return false
    })

    setDate(
      new Date(appointmentArticle?.updated_at || 0)
    )
  }, [props.data])
  return (
    <div className="appointment">
      <h2 className="appointment__title">Запись на регистрацию</h2>
      <p className="appointment__desc">Здесь будут даты записи. "Дальнейшии рекомендации будут тут, описание как правильно подавать визу и время..."</p>
      {date && (
        <div className="appointment__container">
          {(date.getTime() < Date.now()) ? (
            <AppointmentBlock title="Последняя дата" date={date} />
          ) : (
            <AppointmentBlock title="Текущая дата" date={date} />
          )}
        </div>
      )}
    </div>
  )
}

interface AppointmentBlockProps {
  title: string
  date?: Date
}
function AppointmentBlock(props: AppointmentBlockProps) {
  const modifiers: string[] = []
  if (!props.date) modifiers.push("no-date")
  if ((props.date?.getTime() || 0) < Date.now()) {
    modifiers.push("expired")
  }
  return (
    <div className="appointment-block">
      <div className="appointment-block__title">{props.title}:</div>
      <div className={classWithModifiers("appointment-block__date", ...modifiers)}>{props.date?.toLocaleString() || "Не известно"}</div>
    </div>
  )
}