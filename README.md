# web3todo
gethoとTruffleを使ったDApp開発ハンズオン

## 開発環境
- Node(v9.6.1)
- npm(v5.6.0)

## 前準備  
### ①gethoアカウントの生成
- https://getho.io にアクセス
- ユーザー登録をする
- (ノードの画面が確認できたらOKです！)

### ②レポジトリのクローン  
- 今回のアプリケーションのレポジトリを取得します

```
$ git clone https://github.com/daisuke310vvv/web3todo
$ cd web3todo
```

### ③Nodeのライブラリのインストール  
- webアプリケーションを動かすための依存パッケージをインストールします

```
$ npm install
```

## コントラクトのデプロイ  
- todoコントラクト(`contracts/todo.sol`)をgethoにデプロイします
- 作成したノードのサブドメインを確認し、`truffle.js`内の`<GETHO_SUBDOMAIN>` を書き換える

```
$ truffle migrate --network getho // 2度目以降の場合は `--reset` をつける
```

**getho.ioにいくと、トランザクションを確認できます**

## webアプリケーションを立ち上げる  
- ブロックチェーンにアクセスするWebアプリケーションを立ち上げます
- コントラクトのデプロイをした時に発行された `TdDo`コントラクトのアドレスをコピーし、`app.js`内の`<TODO_CONTRACT_ADDRESS>`を書き換える
<画像いれる>
- 作成したノードのサブドメインを確認し、`app.js`内の`<GETHO_SUBDOMAIN>`を書き換える

```
$ node app.js
```

アプリケーションが立ち上がると、
**http://localhost:3000/にアクセスできます**

## gethoにコントラクトを登録する  
- 自分が作成したコントラクトをgethoにアップロードします
- カレントディレクトリ内ある`getho_<mac|linux>`を使います

```
// gethoにログイン
$ getho login
email: // 登録したメールアドレスを入力
password: // 登録したパスワードを入力

// 自分のノード一覧を取得
$ getho nodes

// gethoにコントラクトをアップロード
$ getho upload ./build/contracts/ToDo.json -s `getho nodes`
```

**getho上でコントラクトの関数を実行できるようになります**