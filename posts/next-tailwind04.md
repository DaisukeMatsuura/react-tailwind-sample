---
title: 'Next.js+TailwindCSS製Blog構築④'
author: 'Daisuke'
date: '2021年3月3日'
excerpt: 'コンポーネントの分割に関しては、様々な思想がございますので、この記事内では深くは触れません。
分割ってこうやってやるんだな〜ぐらいの捉え方をして頂けるとありがたいです。それでは、前回作成したLayoutコンポーネン...'
---

※本記事は、component分割によるレイアウトの作成および動的ルーティングの確認をする内容となっております。  
初期の設定からご覧になられたい方は[こちら](/post/next-tailwind02)にお戻りください。
MDファイルのローディング部分からご覧になられたい方は[次の記事](/post/next-tailwind05)に移動してください！

# ｜Component分割
[前回](/post/next-tailwind03)でも少し触れたのですが、コンポーネントの分割に関しては、様々な思想がございますので、この記事内では深くは触れません。
分割ってこうやってやるんだな〜ぐらいの捉え方をして頂けるとありがたいです。  
それでは、前回作成した`Layout`コンポーネントの分割を行なっていきましょう！前回の時点での components ディレクトリの中は以下のような状態かと思います。
```
components/
  - Footer.js // 空ファイル
  - Header.js // 空ファイル
  - Layout.js
  - PostList.js // 空ファイル
```
また、`Layout.js`ファイル内の Layoutファンクションが返却している部分は以下のようになっているかと思います。
```javascript
// components/Layout.js の Layoutファンクション return()内
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
    <div className="bg-yellow-300 h-20">{children}</div>
  </section>
  <footer className="bg-green-300 text-center h-10">Footerのテキスト</footer>
```
この部分を`Header.js`と`Footer.js`に分割していきたいと思います。  
まずは Header から分けていきましょう！先ほどのコードの`<header>`タグの始まりから終わりまでを切り取りし、Header.jsファイルを以下のように書き加えます。
```javascript
// components/Header.js
import Link from 'next/link'
export default function Header() {
  return (
    <header className="bg-blue-300  h-10">
      <nav>
        <Link href="/">
          <a className="pr-10">My Blog</a>
        </Link>
        <Link href="/about">
          <a>About</a>
        </Link>
      </nav>
    </header>
  )
}
```
その次に`Layout.js`ファイル内で、今ほど作った Header コンポーネントを読み込んでいきましょう！
```javascript
// components/Layout.js
import Head from 'next/head'
import Header from '../components/Header' // ←追記

export default function Layout({ children, pageTitle }) {
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>{pageTitle}</title>
      </Head>
      <section className="text-center">
        <Header />  {/* ←変更箇所 */}
        <div className="bg-yellow-300 h-20">{children}</div>
      </section>
      <footer className="bg-green-300 text-center h-10">Footerのテキスト</footer>
    </>
  )
}
```
一度画面を確認してみてください！前回と同様に以下のような画面が表示されましたか？
![レイアウト](/images/layout.png)

確認ができましたら、Footerも同様に分割してみてください！やり方は同じなので、一度ご自身でチャレンジしてみてくださいね ^^b

では、私の方もやっていきます！  
`Footer.js`ファイルを以下のように書き加えます。
```javascript
// components/Footer.js
export default function Footer() {
  return (
    <footer className="bg-green-300 text-center h-10">
      Footerのテキスト
    </footer>
  )
}
```
Header の時と同様に `Layout.js` で読み込みます。
```javascript
// components/Layout.js
import Head from 'next/head'
import Header from '../components/Header'
import Footer from '../components/Footer' // ←追記

export default function Layout({ children, pageTitle }) {
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>{pageTitle}</title>
      </Head>
      <section className="text-center">
        <Header />
        <div className="bg-yellow-300 h-20">{children}</div>
      </section>
      <Footer />  {/* ←変更箇所 */}
    </>
  )
}
```
再度画面を確認し、同じ状態を保てていれば成功です！  
以上のような感じでコンポーネントの分割を行なっていくことができます！
なぜ分割を行うの？という疑問が浮かんだ方もいらっしゃると思いますので、この作ったものを他のページで再利用する中で少しでも良さを実感してみようと思います！  
ということで、"about" としか表示のされないアバウトページにレイアウトを反映させてみましょう！`about.js`を以下のように編集してみてください！
```javascript
import Layout from '../components/Layout'

const About = () => {
  return (
    <Layout pageTitle="ここはアバウトページだよ">
      <div>Aboutページのコンテンツをここに書いていく！</div>
    </Layout>
  )
}
export default About
```
これだけの変更で以下の画像のようにレイアウトの反映ができました！  
![アバウトページ](/images/about.png)

