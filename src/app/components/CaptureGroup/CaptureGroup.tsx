interface CaptureGroupProps {
  title: string
  children: any
}
function CaptureGroup(props: CaptureGroupProps) {
  return (
    <div className="news-list-capture">
      <h2 className="news-list-capture__title">{props.title}</h2>
      <div className="news-list-capture__container">{props.children}</div>
    </div>
  )
}

export default CaptureGroup