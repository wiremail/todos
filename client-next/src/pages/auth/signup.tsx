import { useRouter } from "next/router"
import Head from "next/head"

const Signup = () => {
  const router = useRouter()

  const handleSubmit = async (event: React.SyntheticEvent) => {
    event.preventDefault()

    const target = event.target as typeof event.target & {
      name: { value: string }
      email: { value: string }
      password: { value: string }
    }

    const data = {
      name: target.name.value,
      email: target.email.value,
      password: target.password.value,
    }

    const JSONdata = JSON.stringify(data)

    const endpoint = `${process.env.reqHost}/auth/signup`

    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSONdata,
    }

    const response = await fetch(endpoint, options)

    const result = await response.json()

    if (result.statusCode === 200) {
      return router.push('/auth')
    }

    alert(result.message)
  }

  return (
    <>
      <Head>
        <title>SignIn</title>
      </Head>

      <div className="w-full max-w-sm">
        <form onSubmit={handleSubmit} className="bg-white shadow-lg rounded px-8 pt-6 pb-8 m-5">
          <h5 className="text-xl font-medium text-gray-900 dark:text-white">SignUp</h5>
          <div className="items-center border-b border-grey-500 py-2">
            <input className="appearance-none bg-transparent border-none w-full text-sm text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none" type="text" name="name" placeholder="Name" />
          </div>
          <div className="items-center border-b border-grey-500 py-2">
            <input className="appearance-none bg-transparent border-none w-full text-sm text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none" type="email" name="email" placeholder="Email" />
          </div>
          <div className="mb-6 items-center border-b border-grey-500 py-2">
            <input className="appearance-none bg-transparent border-none w-full text-sm text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none" type="password" name="password" placeholder="Password" />
          </div>
          <button className="bg-blue-500 hover:bg-blue-600 text-sm text-transform: uppercase text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">Submit</button>
        </form>
      </div>
    </>
  )
}

export default Signup