ん？何か違和感が...

![タイトル](/images/title.png)

そうなんです！タイトルが変わっているんです！  
実はレイアウトコンポーネントで挟む時に`<Layout pageTitle="ここはアバウトページだよ">`という感じで
レイアウトコンポーネントに`pageTitle`を引き渡しています。レイアウトコンポーネント側にはこのpageTitleの受付口を
用意していましたので、「はいはい〜タイトルの変更ね！」という感じで書き換えてくれているわけですね！

このように、コンポーネントを分割し、共通パーツとして作成しておくと、複数ページ、
複数箇所での使い回しができるので便利だし、コーディングの量が減るので良いよね！という感じです ^^v  

### ●動的ルート
それでは本題に入っていきましょう！動的ルーティングについてです。  
前回までの状態で作られているルーティングは`/`と`/about`の２ページ分です。
必要に応じて`pages`ディレクトリにページを追加していけば良いのはご理解いただけたかと思います。
ただ、ブログ記事などのように、画面のデザインはほぼ変わらず、コンテンツの部分のみ変わっていくようなページに関しては、
記事作成ごとに、js ファイルを生成するのはどうも無駄な作業な気がします...  
そこで、`Dynamic Routes`(動的ルート)の出番です。`/post/3`や`/post/156`、`/post/nextjs`のような
記事のIDや記事のタイトルといった固有の情報を含んだURLにアクセスされた場合に、記事のデータを取得し表示できるようにしてあげると
毎回毎回記事を書くたびにjsファイルを生成しなくても済むようになりますね！^^v  
ということで、簡易的に動的ルートを体験してみましょう！  
`pages`ディレクトリ内に`post`ディレクトリを作成し、その中に`[post].js`ファイルを作成してください。
```
pages/
  post/         // ←作成
   - [post].js  // ←作成
 - _app.js
 - about.js
 - index.js
```
その次に、`[post].js`の中身を以下のようにしてください。
```javascript
// [post].js
import { useRouter } from 'next/router'
const Post = () => {
  const router = useRouter()
  const { post } = router.query
  return (
    <p className="m-10">
      Post: {post}
    </p>
  )
}
export default Post
```
ファイルを保存し`http://localhost:3000/post/1`や`http://localhost:3000/post/nextjs`にアクセスしてみてください。
Post: 1 や Post: nextjs という文字が画面に表示されたかと思います。  
簡単に解説しておきますと、基本的に Next.js では pages ディレクトリ以下のファイル名(.jsより前の部分)がルーティングを構成する要素となりますので、
今回作成した [post].js で考えると、`[post]`の部分がルーティングを構成する要素となります。
Next.js では、このあたりを動的にキャッチし、クエリオブジェクトとして持つことができます。
また、複数の動的な値をキャッチしたい場合は post ディレクトリの中に`[hoge]`ディレクトリを作成し、その中に`[huga].js`を作成すると、
`http://localhost:3000/post/today/comment`というリクエストに対して today や comment と行った値をキャッチすることができます。
その他いくつかのパターンが存在しますので、詳しくは[Next公式動的ルート](https://nextjs.org/docs/routing/dynamic-routes)をご確認ください。

この動的ルートを活用し、ルートとマッチするマークダウンファイルをローディングし、記事として画面に表示するというのが今回のブログ構築の狙いです！  
それでは、今回は以上です ^^v

###### ＜次回予告＞
次回は、マークダウンファイルを読み込むためのローダーのセットアップと読み込みの確認を行いたいと思います。  
少しづつ難しい内容になってくるかと思いますが、語弊を恐れずに平易に書いていきたいと思います！  
それでは乞うご期待 ^^/

[続きを読む→](/post/next-tailwind05)