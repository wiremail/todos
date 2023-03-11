import TodoInfo from "@/components/TodoInfo"

export const getStaticPaths = async () => {
  const response = await fetch('http://localhost:4200/todos/')
  const data = await response.json()

  const paths = data.map(({ _id }) => ({
    params: { id: _id.toString() }
  }))

  return {
    paths,
    fallback: false,
  }
}

export const getStaticProps = async (context) => {
  const { id } = context.params
  const response = await fetch(`http://localhost:4200/todos/${id}`)
  const data = await response.json()

  if (!data) {
    return {
      notFound: true,
    }
  }

  return {
    props: { todo: data },
  }
}

const Todo = ({ todo }) => {
  // const [todo, setTodo] = useState(null)

  // useEffect(() => {
  //   async function fetchTodo() {
  //     const res = await fetch(`${process.env.reqHost}/todos/${id}`, {
  //       headers: {
  //         "Content-Type": "application/json",
  //         "Authorization": "Bearer " + localStorage.getItem("jwt")
  //       }
  //     })
  //     if (res.ok) {
  //       const json = await res.json()
  //       setTodo(json)
  //     }
  //   }

  //   fetchTodo()
  // }, [])

  return (
    <TodoInfo todo={todo} />
  )
}

export default Todo