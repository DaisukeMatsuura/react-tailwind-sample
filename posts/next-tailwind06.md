---
title: 'Next.js+TailwindCSS製Blog構築⑥'
author: 'Daisuke'
date: '2021年3月5日'
excerpt: 'ブログシステムの構築も終盤となってまいりました！もうしばらくお付き合いください。  
それではやっていきましょう！まずは、トップページに表示するコンテンツを考えていきます。  
トップページでは、ブログ記事の一覧と...'
---

※本記事は、各ページの表示コンテンツの加筆修正とデザイン部分の修正をおこなっていく内容となっております。  
本記事を既に読まれたという方は[次の記事](/post/next-tailwind07)に移動してください！

# ｜表示コンテンツの整理
ブログシステムの構築も終盤となってまいりました！もうしばらくお付き合いください。  
それではやっていきましょう！まずは、トップページに表示するコンテンツを考えていきます。
トップページでは、ブログ記事の一覧と、記事へのリンクを設置していきたいと思います！  
`components/PostList.js`を開き、以下のように記述してください。
```javascript
// PostList.js
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
                <Link href={{ pathname: `/post/${post.slug}` }}>
                  <div className="text-2xl mt-20 hover:underline hover:text-blue-800">
                    {post.frontmatter.title}
                  </div>
                </Link>
                <div className="flex items-center">
                  {post.frontmatter.author}
                </div>
                <div className="mt-8 mb-10 text-justify">
                  {post.frontmatter.excerpt}
                </div>
                <Link href={{ pathname: `/post/${post.slug}` }}>
                  <a className="underline hover:text-blue-800">続きを読む →</a>
                </Link>
              </div>
            )
          })
        }
      </ul>
    </div>
  )
}
```
それから、`pages/index.js`を以下のように修正してください。
```javascript
// index.js
import matter from 'gray-matter'
import Layout from '../components/Layout'
import PostList from '../components/PostList'

const Index = ({ title, description, posts }) => {

  return (
    <Layout pageTitle={title}>
      <div>ここがLayoutコンポーネントのChildren部分です</div>
      <div>{description}</div>
      <PostList posts={posts} />
    </Layout>
  )
}

export default Index

export async function getStaticProps() {
  const configData = await import(`../siteconfig.json`)

  const posts = ((context) => {
    const keys = context.keys()
    const values = keys.map(context)

    const data = keys.map((key, index) => {
      let slug = key.replace(/^.*[\\\/]/, '').slice(0, -3)
      const value = values[index]
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
```
また、記事の概要についてもリスト内で表示させたいので`mypost.md`ファイルの FrontMatter 部分に`excerpt`項目を追加してください。
```markdown
// mypost.md (※この行は含めないでください！)
---
title: 'ブログのタイトル'
author: 'ブログの筆者'
excerpt: 'ブログ記事の概要をここに記述ブログ記事の概要をここに記述ブログ記事の概要をここに記述ブログ記事の概要をここに記述'
---
↓ここからマークダウンのボディ↓  
色んなマークダウンの書き方を試してみて、  
`どのように表示されるか`確認してみましょう！
- リスト１
- リスト２
- リスト３
```
この状態で画面を確認してみると以下のようになっているかと思います。
少し不恰好ですが、後でレイアウト修正しますので、もうしばらく我慢してください。
![ポストリスト](/images/post_list.png)

現在、記事の件数（マークダウンファイルの枚数）は１件しかありません。この状態では複数ある場合の画面を確認できないので、
`posts`ディレクトリに別のマークダウンファイルを作成してみましょう！  
`another_post.md`ファイルを作成し、中身を記述してください。
```markdown
---
title: 'ブログのタイトル②'
author: 'ブログの筆者②'
excerpt: 'ブログ記事の概要をここに記述②ブログ記事の概要をここに記述②ブログ記事の概要をここに記述②ブログ記事の概要をここに記述②'
---
ブログ記事の中身です。ブログ記事の中身です。ブログ記事の中身です。ブログ記事の中身です。ブログ記事の中身です。ブログ記事の中身です。
```
保存後画面の確認をしてください！無事２つ目の記事がリストアップされましたでしょうか^^？  
ちなみに、Footerコンポーネントが意図した部分にないですよね ^^;  
`Lyaout.js`で{children}の div に`h-20`が当たっているのが原因なのですが、レイアウトの修正自体は後でおこなっていくので、心配しないでください！  
気になってムズムズが止まらない方は、`<div className="bg-yellow-300 h-20">{children}</div>`の`h-20`を削除しておいてください！  
次に、ブログ記事詳細ページも修正をしていきましょう。`[post].js`ファイルを開き、下記のようにしてください。
```javascript
// [post].js
import Link from 'next/link'
import matter from 'gray-matter'
import ReactMarkdown from 'react-markdown'
import Layout from '../../components/Layout'

export default function BlogPost({ siteTitle, frontmatter, markdownBody }) {
  if (!frontmatter) return <></>

  return (
    <Layout pageTitle={`${siteTitle} | ${frontmatter.title}`}>
        <Link href="/">
          <a className="underline">← トップページに戻る</a>
        </Link>
        <article>
          <h1>{frontmatter.title}</h1>
          <p>By {frontmatter.author}</p>
          <div>
            <ReactMarkdown source={markdownBody} />
          </div>
        </article>
    </Layout>
  )
}

export async function getStaticProps({ ...ctx }) {
  const { post } = ctx.params

  const config = await import(`../../siteconfig.json`)
  const content = await import(`../../posts/${post}.md`)
  const data = matter(content.default)

  return {
    props: {
      siteTitle: config.title,
      frontmatter: data.data,
      markdownBody: data.content,
    },
  }
}

export async function getStaticPaths() {
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
```
大きな変更点は、レイアウトコンポーネントの反映と、トップページに戻るためのリンクの設置です。  
この時点で、URLに値を入力することなく、画面上で全ページへのルーティングが通ったかと思います。
一度存分にルーティングを体感してみてください〜

