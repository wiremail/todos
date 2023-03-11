import { useRouter } from "next/router"
import Head from "next/head"
import Link from "next/link"
import Heading from "@/components/Heading"
import styles from "@/styles/Auth.module.scss"

const Signin = () => {
  const router = useRouter()

  const handleSubmit = async (event) => {
    event.preventDefault()

    const data = {
      name: event.target.name.value,
      email: event.target.email.value,
      password: event.target.password.value,
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

      <div className={styles.container}>
        <form onSubmit={handleSubmit}>
          <Heading text="SignIn" />
          <p>
            <Link href={`/auth/signup`} style={{ color: '#2196f3' }}>
              SignUp
            </Link> if you don't have an account yet
          </p>

          <label>Email:</label>
          <input type="email" name="email" />

          <label>Password:</label>
          <input type="password" name="password" />

          <button type="submit">Submit</button>
        </form>
      </div>
    </>
  )
}

export default Signin