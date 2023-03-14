import { useRouter } from "next/router"
import Head from "next/head"
import Link from "next/link"

const Signin = () => {
  const router = useRouter()

  const handleSubmit = async (event: React.SyntheticEvent) => {
    event.preventDefault()

    const target = event.target as typeof event.target & {
      email: { value: string }
      password: { value: string }
    }

    const data = {
      email: target.email.value,
      password: target.password.value,
    }

    const JSONdata = JSON.stringify(data)

    const endpoint = `${process.env.reqHost}/auth/signin`

    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSONdata,
    }

    const response = await fetch(endpoint, options)

    const json = await response.json()

    if (json.statusCode === 200) {
      localStorage.setItem("jwt", json.jwt)
      return router.push('/todos')
    }

    alert(json.message)
  }

  return (
    <>
      <Head>
        <title>SignIn</title>
      </Head>

      <div className="w-full max-w-sm">
        <form onSubmit={handleSubmit} className="bg-white shadow-lg rounded px-8 pt-6 pb-8 mb-4">
          <h5 className="text-xl font-medium text-gray-900 dark:text-white">SignIn</h5>
          <p className="text-sm m-5">
            <Link href={`/auth/signup`} style={{ color: '#2196f3' }}>
              SignUp
            </Link> if you don't have an account yet
          </p>
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

export default Signin