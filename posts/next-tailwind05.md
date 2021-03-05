---
title: 'Next.js+TailwindCSS製Blog構築⑤'
author: 'Daisuke'
date: '2021年3月4日'
excerpt: 'まずは、３つのライブラリをインストールしていきます。
ターミナルを開き、アプリのディレクトリに移動し、以下のコマンドを入力してください。
npm install react-markdown gray-matter raw-loader ...'
---

※本記事は、マークダウンをローディングするためのライブラリのセットアップと読み込みの確認、記述したプログラムの説明をおこなっています。  
ライブラリについての概要については[こちら](/post/next-tailwind01)にお戻りください。  
本記事を既に読まれたという方は[次の記事](/post/next-tailwind05)に移動してください！

# ｜ローダーのセットアップ
まずは、３つのライブラリをインストールしていきます。  
ターミナルを開き、アプリのディレクトリに移動し、以下のコマンドを入力してください。
```
npm install react-markdown gray-matter raw-loader
```
続いて、row-loader でマークダウンファイルを読み込むための Next.js の設定ファイルを作成していきます。
package.json がある階層と同じ場所に`next.config.js`ファイルを作成してください。
`next.config.js`ですよ！nextconfig.js ではないですからね... このドット(.)が無いだけで私は２時間も時間を溶かしてしまいました(T.T)  
ファイル作成ができたら、以下のように記述してください。
```
// next.config.js
module.exports = {
  target: 'serverless',
  webpack: function (config) {
    config.module.rules.push({
      test: /\.md$/,
      use: 'raw-loader',
    })
    return config
  },
}
```
次に、読み込み用のマークダウンファイルを作成していきます。  
public などと同じトップの階層に`posts`ディレクトリを作成し、その中に`mypost.md`ファイルを作成し、以下のように記述してください。
改行用に各行の末尾に半角スペース２個含まれたりしていますのでコピペしてしまってください。
```
---
title: 'ブログのタイトル'
author: 'ブログの筆者'
---
↓ここからマークダウンのボディ↓  
色んなマークダウンの書き方を試してみて、  
`どのように表示されるか`確認してみましょう！
- リスト１
- リスト２
- リスト３
```
最後にこのマークダウンファイルを読み取る部分の作成をしていきましょう！  
`[post].js`を編集しましょう！少し長いですが以下のように書き換えてください。
```
// [post].js
import matter from 'gray-matter'
import ReactMarkdown from 'react-markdown'

export default function BlogPost({ frontmatter, markdownBody }) {
  if (!frontmatter) return <></>

  return (
    <article>
      <h1>{frontmatter.title}</h1>
      <p>By {frontmatter.author}</p>
      <div>
        <ReactMarkdown source={markdownBody} />
      </div>
    </article>
  )
}

export async function getStaticProps({ ...ctx }) {
  const { post } = ctx.params

  const content = await import(`../../posts/${post}.md`)
  const data = matter(content.default)

  return {
    props: {
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
各種ファイルを作成したあと、開発サーバーを立ち上げている場合は再起動してください。
立ち上げていない場合はターミナルにて`npm run dev`をしてください。  
`http://localhost:3000/post/mypost`にアクセスしてみると以下のような画面がみれましたでしょうか？

![マイポスト](/images/mypost.png)

いくつかに分けて解説をしていきます！  
### ● getStaticProps()
まずは、BlogPostファンクションの下にある`getStaticProps()`からですが、
[以前](/post/next-tailwind03)にもこのファンクションの説明はしてありますが、
もう一度コンパクトにお伝えすると`データをビルド時にページコンポーネントに引き渡すファンクション`です。
今回のものでいうとマークダウンファイルのデータを取得・解析し、[post].js のページに引き渡す役割を担っているという感じでしょうか。  
今回返却しているデータは`frontmatter`と`markdownBody`の２つです。 
frontmatter には何が入っているのかというと、mypost.md ファイルの冒頭で記述した
```
---
title: 'ブログのタイトル'
author: 'ブログの筆者'
---
```
の部分（FrontMatter）を`gray-matter`というライブラリを用いて解析し、以下のようなJSONデータとして返却しています。
```
{title: 'ブログのタイトル', author: 'ブログの筆者'}
```
また、markdownBody の中には、マークダウンファイルで記述した FromtMatter より下のテキストが
`content`というキーでJSONデータの中にそのまま格納されています。
これについては後述しますが、変換作業が必要です。

### ● ReactMarkdown
BlogPost ファンクションの中に`<ReactMarkdown source={markdownBody} />`という記述があるかと思います。
こちらは`react-markdown`というライブラリを使って、マークダウンで記述されているテキストをHTMLに変換している部分です。
`source={markdownBody}`という形で引き渡してあげても構いませんし、
`<ReactMarkdown># Hello, *world*!</ReactMarkdown>`という形で挟んであげても大丈夫です！  
次回以降の記事でスタイルを整えていきますが、マークダウンで書かれたテキストが、
どのようなHTMLに変換されているかについては色々と試して確認してみてくださいね @@/

### ● getStaticPaths()
最後に getStaticPaths() について説明して、この記事を終えたいと思います。  
`getStaticPaths()`とは、getStaticProps() と同様に Next.js が用意しているファンクションです。
どのようなことができるのかというのをザックリ言ってしまうと、
「ビルド時に特定のデータに基づいて動的ルートを静的に生成する」という感じかなと思います。@@;  
ブログでいうと記事が複数ある場合、その記事の全てのルートは確保しておきたいですよね。
その記事のルートを確保するために、今回でいうと、マークダウンファイルの名称をルートとして作成しよう！としているわけです。  
つまるところ、pages ディレクトリに `post01.md`ファイルと`post02.md`ファイルが格納されている場合、
`/post/post01`と`post/post02`のアクセスに関しては記事の表示をするが、
それ以外は404ページ（return 内の fallback: false が該当箇所です！）を表示するというコントロールをおこなっているという感じです！

いつものごとく、詳しくは[Next公式getStaticPaths](https://nextjs.org/docs/basic-features/data-fetching#getstaticpaths-static-generation)
をご確認ください。

機能面はこれで概ね完成ですね！超絶に簡易ですが、ブログシステムができました〜 ^^v

ということで、今回はこれで以上です！^^b

###### ＜次回予告＞
次回は、ブログ全体の表示項目の修正とデザインの修正をやっていこうと思います。  
それでは乞うご期待 ^^/

[続きを読む→](/post/next-tailwind06)