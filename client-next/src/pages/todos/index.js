import Head from "next/head"
import Link from "next/link"
import Image from "next/image"
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
  const [page, setPage] = useState(1) //+(router.query?.p ?? '1')
  const [pages, setPages] = useState(1)
  const [count, setCount] = useState(0)
  const entriesPerPage = 5

  useEffect(() => {
    async function fetchCount() {
      const jwt = localStorage.getItem('jwt')
      if (!jwt) {
        return router.push('/auth')
      }

      const res = await fetch(`${process.env.reqHost}/todos/user/docs`, {
        headers: {
          "Content-Type": "application/json",
          "Authorization": "Bearer " + localStorage.getItem("jwt")
        }
      })

      if (res.ok) {
        const count = await res.json()
        const pages = Math.ceil(count / entriesPerPage)
        setCount(count)
        setPages(pages)
      }
    }

    fetchCount()
  }, [todos])

  useEffect(() => {
    async function fetchTodos() {
      const jwt = localStorage.getItem('jwt')
      if (!jwt) {
        return router.push('/auth')
      }

      const res = await fetch(`${process.env.reqHost}/todos/user/page/${page}`, {
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
  }, [page])

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
      if (!current.length) return setPage(page => page > 1 ? page - 1 : 1)
    }
  }

  const handleSignout = () => {
    localStorage.clear()
    return router.push('/')
  }

  const handlePrevious = () => {
    setPage(page => page > 1 ? page - 1 : 1)
  }
  const handleNext = () => {
    setPage(page => page < pages ? page + 1 : page)
  }

  return (
    <>
      <Head>
        <title>Todos</title>
      </Head>

      <div className="container  align-text-top">
        <button className="bg-blue-500 hover:bg-blue-600 text-sm text-transform: uppercase text-white font-bold py-2 px-4 rounded" onClick={handleSignout}>
          SignOut
        </button>
      </div>
      <div className="w-full max-w-md m-4 p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-8">{/* max-h-[600px] overflow-x-scroll */}
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
                    <Image className="cursor-pointer" onClick={handleDelete} data-id={_id} src="/trash.svg" width={18} height={18} alt="" />
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>

        {
          pages > 1 &&
          <div className="flex flex-col items-center  border-t border-gray-200 bg-white px-4 py-3 sm:px-6">
            <span className="text-sm text-gray-700 dark:text-gray-400">
              Showing <span className="font-semibold text-gray-900 dark:text-white">{(page - 1) * entriesPerPage + 1}</span> to <span className="font-semibold text-gray-900 dark:text-white">{page * entriesPerPage > count ? count : page * entriesPerPage}</span> of <span className="font-semibold text-gray-900 dark:text-white">{count}</span> Entries
            </span>
            <div className="inline-flex justify-between mt-2 xs:mt-0">
              <button onClick={handlePrevious} className={`inline-flex items-center px-4 py-2 mr-3 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white ${page === 1 ? "cursor-not-allowed" : ""}`}>
                <Image src="/arrow-left.svg" width={12} height={12} alt="" />
                &nbsp;Previous
              </button>
              <button onClick={handleNext} className={`inline-flex items-center px-4 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white ${page === pages ? "cursor-not-allowed" : ""}`}>
                Next&nbsp;
                <Image src="/arrow-right.svg" width={12} height={12} alt="" />
              </button>
            </div>
          </div>
        }
      </div>
    </>
  )
}

export default Todos