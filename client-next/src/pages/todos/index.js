import Head from "next/head"
import Link from "next/link"
import { useRouter } from "next/router"
import { useState, useEffect } from "react"
import FDate from "@/components/FDate"

// export const getStaticProps = async () => {
//   const response = await fetch(`${process.env.reqHost}/todos`)
//   const data = await response.json()

//   if (!data) {
//     return {
//       notFound: true,
//     }
//   }

//   return {
//     props: { todos: data },
//   }
// }

const Todos = (/*{ todos }*/) => {
  const router = useRouter()

  const [todos, setTodos] = useState(null)

  useEffect(() => {
    async function fetchTodos() {
      const jwt = localStorage.getItem('jwt')
      if (!jwt) {
        return router.push('/auth')
      }

      const res = await fetch(`${process.env.reqHost}/todos/user/1`, {
        headers: {
          "Content-Type": "application/json",
          "Authorization": "Bearer " + localStorage.getItem("jwt")
        }
      })
      if (res.ok) {
        const json = await res.json()
        setTodos(json)
      }
    }

    fetchTodos()
  }, [])

  const handleCheck = async (event) => {
    const id = event.target.id

    const copy = [...todos]
    const current = copy.find(t => t._id === id)
    current.isCompleted = !current.isCompleted
    setTodos(copy)

    const data = {
      isCompleted: event.target.checked,
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
    //console.log('response', response)
  }

  const handleDelete = async (event) => {
    const id = event.currentTarget.dataset.id

    const endpoint = `${process.env.reqHost}/todos/${id}`

    const options = {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        "Authorization": "Bearer " + localStorage.getItem("jwt")
      },
    }

    const response = await fetch(endpoint, options)

    if (response.ok) {
      const copy = [...todos]
      const current = copy.filter(t => t._id !== id)
      setTodos(current)
    }
  }

  const handleSignout = () => {
    localStorage.clear()
    return router.push('/')
  }

  return (
    <>
      <Head>
        <title>Todos</title>
      </Head>
      <div className="container">
        <button className="bg-blue-500 hover:bg-blue-600 text-sm text-transform: uppercase text-white font-bold py-2 px-4 rounded" onClick={handleSignout}>
          SignOut
        </button>
      </div>

      <div className="w-full max-w-md max-h-[600px] overflow-x-scroll m-4 p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-8">
        <div className="flex items-center justify-between mb-4">
          <h5 className="text-xl font-bold leading-none text-gray-900 dark:text-white">Todos list</h5>
          <span className="text-sm font-medium text-blue-600 hover:underline dark:text-blue-500">
            <Link href={`/todos/new`}>
              Add new todo
            </Link>
          </span>
        </div>
        <div className="flow-root">
          <ul role="list" className="divide-y divide-gray-200 dark:divide-gray-700">
            {todos && todos.map(({ _id, title, isCompleted, createdAt }) => (
              <li className="py-3 sm:py-4" key={_id}>
                <div className="flex items-center space-x-4">
                  <div className="flex-shrink-0">
                    <input
                      type="checkbox"
                      id={_id}
                      checked={isCompleted}
                      onChange={handleCheck}
                      className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded"
                    />
                  </div>
                  <div className="flex-1 min-w-0 text-start">
                    <p className="text-sm font-bold text-gray-800 truncate dark:text-white">
                      <Link href={`/todos/${_id}`} style={{ textDecoration: isCompleted ? 'line-through' : 'none' }}>
                        {title}
                      </Link>
                    </p>
                    <p className="text-sm text-gray-500 truncate dark:text-gray-400">
                      <FDate date={createdAt} />
                    </p>
                  </div>
                  <div className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
                    <a onClick={handleDelete} data-id={_id} className="text-sm text-transform: uppercase text-blue-600 cursor-pointer font-bold">Del</a>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  )
}

export default Todos