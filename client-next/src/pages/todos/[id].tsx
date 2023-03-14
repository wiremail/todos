import TodoForm from "@/components/TodoForm"
import { GetStaticPropsContext } from "next"
import { ITodo } from "../types/types"

export const getStaticPaths = async () => {
  const response = await fetch(`${process.env.reqHost}/todos/`)
  const data = await response.json()

  const paths = data.map(({ _id }: { _id: string }) => ({
    params: { id: _id.toString() }
  }))

  return {
    paths,
    fallback: false,
  }
}

export const getStaticProps = async (context: GetStaticPropsContext) => {
  const { id }: any = context.params
  const response = await fetch(`${process.env.reqHost}/todos/${id}`)
  const todo = await response.json()

  if (!todo) {
    return {
      notFound: true,
    }
  }

  return {
    props: todo,
  }
}

const Todo = (todo: ITodo) => {
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
    <TodoForm {...todo} />
  )
}

export default Todo