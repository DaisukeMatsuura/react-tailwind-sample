import Head from 'next/head'
import Header from './Header'
import Footer from './Footer'

export default function Layout({ children, pageTitle, ...props }) {
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>{pageTitle}</title>
      </Head>
      <Header />
      <section>
        <div className="m-20 lg:mx-40 xl:mx-64 2xl:mx-80 font-sans">{children}</div>
      </section>
      <Footer />

    </>
  )
}