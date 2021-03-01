import Link from 'next/link'

export default function Header() {
  return (
    <>
      <header className="bg-black h-20">
        <nav className="mb-20 flex items-center h-20">
          <Link href="/">
            <a className="text-white pl-8 md:pl-20 lg:pl-40 xl:pl-64 2xl:pl-80">Brightful Blog</a>
          </Link>
          <Link href="/about">
            <a className="text-white pl-20">About</a>
          </Link>
        </nav>
      </header>
    </>
  )
}