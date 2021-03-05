# React TailwindCSS Sample

## 概要
`Next.js`を用いてブログシステムの構築を行った。  
記事はマークダウンファイルで作成し、`row-loader` で読み込みを行うようにした。  
また、記事一覧については `gray-matter` を活用し、マークダウンファイルの FrontMatter部分の読み取りを行い配置するように工夫した。   
ブログ全体のデザインについては `TailwindCSS` を用いて構成した。  
上記 Next.js+TailwindCSS製のブログ構築の方法については下記デモページにて解説していこうと思う ^^b

## デモページ
[Next-Tailwind製BLOG](https://brightful.ga/)

●第１回●  
ブログシステムの概要と使用ライブラリの説明  
[記事に進む→](https://brightful.ga/post/next-tailwind01)

●第２回●  
Next.js および TailwindCSS のインストール  
[記事に進む→](https://brightful.ga/post/next-tailwind02)

●第３回●  
レイアウトの作成とgetStaticProps()の説明  
[記事に進む→](https://brightful.ga/post/next-tailwind03)

●第４回●  
コンポーネント分割と動的ルートの説明  
[記事に進む→](https://brightful.ga/post/next-tailwind04)

●第５回●  
マークダウンファイルの読み込みライブラリのインストールと読み込みテスト  
[記事に進む→](https://brightful.ga/post/next-tailwind05)


## 技術要件
```
・React v17.0.1
・Next.js v10.0.7
・TailwindCSS v2.0.3
・gray-matter v4.0.2
・raw-loader v4.0.2
・react-markdown v5.0.3
・react-syntax-highlighter v15.4.3
```

