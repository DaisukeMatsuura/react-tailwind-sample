---
title: 'Next.js+TailwindCSS製Blog構築②'
author: 'Daisuke'
date: '2021年3月1日'
excerpt: 'それでは、早速 Next.js のインストールから行なっていきたいと思います。とその前に、Next.js アプリを作成するためには Node.js をインストールしておく必要があります。公式ドキュメントによりますと、Node.js 10.13 以上の...'
---

※本記事はNext.jsの開発環境の構築および、TailwindCSSのセットアップとNext.jsのルーティングの確認をする内容となっております。CSSを自作でされる方や基本的なセットアップがお済みの方は[次の記事](/post/next-tailwind03)に移動してください！

# ｜環境構築
それでは、早速`Next.js`のインストールから行なっていきたいと思います。  
とその前に、Next.js アプリを作成するためには `Node.js`をインストールしておく必要があります。[公式ドキュメント](https://nextjs.org/docs)によりますと、Node.js 10.13 以上のバージョンがインストールされていることが条件となります。この記事を進められる前に、Node.js のインストール作業をお願い致します。

### アプリ作成
では、早速アプリの作成をしていきましょう！  
ターミナルを開いて、アプリを作成したいディレクトリに移動してください。移動先で以下のコマンドを入力してください。
```
 npx create-next-app [project-name]
```
`[project-name]`の部分はご自身でお好きな名前を付けてください！[]は不要です。  
以下のような文言が出ていれば完了です！
```
Success! Created sample at /保存先/[project-name]
Inside that directory, you can run several commands:

  yarn dev
    Starts the development server.

  yarn build
    Builds the app for production.

  yarn start
    Runs the built app in production mode.

We suggest that you begin by typing:

  cd [project-name]
  yarn dev
```
一度`Next.js`のTOP画面を拝んでおきましょう！
```
 cd [project-name]  // アプリのディレクトリに移動して
 npm run dev        // または yarn dev でもいいです
```
すると、コンパイルが始まって、しばらく経つと`compiled successfully`という文字が表示されると思いますので、ブラウザから `http://localhost:3000` にアクセスすると以下のようなTOPページが確認できるかと思います！
![トップ画像](/images/top_page.png)

やりましたね！ ^^v  
次に`TailwindCSS`のセットアップに移りましょう！  
ターミナルにて以下のコマンドを入力
```
npm install -D tailwindcss@latest postcss@latest autoprefixer@latest
```
次にコンフィグファイルを作成していきます。  
以下のコマンドを入力すると`tailwind.config.js`と`postcss.config.js`が自動的に生成されます。
```
npx tailwindcss init -p
```
生成された`tailwind.config.js`ファイルを編集していきましょう。生成時は`purge`の値が空っぽになっているかと思いますので、以下のように追記します。
```
// tailwind.config.js
module.exports = {
  purge: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
```
続いて`CSS`ファイルにTailwindCSSの設定を読み込むように変更します。  
`/styles`ディレクトリ内にある`globals.css`を開き、中身を全て消去し、以下の３行に書き換えてください。
```
/* ./styles/globals.css */
@tailwind base;
@tailwind components;
@tailwind utilities;
```
以上で TailwindCSS の設定は完了です！ ちなみに、このCSSファイルは`pages/_app.js`の中でインポートしています。
もし、他のCSSファイルを作成した時は、適宜読み込みを行なってください！  
ということで、一応確認のためと Next.js の動きの確認のために`Hello World!!`を表示させてみましょう！  
`pages/index.js`ファイルを開いてください。以下のようになっているかと思います。
```
import Head from 'next/head'
import styles from '../styles/Home.module.css'

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        ...
        中略
        ...
      </footer>
    </div>
  )
}
```
このファイルのインポート部分の削除と`Home()`ファンクションの return の中の`<Head>`タグから`</footer>`を全て消去し、以下のように書き換えてください。
```
export default function Home() {
  return (
    <div className="text-red-400">
      Hello World!
    </div>
  )
}
```
変更後、ターミナルで`npm run dev`を実行してください。※コマンドを実行する場所はアプリのあるディレクトリ内でです。  
実行後に`http://localhost:3000`にアクセスすると...
![HelloWorld](/images/hello_world.png)

`赤字`で Hello World!! が表示されましたね ^^v  
React で class を付与させるには class="hoge" と書くのではなく、`className="hoge"`と書く必要があります。  
今回の divタグ内の`text-red-400`は TailwindCSS のクラスで、文字色を赤の400にするというものです。色見本については [TailwindCSS公式ドキュメント](https://tailwindcss.com/docs/customizing-colors) で確認してみてください！また、他のどのようなクラスがあるのかも見てみてください〜

少し長くなってきましたが...  
続いて、簡単にルーティングについても確認しておきたいと思います。  
`npm run dev` は止めずに、そのままで進めていきましょう！止めた方は、再度実行しておいてください！  
それでは、まず`pages`ディレクトリ内に`about.js`ファイルを作成してください。そして、以下のように書き加えてください。
```
// pages/about.js
const About = () => {
  return (
    <div className="text-center mt-10">
      about
    </div>
  )
}
export default About
```
変更を保存後、`http://localhost:3000/about`にアクセスすると about という文字列が表示されているかと思います。  
Next.js は /pages ディレクトリに js のエクスポートファイルを設置すると、ビルド時にファイル名をURLとしてルーティングに組み込んでくれます^^（便利！）  
ちなみに、about.js では index.js とは違うアロー関数の形で記述しエクスポートする様な書き方をしています。以後はこの様な書き方で進めようと思います！  
今回は以上です！^^

###### ＜次回予告＞
次回は不要ファイルを削除し、ディレクトリの構成を整えます。コンポーネント分割についても考えようと思います。  
それから サイト情報を乗せた json ファイルのインポートおよびその情報の表示、Next.js のダイナミックルーティングについての構築あたりをやっていこうと思います！  
それでは乞うご期待 ^^/

[続きを読む→](/post/next-tailwind03)