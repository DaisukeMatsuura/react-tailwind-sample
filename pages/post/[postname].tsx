import Link from 'next/link'
import matter from 'gray-matter'
import ReactMarkdown from 'react-markdown'

import Layout from '../../components/Layout'

import { GetStaticProps, GetStaticPaths } from 'next'

export default function BlogPost({ siteTitle, frontmatter, markdownBody }) {
  if (!frontmatter) return <></>

  return (
      <Layout pageTitle={`${siteTitle} | ${frontmatter.title}`}>
        <Link href="/">
          <a>Back to post list</a>
        </Link>
        <article>
          <h1 className="text-xl my-2">{frontmatter.title}</h1>
          <p className="my-2">By {frontmatter.author}</p>
          <div>
            <ReactMarkdown source={markdownBody} />
          </div>
        </article>
      </Layout>
  )
}

export const getStaticProps: GetStaticProps = async ({ ...ctx }) => {
// export async function getStaticProps({ ...ctx }) {
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
// export async function getStaticPaths() {
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