import matter from 'gray-matter'

import Layout from '../components/Layout'
import PostList from '../components/PostList'
import Footer from '../components/Footer'

import { GetStaticProps } from 'next'

const Index = ({ title, description, ...props }) => {
  return (
        <>
          <Layout pageTitle={title}>
            <h1 className="text-lg">{description}</h1>
            <main>
              <PostList posts={props.posts} />
            </main>
          </Layout>
          <Footer />
        </>
        )
}

export default Index

export const getStaticProps: GetStaticProps = async () => {
//export async function getStaticProps() {
    const configData = await import(`../siteconfig.json`)

    const posts = ((context) => {
        const keys = context.keys()
        const values = keys.map(context)

        const data = keys.map((key, index) => {
            let slug = key.replace(/^.*[\\\/]/, '').slice(0, -3)
            const value: any = values[index]
            const document = matter(value.default)
            return {
                frontmatter: document.data,
                markdownBody: document.content,
                slug,
            }
        })
        return data
    })(require.context('../posts', true, /\.md$/))

    return {
        props: {
            posts,
            title: configData.default.title,
            description: configData.default.description,
        },
    }
}