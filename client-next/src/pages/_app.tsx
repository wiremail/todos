import Layout from "@/components/Layout"
import '@/styles/globals.css'

const MyApp = ({ Component, pageProps }: any) => (
  <Layout>
    <main className="bg-zinc-100 text-center text-5xl flex-1 flex flex-wrap items-center justify-center text-zinc-500">
      <Component {...pageProps} />
    </main>
  </Layout>
)

export default MyApp
