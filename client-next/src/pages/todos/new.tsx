import { useRouter } from "next/router"

const TodoCreate = () => {
  const router = useRouter()

  const handleSubmit = async (event: React.SyntheticEvent) => {
    event.preventDefault()

    const target = event.target as typeof event.target & {
      title: { value: string }
      description: { value: string }
    }

    const data = {
      title: target.title.value,
      description: target.description.value,
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

    //console.log(response)
    alert(response.statusText)
  }

  return (
    <>
      <div className="w-full max-w-sm">
        <form onSubmit={handleSubmit} className="bg-white shadow-lg rounded px-8 pt-6 pb-8 m-5">
          <h5 className="text-xl font-medium text-gray-900 dark:text-white">Create Todo</h5>
          <div className="items-center border-b border-grey-500 py-2">
            <input className="appearance-none bg-transparent border-none w-full text-sm text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none" type="text" name="title" placeholder="Title" />
          </div>
          <div className="items-center border-b border-grey-500 py-2">
            <input className="appearance-none bg-transparent border-none w-full text-sm text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none" type="text" name="description" placeholder="Description" />
          </div>
          <button className="bg-blue-500 hover:bg-blue-600 text-sm text-transform: uppercase text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">Submit</button>
        </form>
      </div>
    </>
  )
}

export default TodoCreate