import Head from 'next/head'
import Header from './Header'

export default function Layout({ children, pageTitle, ...props }) {
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta property="og:url" content="https://happy-banach-3631af.netlify.app/" />
        <meta property="og:type" content="blog" />
        <meta property="og:title" content={pageTitle} />
        <meta property="og:description" content="Next.js と TailwindCSS を使ってBlogを構築し Netlify にデプロイする方法を解説するブログ！" />
        <meta property="og:site_name" content="BrightfulBlog" />
        <meta property="og:image" content="https://happy-banach-3631af.netlify.app/daisuke.png" />
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:site" content="@daisuke_phper" />
        <title>{pageTitle}</title>
      </Head>
      <Header />
      <section>
        <div className="m-8 md:mx-14 lg:mx-40 xl:mx-64 2xl:mx-80 font-sans">{children}</div>
      </section>

    </>
  )
}