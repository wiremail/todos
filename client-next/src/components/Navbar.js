import Link from "next/link"
import Image from "next/image"
import { useRouter } from "next/router"
import styles from "../styles/Navbar.module.scss"

const navigation = [
  { id: 1, title: 'Home', path: '/' },
  { id: 2, title: 'Todos', path: '/todos' },
  //{ id: 3, title: 'Favorites', path: '/favorites' },
]

const Navbar = () => {
  const { pathname } = useRouter()

  return (
    <nav className={styles.nav}>
      <div className={styles.logo}>
        <Image src="/logo.png" width={38} height={32} alt="todo" />
      </div>
      <div className={styles.links}>
        {navigation.map(({ id, title, path }) => (
          <Link key={id} href={path} className={pathname === path ? styles.active : null}>
            {title}
          </Link>
        ))}
      </div>
    </nav>
  )
}

export default Navbar