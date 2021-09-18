import { classWithModifiers } from "kotto-web-common"

export default function Appointment() {
  return (
    <div className="appointment">
      <div className="appointment__title">Appointment</div>
      <div className="appointment__desc">Appointment Desc</div>
      <div className="appointment__container">
        <AppointmentBlock title="Последняя дата" date={new Date()} />
        <AppointmentBlock title="Текущая дата" />
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
      <div className={classWithModifiers("appointment-block__date", !!props.date && "no-date")}>{props.date?.toDateString() || "Не известно"}</div>
    </div>
  )
}