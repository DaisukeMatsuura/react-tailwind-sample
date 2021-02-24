import Link from 'next/link'

export default function Header() {
  return (
    <>
      <header className="header">
        <nav className="mb-20">
          <Link href="/">
            <a className="rounded-full bg-blue-400 p-4 m-10">My Blog</a>
          </Link>
          <Link href="/about">
            <a className="rounded-full bg-pink-400 p-4 m-10">About</a>
          </Link>
        </nav>
      </header>
    </>
  )
}