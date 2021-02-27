import Link from 'next/link'

export default function PostList({ posts }) {
  if (posts === 'undefined') return null

  return (
    <div>
      {!posts && <div>No posts!</div>}
      <ul>
        {posts &&
          posts.map((post) => {
            return (
              <div key={post.slug} className="container mx-auto">
                <div className="text-3xl mt-8">{post.frontmatter.title}</div>
                <div className="flex justify-between mt-4 mb-10">
                  <div className="text-gray-500">{post.frontmatter.date}</div>
                  <div className="flex items-center">
                    <img src="/daisuke.jpg" className="w-8 h-8 rounded-full mr-2"></img>
                    <div className="">{post.frontmatter.author}</div>
                  </div>
                </div>
                <div className="mt-10 mb-10">{post.frontmatter.excerpt}</div>
                <Link href={{ pathname: `/post/${post.slug}` }}>
                  <a className="underline">続きを読む →</a>
                </Link>
              </div>
            )
          })
        }
      </ul>
    </div>
  )
}