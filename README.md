# study-react

## version

node: 16.13.2  
npm: 8.1.2

| dependencies           | version  |
| ---------------------- | -------- |
| react                  | ^18.2.0  |
| react-bootstrap        | ^2.5.0   |
| react-dom              | ^18.2.0  |
| react-router-dom       | ^6.4.2   |
| react-scrips           | ^5.0.1   |
| typescript             | ^4.8.4   |

<br><br>

## set up

### initialize

#### create project

- npx create-react-app {プロジェクト名} --template typescript
- npm update
- npm i
  - npm audix が必要であれば実施
  - npm fund は寄付関連なので無視して問題ない

* 初期設定 (好み)
  - web-vitals 削除  
    ※ src/index.tsx にある reportWebVitals および reportWebVitals.ts ファイルを削除
  - src/App 関連ファイル削除  
    ※ App.tx、App.css、App.test.tsx、logo.svg ファイルを削除  
    ※ src/index.tsx にある App 関連依存を削除
  - src/index.css ファイルを削除  
    ※ src/index.tsx にある css 依存を削除
  - public/index.html ファイルを編集  
    ※ viewport と charset と title だけ残す  
    ※ body の root 以外は削除  
    ※ favicon、icon、manifest ファイルを削除
  - package.json にある "@" がついているものを devDependency に移動

<br>

#### vscode settings

```
{
  # ファイルを開くたびに前のタブを消さない
  "workbench.editor.enablePreview": false,

  # ダブルクリックでファイルを開く
  "workbench.list.openMode": "doubleClick",

  # タブサイズは 2 とする
  "editor.tabSize": 2,

  # 右に表示されるミニマップを表示しない
  "editor.minimap.enabled": false,

  # フォルダをまとめて階層表示しない
  "explorer.compactFolders": false,

  # 改行コードは LF で保存する
  "files.eol": "\n"
}
```

<br>

#### install formatter

- npm i -D prettier  
  ※ フォーマッタを担当するが、lint は担当しない。

```
{
  # 行数制限は 80
  "printWidth": 80,

  # タブ数は 2
  "tabWidth": 2,

  # 文字列はシングルクォートにする
  "singleQuote": true,

  # ステートメントの最後にセミコロンを追加しない
  # ※ false の場合、セミコロンが無いとエラーになる箇所にだけセミコロンを追加する
  "semi": false
}
```

<br>

#### install lint

- npm i -D eslint-config-prettier
- npm i -D @typescript-eslint/parser
- npm i -D @typescript-eslint/eslint-plugin  
  ※ フォーマッタと lint を担当する。  
  ※ cra にデフォルトで eslint は入っているので、prettier との連携用 plugin のみをインストールする。

<br>

#### router

- npm i react-router-dom
- npm i -D @types/react-router-dom

<br>

#### setting UI

- npm install react-bootstrap bootstrap  
  (参照) https://react-bootstrap.github.io/getting-started/introduction/  
  ※ index.html に CDN から css を読み込むよう設定も必要  
  ※ React Bootstrap は Bootstrap のコンポーネントを JSX で扱えるようにしたライブラリ

```
    <link
      rel="stylesheet"
      href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.2/dist/css/bootstrap.min.css"
      integrity="sha384-Zenh87qX5JnK2Jl0vWa8Ck2rdkQ2Bzep5IDxbcnCeuOxjzrPF/et3URy9Bv1WTRi"
      crossorigin="anonymous"
    />
```

<br>

#### setting dummy server

* npm i -D body-parser
* npm i -D @types/body-parser
* npm i -D express
* npm i -D @types/express  
  ※ package.json に express server へのプロキシを行うことで SameOrigin 問題を回避して接続できる。  
     (localhost:3000 -> localhost:5000 などの場合、port が異なるため Cookie を参照できないなど CORS 制約が起きて通信できないので proxy している。)  
  ※ format はかけるが lint はかけていない (eslintrc.yaml ファイルの修正が必要になるため)  
  ※ 以下の設定は npm run start (development env) で利用される。npm run build (prod env) では利用されない機能となる。  
     (参照) https://create-react-app.dev/docs/proxying-api-requests-in-development/

```
  "homepage": "/",
  "proxy": "http://localhost:5000"
```

- npm i -D ts-node
- npm i -D nodemon  
  ※ コード変更後、自動で再起動する。開発時に利用する。


<br><br>

## build

- npm run format  
  ※ prettier による自動フォーマッタ適用

- npm run lint  
  ※ eslint による lint 実施

- npm run build  
  ※ ビルド

- npm run test  
  ※ jest 実行  
  ※ npm run test -- ${path} で単一試験も可能

- npm run server  
  ※ nodemon で dummy server 起動
