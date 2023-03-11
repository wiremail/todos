import Head from "next/head"
import Layout from "@/components/Layout"
import '@/styles/globals.scss'

const MyApp = ({ Component, pageProps }: any) => (
  <Layout>
    <Head>
      <link href="https://fonts.googleapis.com/css2?family=Inter" rel="stylesheet" />
    </Head>
    <main>
      <Component {...pageProps} />
    </main>
  </Layout>
)

export default MyApp
