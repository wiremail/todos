import Head from "next/head"
import Link from "next/link"
import { useRouter } from "next/router"
import { useState, useEffect } from "react"

import Heading from "@/components/Heading"
import styles from "@/styles/Todos.module.scss"

// export const getStaticProps = async () => {
//   const response = await fetch('http://localhost:4200/todos')
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
      <button onClick={handleSignout} className={styles.button}>
        SignOut
      </button>

      <Head>
        <title>Todos</title>
      </Head>
      <Heading tag="h2" text="Todos list" />
      <Link href={`/todos/new`} style={{ color: '#2196f3' }}>
        Add new todo
      </Link>
      <ul className={styles.ul}>
        {todos && todos.map(({ _id, title, isCompleted }) => (
          <div key={_id}>
            <button onClick={handleDelete} data-id={_id}>Del</button>
            <label style={{ padding: '0 1rem' }}>
              <input
                type="checkbox"
                id={_id}
                checked={isCompleted}
                onChange={handleCheck}
              />
            </label>
            <Link href={`/todos/${_id}`} style={{ textDecoration: isCompleted ? 'line-through' : 'none' }}>
              {title}
            </Link>
          </div>
        ))}
      </ul>
    </>
  )
}

export default Todos