# study-react

## version

node: 16.13.2  
npm: 8.1.2

| dependencies           | version  |
| ---------------------- | -------- |
| react                  | ^18.2.0  |
| react-dom              | ^18.2.0  |
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