### ●デザイン修正
表示コンテンツの整理（文言等は未修正だが...）はできましたので、次に、デザインの修正に取り掛かっていきましょう！  
まずは、Header から修正します。`Header.js`を開き、以下のように修正してください。
```javascript
// Header.js
import Link from 'next/link'
export default function Header() {
  return (
    <header className="bg-black text-white sticky top-0">
      <nav className="mb-20 flex items-center h-20">
        <Link href="/">
          <a className="pl-8 md:pl-20 lg:pl-40 xl:pl-64 2xl:pl-80">My Blog</a>
        </Link>
        <Link href="/about">
          <a className="pl-20">About</a>
        </Link>
      </nav>
    </header>
  )
}
```
続いて、Footer の修正をしましょう！`Footer.js`を開き、以下のように修正してください。
```javascript
// Footer.js
import Link from 'next/link'
export default function Footer() {
  return (
    <footer className="text-white text-xs">
      <div className="bg-gray-900 flex-col text-center cursor-pointer">
        <Link href="/">
          <div className="h-20 flex justify-center items-center">
            Top Page
          </div>
        </Link>
        <Link href="/about">
          <div className="h-20 flex justify-center items-center border-t border-gray-500">
            About Page
          </div>
        </Link>
      </div>
      <div className="bg-black h-10 flex justify-center items-center">
        &copy;Daisuke All Rights Reserved.
      </div>
    </footer>
  )
}
```
続いて`Layout.js`の修正を行います！以下のように変更してください。
```javascript
// Layout.js
import Head from 'next/head'
import Header from '../components/Header'
import Footer from '../components/Footer'

export default function Layout({ children, pageTitle }) {
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>{pageTitle}</title>
      </Head>
      <section>
        <Header />
        <div className="m-8 md:mx-14 lg:mx-40 xl:mx-64 2xl:mx-80 mb-20">
          {children}
        </div>
      </section>
      <Footer />
    </>
  )
}
```
非常にシンプルなデザインとなっておりますが、Header と Footer、Layout の修正が終わり、
デザイン面は整ってきたのではないでしょうか ^^/  
![デザイン後](/images/after_design.png)
最後に、記事詳細のデザインを少しだけ整えましょう！
`[post].js`の BlogPostファンクションを以下のように修正してください。
```javascript
// [post].js の BlogPost ファンクションを修正
export default function BlogPost({ siteTitle, frontmatter, markdownBody }) {
  if (!frontmatter) return <></>

  return (
    <Layout pageTitle={`${siteTitle} | ${frontmatter.title}`}>
      <Link href="/">
        <a className="underline">← トップページに戻る</a>
      </Link>
      <article className="mt-10">
        <h1 className="text-2xl mb-4">{frontmatter.title}</h1>
        <p className="mb-6">By {frontmatter.author}</p>
        <div>
          <ReactMarkdown source={markdownBody} />
        </div>
      </article>
    </Layout>
  )
}
```
![ポストページ](/images/post_page.png)
お気づきかと思いますが、マークダウンで書かれた部分... デザインが無いですよね^^;  
ただ、少し長くなってきたということもありますので今回はここまでとします！

###### ＜次回予告＞
次回は、マークダウン部分のデザインを反映させていきましょう！
また、コードブロックはコードが読みやすいようにシンタックスハイライトが入るようにしたいと思います！  
ここまでできたら、Netlify にデプロイしましょう！
可能であれば、無料ですので、Netlify のアカウントを作成しておいて頂けますと次回以降の作業がスムーズに進みます〜  
それでは乞うご期待 ^^/

[続きを読む→](/post/next-tailwind07)