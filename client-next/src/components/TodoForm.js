import { useRouter } from "next/router"
import Heading from "./Heading"

const TodoForm = ({ todo }) => {
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

    alert(response.statusText)
  }

  return (
    <>
      <div className="w-full max-w-sm">
        <form onSubmit={handleSubmit} className="bg-white shadow-lg rounded px-8 pt-6 pb-8 m-5">
          <h5 className="text-xl font-medium text-gray-900 dark:text-white">Create Todo</h5>
          <div className="items-center border-b border-grey-500 py-2">
            <input
              className="appearance-none bg-transparent border-none w-full text-sm text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"
              type="text"
              name="title"
              placeholder="Title"
              defaultValue={title}
            />
          </div>
          <div className="items-center border-b border-grey-500 py-2">
            <input
              className="appearance-none bg-transparent border-none w-full text-sm text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"
              type="text"
              name="description"
              placeholder="Description"
              defaultValue={description}
            />
          </div>
          <input type="hidden" name="id" value={_id} />
          <button
            className="bg-blue-500 hover:bg-blue-600 text-sm text-transform: uppercase text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
          >
            Submit
          </button>
        </form>
      </div>
    </>
  )
}

export default TodoForm