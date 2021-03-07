---
title: 'Next.js+TailwindCSS製Blog構築⑦'
author: 'Daisuke'
date: '2021年3月7日'
excerpt: 'それでは、記事の部分へのCSSを反映させていきましょう！
まずは[post].jsファイルの修正からやっていきます。
以下のように<ReactMarkdown>を囲っている div タグにmarkdownクラスを付与してください...'
---

※本記事は、マークダウンで書かれた記事の部分のデザインの反映および
コードブロックにシンタックスハイライトを導入する内容となっております。  
本記事を既に読まれたという方は[次の記事]()に移動してください！(次の記事は現在作成中ですm(. . ;)m )

# ｜記事へのCSS反映
それでは、記事の部分へのCSSを反映させていきましょう！  
まずは`[post].js`ファイルの修正からやっていきます。
以下のように`<ReactMarkdown>`を囲っている div タグに`markdown`クラスを付与してください。
```javascript
// [post].js の BlogPostファンクション return 内
<div className="markdown">
  <ReactMarkdown source={markdownBody} />
</div>
```
続いて、`globals.css`ファイルを以下のように修正してください。
```css
/* globals.css */
@tailwind base;
@tailwind components;
@tailwind utilities;

/* Markdown Styles */
/* Global */
.markdown {
    @apply leading-relaxed text-sm;
}
@screen sm {
  .markdown {
    @apply text-base;
  }
}
@screen lg {
  .markdown {
    @apply text-lg;
  }
}

/* Headers */
.markdown h1,
.markdown h2 {
  @apply text-xl my-6;
}
.markdown h3,
.markdown h4,
.markdown h5,
.markdown h6 {
  @apply text-lg my-3 ;
}
@screen sm {
  .markdown h1,
  .markdown h2 {
    @apply text-2xl;
  }
  .markdown h3,
  .markdown h4,
  .markdown h5,
  .markdown h6 {
    @apply text-xl;
  }
}

/* Links */
.markdown a {
  @apply text-blue-600;
}
.markdown a:hover {
  @apply underline;
}

/* Paragraph */
.markdown p {
  @apply mb-4 leading-8 md:leading-10 text-justify;
}

/* Lists */
.markdown ul,
.markdown ol {
  @apply mb-4 ml-8;
}
.markdown li > p,
.markdown li > ul,
.markdown li > ol {
  @apply mb-0;
}
.markdown ol {
  @apply list-decimal;
}
.markdown ul {
  @apply list-disc;
}

/* Blockquotes */
.markdown blockquote {
  @apply p-2 mx-2 my-2 bg-gray-100 mb-4 border-l-4 border-gray-400  rounded-r-lg;
}
.markdown blockquote > p {
  @apply mb-0;
}

/* Images */
.markdown img {
  @apply shadow-lg;
}

/* Code */
.markdown :not(pre) > code {
  @apply bg-indigo-50 p-1 font-semibold text-gray-600 rounded-lg ;
}

/* Pre */
.markdown pre {
  @apply mx-2;
}
```
全てのマークダウン記法に対応できている訳では無く、最低限これくらいあればいいかな〜という範囲を記述しています！  
もし、ご自身で不足しているものがある場合は、適宜追加してください。（コードブロックのシンタックスハイライトはこの後対応します。）  
では、一度画面を確認してみましょう！色々なパターンのマークダウン記法で書いて確認してみてください！
![マークダウンデザイン反映後](/images/markdown_design.png)
反映されてそうですね ^^b

では、最後にコードブロックのシンタックスハイライトを対応していきましょう！
今回は、`react-syntax-highlighter`というライブラリを使いたいと思います。

 - [react-syntax-highlighter](https://www.npmjs.com/package/react-syntax-highlighter) - npm -

まずは、ライブラリのインストールからしていきましょう！  
ターミナルでアプリのトップの階層に移動して以下のコマンドを入力してください。
```
npm install react-syntax-highlighter --save
```
インストールが成功したら、次にコードブロック用のコンポーネントを作っていきます！  
components ディレクトリに`CodeBlock.js`ファイルを作成し、以下のように記述してください。
```javascript
// CodeBlock.js
import React from "react"
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter"
import { base16AteliersulphurpoolLight } from "react-syntax-highlighter/dist/cjs/styles/prism"

const CodeBlock = ({ language, value }) => {
  return (
    <SyntaxHighlighter language={language} style={base16AteliersulphurpoolLight}>
      {value}
    </SyntaxHighlighter>
  )
}
export default CodeBlock
```
このコンポーネントを`<ReactMarkdown>`内で読み込んであげると、コードブロックにシンタックスハイライトが反映されます。  
ということで、`[post].js`を以下のように修正してください！
```javascript
import Link from 'next/link'
import matter from 'gray-matter'
import ReactMarkdown from 'react-markdown'
import Layout from '../../components/Layout'
import CodeBlock from "../../components/CodeBlock" //←追記

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
          <div className="markdown">
            <ReactMarkdown
              source={markdownBody}
              renderers={{ code: CodeBlock }} //←追記
            />
          </div>
        </article>
    </Layout>
  )
}
// 以下 getStaticProps(), getStaticPaths() が続きます
```
この状態で、マークダウンファイルにコードブロックを記述してみてください！
PHPや JavaScript といった言語を指定したい場合は、` ```javascript ` という感じでコードブロックの開始
バッククオートの横に書いてあげると読み込むことができます。反映されているか画面を確認してみましょう！

![コードブロック](/images/code_block.png)

無事反映していることが確認できました〜 ^^v  
ということで、以上で完成です！！  
細かな部分のデザインの修正やアレンジの続きは読者の皆様に委ねます！

最後までお付き合いありがとうございました！お疲れ様でした m(. . )m  
なんですが...

###### ＜次回予告＞
システム自体は完成したのですが、デプロイ部分が残っていますね ^^;  
ということで、次回は Netlify にデプロイしてみようと思います！
おそらく次回で最終回となりますね〜  
それでは乞うご期待 ^^/