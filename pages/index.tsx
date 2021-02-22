import Head from 'next/head'

export default function Home() {
  return (
    <div className="text-center">
      <Head>
        <title>Next.js Blog by TailwindCSS</title>
        <link rel="icon" href="https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/120/apple/271/fire_1f525.png" />
      </Head>
      <div className="m-20">
        Hello World!
      </div>
    </div>
  )
}
