const dateFormat = ({ date }) => {
  let dt = new Date(date)
  let y = new Intl.DateTimeFormat('en', { year: 'numeric' }).format(dt)
  let m = new Intl.DateTimeFormat('en', { month: 'short' }).format(dt)
  let d = new Intl.DateTimeFormat('en', { day: '2-digit' }).format(dt)
  return `${d}-${m}-${y}`
}

const FDate = (date) => {
  return (
    <>
      {dateFormat(date)}
    </>
  )
}

export default FDate