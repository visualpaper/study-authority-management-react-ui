# study-authority-management-react-ui

## version

node: 18.12.1  
npm: 9.1.2

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

#### vscode plugin

- IntelliJ IDEA Keybindings  
   ※ InteliJ と同じ keymap にしてくれる。

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
- npm i -D eslint-plugin-unused-imports  
  ※ フォーマッタと lint を担当する。  
  ※ cra にデフォルトで eslint は入っているので、prettier との連携用 plugin のみをインストールする。

<br>

#### router

- npm i react-router-dom
- npm i -D @types/react-router-dom

<br>

#### error handling

- npm i react-error-boundary  
  ※ https://github.com/bvaughn/react-error-boundary が公式そのまま使うより使いやすいので使っている。

<br>

#### api

- npm i react-query
- npm i query-string  
  ※ query 文字列を操作するもの。

<br>

#### ui

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

- npm i react-toastify  
  ※ ToastContainer と `import 'react-toastify/dist/ReactToastify.css'` の追加が必要な点に注意。  
  (参照) https://fkhadra.github.io/react-toastify/introduction

- npm i react-icons  
  (参照) https://react-icons.github.io/react-icons

<br>

#### form

- npm i formik  
  (参照) https://formik.org/

<br>

#### util

- npm i dateformat  
- npm i -D @types/dateformat  
  ※ 日付の表示に利用

<br>

#### dummy server

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

<br><br><br>

## パターン

### error ハンドリング

React でのデフォルトの挙動は以下の通り

* レンダリング時にエラーが発生  
  → 画面が全アンマウントされ (真っ白になり) 操作できなくなる  
  例: コンパイルエラーなどの実装バグ、コンポーネント描画時にエラーが投げられた場合など

* レンダリング外でエラーが発生  
  → コンソールにエラーが表示され、操作は継続して可能  
  例: ボタン押下後の非同期処理などでエラー、レンダリングの関係ない部分でエラーが投げられた場合など

<br><br>

本コンポーネントでは以下規約でエラーをハンドリングする

* 想定内のエラーとして以下 Error を独自として持つ  
  - ApiError: API 通信時のエラー  
  - AppError: ApiError 以外で制御すべきエラー

その上で以下ハンドリングを行う。

<br>

* レンダリング時にエラーが発生  
  → トップ階層の Error Boundary でハンドリングし復旧不可能にする。  
  ※ Error Boundary そのものでイベントハンドラ・非同期コードは制御されないため、それ以外を制御する。  
  ※ 主に、コンパイルエラーなどの実装バグがメインのため、復旧不可能とする。

<br>

* レンダリング外でエラーが発生 (useQuery/useMutation での非同期通信時のエラー)
  → 想定外のエラー (AppError 以外) はトップ階層の Error Boundary でハンドリングし復旧不可能にする。  
  → 想定内のエラー (AppError) は onError でハンドリングする。

<br>

※ 検討時の参考資料

https://tkdodo.eu/blog/react-query-error-handling

<br><br><br>

## 知見

### レンダリングのタイミング

* 再レンダリングが発生する条件
  - 親コンポーネントがレンダリングされた場合  
  - state が変化した場合  
  ※ props の変化は関係ない点が重要で、結果的に親コンポーネントがレンダリングされた時に props が変化することが多いからそう見えるだけである。  
  ※ props が変化することが多い、という点からすべてのコンポーネントの `useMemo` が使われていないと公式でいっている。

<br>

* ステップ
  - レンダリングフェーズで再描画が必要とマークされているものを抽出する  
    ※ このマークは再レンダリングが発生する条件に合致した場合、マークされる。

  - コミットフェーズで実際に再描画する  
    ※ 差分マージが行われ、必要な部分だけが再描画される。  
    ※ Root が再描画されれば全コンポーネントが、あるページルートが再描画されればそのページの子コンポーネントが再描画される。  
    ※ key 要素を使うことで差分マージが行われるという機構を持っている。

<br>

* 対応策
  - `useMemo` を使う  
    ※ 前 props と次 props に変化がなかった場合に再描画をスキップする。

  - `useCallback` を使う  
    ※ 前 propd と次 props の比較は `===` で行われるため、これで解決できるケースがある。

(参照) https://qiita.com/hellokenta/items/6b795501a0a8921bb6b5

<br><br>

#### Async

忘れたら読む: https://jsprimer.net/basic/async/

* 非同期処理はメインスレッドで実行される  
  ※ 同期処理によって非同期処理も遅れる。

* 非同期処理は外に例外を通知する必要がある  
  ※ ES2015 から Promise が誕生した。

* Promise の特徴  
  - Pending、Resolve、Reject の 3 つの状態がある  
  - 生成時点では Pending となる。  
  - Resolve、Reject 後はその Promise インスタンスは状態変化しない  
  - cache は Resolve 状態の Promise を返す

* Asyn Function の誕生  
  - Async 関数は以下の点が通常の関数とは異なる  
  - Async 関数は Promise インスタンスを返す  
    ※ return まで到達すると Promise.resolve(値) が返却される。  
    ※ 例外が発生する/させると Primise.reject が返却される。  
  - Async 関数は await を使える
    ※ await は右辺の Promise インスタンスが Fulfilled/Rejectd になるまでその場で非同期処理の完了を待つ。  
    ※ await は右辺の Promise インスタンスの評価結果を値として返す。  
    ※ await の右辺の Promise インスタンスが Reject になった場合はその場でエラーを throw する。  
    ※ Promise インスタンスの状態が変化した後次の行の処理を再開する。  
    ※ Async Funciton 内で発生した例外は自動でキャッチされ、Async Function からは Reject な Promise を返される。  
    ※ Async Funciton 内で発生した例外を自分で try cache し rethrow しない場合、Async Function からは Resolve な Promise を返される。  
    ※ Async Function の呼び出し元は Async Function の完了を待たずに処理を継続できる。
