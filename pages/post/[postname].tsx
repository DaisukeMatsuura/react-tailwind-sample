import Link from 'next/link'
import matter from 'gray-matter'
import ReactMarkdown from 'react-markdown'

import CodeBlock from "../../components/CodeBlock"
import Layout from '../../components/Layout'

import { GetStaticProps, GetStaticPaths } from 'next'

interface P {
  markdown: string
}

export default function BlogPost({ siteTitle, frontmatter, markdownBody }) {
  if (!frontmatter) return <></>

  return (
      <Layout pageTitle={`${siteTitle} | ${frontmatter.title}`}>
        <Link href="/">
          <a className="underline">← Back to post list</a>
        </Link>
        <article className="mt-10">
          <h1 className="text-2xl mb-4">{frontmatter.title}</h1>
          <div className="flex justify-between mb-6">
            <div className="text-gray-500">{frontmatter.date}</div>
            <div className="flex items-center">
              <div className="">By {frontmatter.author}</div>
              <img src="/daisuke.png" className="w-8 h-8 rounded-full border ml-2"></img>
            </div>
          </div>
          <div className="markdown">
            <ReactMarkdown
              source={markdownBody}
              renderers={{ code: CodeBlock }}
            />
          </div>
        </article>
        <Link href="/">
          <div className="flex bg-black hover:bg-gray-400 text-white hover:text-black w-20 h-10 mx-auto items-center justify-center rounded-full uppercase my-20 cursor-pointer">
            top
          </div>
        </Link>
      </Layout>
  )
}

export const getStaticProps: GetStaticProps = async ({ ...ctx }) => {
  const { postname } = ctx.params

  const content = await import(`../../posts/${postname}.md`)
  const config = await import(`../../siteconfig.json`)
  const data = matter(content.default)

  return {
    props: {
      siteTitle: config.title,
      frontmatter: data.data,
      markdownBody: data.content,
    },
  }
}

export const getStaticPaths: GetStaticPaths = async () => {
  const blogSlugs = ((context) => {
    const keys = context.keys()
    const data = keys.map((key, index) => {
      let slug = key.replace(/^.*[\\\/]/, '').slice(0, -3)

      return slug
    })
    return data
  })(require.context('../../posts', true, /\.md$/))

  const paths = blogSlugs.map((slug) => `/post/${slug}`)

  return {
    paths,
    fallback: false,
  }
}