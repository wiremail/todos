import { useRouter } from "next/router"
import Head from "next/head"
import Heading from "@/components/Heading"
import styles from "@/styles/Auth.module.scss"

const Signup = () => {
  const router = useRouter()

  const handleSubmit = async (event) => {
    event.preventDefault()

    const data = {
      name: event.target.name.value,
      email: event.target.email.value,
      password: event.target.password.value,
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

      <div className={styles.container}>
        <form onSubmit={handleSubmit}>
          <Heading text="SignUp" />
          <label>Name:</label>
          <input type="text" name="name" defaultValue="test" />

          <label>Email:</label>
          <input type="email" name="email" defaultValue="email3@mail.com" />

          <label>Password:</label>
          <input type="password" name="password" defaultValue="qwerty" />

          <button type="submit">Submit</button>
        </form>
      </div>
    </>
  )
}

export default Signup