import Link from "next/link"
import Image from "next/image"
import { useRouter } from "next/router"

const navigation = [
  { id: 1, title: 'Home', path: '/' },
  { id: 2, title: 'Todos', path: '/todos' },
  //{ id: 3, title: 'Favorites', path: '/favorites' },
]

const Navbar = () => {
  const { pathname } = useRouter()

  return (
    <nav className="flex justify-between items-center h-[50px] px-5 shadow-md bg-zinc-600 text-white">
      <div className="flex items-center">
        <Image src="/logo.png" width={38} height={32} alt="Todos App" />
        <div className="ml-4 font-bold">Todos App</div>
      </div>

      <span>
        {navigation.map(({ id, title, path }) => (
          <Link key={id} href={path} className={pathname === path ? "text-blue-400 ml-2" : "text-white ml-2"}>
            {title}
          </Link>
        ))}
      </span>
    </nav>
  )
}

export default Navbar