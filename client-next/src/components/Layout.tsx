import Header from "./Header"
import Footer from "./Footer"

type Props = { children: React.ReactNode }

const Layout: React.FC<Props> = ({ children }) => (
  <div className="min-h-screen flex flex-col mx-auto">
    <Header />
    {children}
    <Footer />
  </div>
)

export default Layout