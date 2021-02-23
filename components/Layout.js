import Head from 'next/head'
import Header from './Header'

export default function Layout({ children, pageTitle, ...props }) {
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>{pageTitle}</title>
        <link rel="icon" href="https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/240/apple/271/wind-face_1f32c-fe0f.png" />
      </Head>
      <section className="container m-10">
        <Header />
        <div className="content">{children}</div>
      </section>
      <footer className="m-10">Built by me!</footer>
    </>
  )
}