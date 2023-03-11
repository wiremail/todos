import { useRouter } from "next/router"
import Heading from "./Heading"
import styles from "@/styles/Auth.module.scss"

const TodoInfo = ({ todo }) => {
  const router = useRouter()

  const { _id, title, description } = todo || {}

  if (!todo) {
    return <Heading tag="h3" text="Empty todo" />
  }

  const handleSubmit = async (event) => {
    event.preventDefault()

    const id = event.target.id.value

    const data = {
      title: event.target.title.value,
      description: event.target.description.value,
    }

    const JSONdata = JSON.stringify(data)

    const endpoint = `${process.env.reqHost}/todos/${id}`

    const options = {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        "Authorization": "Bearer " + localStorage.getItem("jwt")
      },
      body: JSONdata,
    }

    const response = await fetch(endpoint, options)

    if (response.ok) {
      return router.push('/todos')
    }

    alert(json.message)
  }

  return (
    <>
      <div className={styles.container}>
        <form onSubmit={handleSubmit}>
          <Heading text="Edit Todo" />

          <label>Title:</label>
          <input type="text" name="title" defaultValue={title} />

          <label>Description:</label>
          <input type="text" name="description" defaultValue={description} />

          <input type="hidden" name="id" value={_id} />

          <button type="submit">Submit</button>
        </form>
      </div>
    </>
  )
}

export default TodoInfo