import Head from 'next/head'
import Header from './Header'
import Footer from './Footer'

export default function Layout({ children, pageTitle, ...props }) {
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>{pageTitle}</title>
        <link rel="icon" href="https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/240/apple/271/wind-face_1f32c-fe0f.png" />
      </Head>
      <Header />
      <section>
        <div className="m-20 lg:mx-40 xl:mx-64 2xl:mx-80 font-sans">{children}</div>
      </section>
      <Footer />

    </>
  )
}