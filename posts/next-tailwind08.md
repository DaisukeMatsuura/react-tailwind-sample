---
title: 'Next.js+TailwindCSS製Blog構築⑧'
author: 'Daisuke'
date: '2021年3月8日'
excerpt: 'とうとうこのシリーズも最終回となりました。  
せっかくMyブログを作ったのだから、公開するまでしないと！ですよね ^^  
公開する場所はNetlifyというホスティングサービスを利用したいと思います！
一緒にデプロイしようという方は、Netlifyのアカウントの作成をして...'
---

# ｜Netlify へのデプロイ
とうとうこのシリーズも最終回となりました。  
せっかくMyブログを作ったのだから、公開するまでしないと！ですよね ^^  
公開する場所は`Netlify`というホスティングサービスを利用したいと思います！
一緒にデプロイしようという方は、Netlifyのアカウントの作成をしておいてください。
アカウント自体は後ほどGitHub等のソース管理サービスのアカウントと連携をしますので、そちらで登録をしてください。

- [Netlify](https://www.netlify.com/) - 簡単なことであれば無料で利用することが可能です！

アカウントの登録ができたら、デプロイの準備をしましょう！  
まず、`next.config.js`と同階層に`netlify.toml`というファイルを作成し、以下のように記述してください。
```
[build]
  command = "npm run build && npm run export"
  publish = "out"
```
先ほど記述したコマンドを`package.json`ファイルに追記します！以下のように修正してください。
```json
// package.json の scripts部分
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",   //←カンマ忘れずに
    "export": "next export"  //←追記
  },
```
ここまでできたら、ソースコードをGitHubにプッシュしましょう！  
作成した GitHub のリポジトリと紐付けて、マークダウン記事のPUSH時に自動でビルドが走るようにします！  
プッシュができましたら、Netlifyの管理画面に進み`New site from Git`というボタンを押してください。

![ネトリファイ登録画面](/images/create_new.png)

`GitHub`を選択し、先ほどソースコードをプッシュしたリポジトリを選択します。
そうすると、最終的にビルド時の設定ができる画面に移動しますので、
Build command の部分を`npm run build && npm run export`に変更、
Publish directory の部分を`out`に変更して`Deploy site`ボタンを押してください！

![デプロイ設定](/images/netlify_setting.png)

すると次の画面に遷移し、ビルドが走ります！

![ビルド](/images/build.png)

ビルド時のログも見ることができます！ログを確認し、最終的に以下のように書かれていれば完了です！

![ビルドログ](/images/finish.png)

ページのトップに戻って Preview Deploy でデプロイできているか確認しましょう！

![デプロイの確認](/images/preview.png)

ブログのトップページが確認できましたら完了となります ^^v  
お疲れ様でした！

### まとめ
Next.js & TailwindCSS を使ってのブログ構築の解説は以上となります！  
いかがでしたでしょうか^^ ？  
細かく解説したい部分もいくつかあったのですが、
あまり冗長になってしまうと、かえってわかりにくくなることも懸念されましたので、
飛ばすところはサラっと飛ばしてあります。
記述内容に間違いがあったり、分かりにくいところなどございましたら、
Twitter の方に連絡いただければと思います！  
ご拝読ありがとうございました〜  
それではまたお会いしましょう！

- [Daisuke’s Twitter](https://twitter.com/daisuke_phper)