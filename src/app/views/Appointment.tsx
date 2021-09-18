import "app/assets/scss/appointment.scss"
import { classWithModifiers } from "kotto-web-common"

export default function Appointment() {
  return (
    <div className="appointment">
      <h2 className="appointment__title">Запись на регистрацию</h2>
      <p className="appointment__desc">Здесь будут даты записи. "Дальнейшии рекомендации будут тут, описание как правильно подавать визу и время..."</p>
      <div className="appointment__container">
        <AppointmentBlock title="Текущая дата" />
        <AppointmentBlock title="Последняя дата" date={new Date()} />
      </div>
    </div>
  )
}

interface AppointmentBlockProps {
  title: string
  date?: Date
}
function AppointmentBlock(props: AppointmentBlockProps) {
  return (
    <div className="appointment-block">
      <div className="appointment-block__title">{props.title}:</div>
      <div className={classWithModifiers("appointment-block__date", !props.date && "no-date")}>{props.date?.toLocaleString() || "Не известно"}</div>
    </div>
  )
}