---
title: 'Next.js+TailwindCSS製Blog構築③'
author: 'Daisuke'
date: '2021年3月2日'
excerpt: 'では、早速コーディングをしていきましょう！と、その前に今回使うことのない、不要なファイル達を削除しておきたいと思います。
削除後に残るディレクトリやファイルは以下のようになりますので、それ以外のファイルは削除し...'
---

※本記事は、JSONファイルのローディングとgetStaticProps()によるpropsの取得と引き渡し部分の解説、Layoutコンポーネントの作成と確認といった内容となっております。  
初期の設定からご覧になられたい方は[こちら](/post/next-tailwind02)にお戻りください。
コンポーネントの分割と動的ルーティングの部分からご覧になられたい方は[次の記事](/post/next-tailwind04)に移動してください！

# ｜Component分割とレイアウトの作成
コンポーネントの分割の思想については、様々な考え方がございますので、この記事内では深く言及することは避けます。
かなりフランクに捉えて頂いて、分割するにはどうすればいいかという部分のみ掴んでいただければ幸いです。

では、早速コーディングをしていきましょう！と、その前に今回使うことのない、不要なファイル達を削除しておきたいと思います。
削除後に残るディレクトリやファイルは以下のようになりますので、それ以外のファイルは削除してしまいましょう！  
一応具体的に削除するファイルやディレクトリを挙げておくと、`public/vercel.svg`、`styles/Home.module.css`と`api`ディレクトリは中の`hello.js`ごと削除してしまってください。
```
.next/
node_modules/
pages/
  _app.js
  about.js
  index.js
public/
  favicon.ico
styles/
  global.css
.gitignore
package-lock.json
package.json
postcss.config.js
README.md
tailwind.config.js
yarn.lock
```
それでは、ここからファイルやディレクトリを作成していきます！

### ●簡易ファイルローディングの体験
コンポーネント分割の前に、JSONファイルを読み込んで画面にデータを表示するということをしてみましょう。  
tailwind.config.js と同じ階層に`siteconfig.json`ファイルを作成し、以下のような記述をします。
```
// siteconfig.json
{
  "title": "ブログのタイトルを記述",
  "description": "ブログの概要をここに記述"
}
```
記述を終えたら次に`index.js`ファイルを編集していきます。  
先ほど作成した siteconfig.json のデータをインポートしていきます。以下のように中身を書き換えてしまってください。
```
// pages/index.js
const Index = ({ title, description }) => {
  return (
    <div className="text-center mt-10">
      site_title: {title} <br />
      description: {description}
    </div>
  )
}
export default Index

export async function getStaticProps() {
  const configData = await import(`../siteconfig.json`)

  return {
    props: {
      title: configData.default.title,
      description: configData.default.description,
    },
  }
}
```

![コンフィグの内容を表示](/images/siteconfig.png)

上の画像ような形でJSONファイル内に書かれた内容を表示することができたでしょうか？  
今回記述した内容の中で`getStaticProps()`について`簡単に`解説しておきます。  
getStaticProps()はNext.jsが用意しているファンクションで、そのファンクション内で返却したデータをビルド時にページコンポーネントに引き渡す役割を担ってくれています。今回のソースコード内でのことをザックリと捉えると、props というものの中に`title`と`description`という変数で siteconfig.json のデータを取得・格納し、Indexページのコンポーネント内に引き渡すということを行なっています。それを経て画面に表示されているということなんですね^^  
`getStaticProps()`について、詳しくは[Next公式データフェッチ](https://nextjs.org/docs/basic-features/data-fetching)の部分をご参照いただければと思います。

### ●レイアウトの作成
それでは、今度こそレイアウトのコンポーネントを作成していきましょう！  
まず、`components`フォルダをpagesと同階層に作成してください。その中に、`Header.js`、`Footer.js`、`Layout.js`、`PostList.js`の４ファイルを空の状態でいいので作成してください。  
そのあと、`Layout.js`を以下のように編集していってください。
```
// components/Layout.js
import Head from 'next/head'
import Link from 'next/link'

export default function Layout({ children, pageTitle, ...props }) {
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>{pageTitle}</title>
      </Head>
      <section className="text-center mt-10">
        <header className="bg-blue-300 h-10">
          <nav>
            <Link href="/">
              <a className="pr-10">My Blog</a>
            </Link>
            <Link href="/about">
              <a>About</a>
            </Link>
          </nav>
        </header>
        <div className="bg-yellow-300 h-10">{children}</div>
      </section>
      <footer className="bg-green-300 text-center h-10">Footerのテキスト</footer>
    </>
  )
}
```
- __<Head>コンポーネント__

まず、`next/head`から読み込んでいる`<Head>`コンポーネント内ですが、`<meta>`情報や`<title>`などを書き込むことができます。
あらかじめサイト全体で読み込ませておきたい情報は、ここに置いておきましょう！

- __<Link>コンポーネント__

続いて、`next/link`から読み込んでいる`<Link>`コンポーネント内ですが、シンプルに捉えると、飛ばしたい先のリンクを作成することができます。

- __{children}パーツ__

最後に`{children}`の部分ですが、各ページでのコンテンツを表示する場所です。
詳しくは後ほど書く`index.js`で確認していただければと思いますが、各pagesのファイルの中でLayoutコンポーネントで挟んであげれば、
`{children}`の部分にコンテンツを表示することができます。  
では、`pages/index.js`で先ほどの`Layout`コンポーネントを読み込み、コンテンツを表示させてみましょう！以下のように変更してください。

```
// pages/index.js
import Layout from '../components/Layout'

const Index = () => {
  return (
    <>
      <Layout pageTitle={title}>
        <div>ここがLayoutコンポーネントのChildren部分です</div>
        <div>{description}</div>
      </Layout>
    </>
  )
}
export default Index

export async function getStaticProps() {
  const configData = await import(`../siteconfig.json`)
  return {
    props: {
      title: configData.default.title,
      description: configData.default.description,
    },
  }
}
```
編集を保存したあと、`http://localhost:3000`にアクセスすると以下のような画面が表示されていれば成功です！
![レイアウトコンポーネントの表示](/images/layout.png)

少し長くなってしまったので、コンポーネントの分割については次回書くことにします ^^/

###### ＜次回予告＞
次回は、今回のやり残しであるコンポーネント分割の方法とダイナミックルーティングについて解説していこうと思います！  
それでは乞うご期待 ^^/

[続きを読む→](/post/next-tailwind04)