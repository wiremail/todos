import Head from 'next/head'
import Image from "next/image"

const Home = () => (
  <>
    <Head>
      <title>Home</title>
    </Head>
    <div>
      <h1 className="font-bold">Todos Application</h1>
      <div className="flex items-center justify-between mt-4">
        <Image src="/nest.svg" width={128} height={64} alt="Nest.js" />
        <span className="mx-4">+</span>
        <Image src="/next.svg" width={128} height={64} alt="Next.js" />
      </div>
    </div>
  </>
)

export default Home
