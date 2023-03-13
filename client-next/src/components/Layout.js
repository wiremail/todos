import Header from "./Header"
import Footer from "./Footer"

const Layout = ({ children }) => (
  <div className="min-h-screen flex flex-col mx-auto">
    <Header />
    {children}
    <Footer />
  </div>
)

export default Layout