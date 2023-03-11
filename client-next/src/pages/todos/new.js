import { useRouter } from "next/router"
import Heading from "../../components/Heading"
import styles from "@/styles/Auth.module.scss"

const TodoCreate = () => {
  const router = useRouter()

  const handleSubmit = async (event) => {
    event.preventDefault()

    const data = {
      title: event.target.title.value,
      description: event.target.description.value,
    }

    const JSONdata = JSON.stringify(data)

    const endpoint = `http://localhost:4200/todos`

    const options = {
      method: 'POST',
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
          <Heading text="Create Todo" />

          <label>Title:</label>
          <input type="text" name="title" />

          <label>Description:</label>
          <input type="text" name="description" />

          <button type="submit">Submit</button>
        </form>
      </div>
    </>
  )
}

export default TodoCreate