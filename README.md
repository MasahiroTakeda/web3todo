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
- 作成したノードのサブドメインを確認し、`truffle.js`内4行目の`<GETHO_SUBDOMAIN>` を書き換える
[![Image from Gyazo](https://i.gyazo.com/174debc7bfd29c6cb24766a97b719e55.png)](https://gyazo.com/174debc7bfd29c6cb24766a97b719e55)

```
$ truffle migrate --network getho // 2度目以降の場合は `--reset` をつける
```

**getho.ioにいくと、トランザクションを確認できます**

## webアプリケーションを立ち上げる  
- ブロックチェーンにアクセスするWebアプリケーションを立ち上げます
- コントラクトのデプロイをした時に発行された `TdDo`コントラクトのアドレスをコピーし、`app.js`内15行目の`<TODO_CONTRACT_ADDRESS>`を書き換える
[![Image from Gyazo](https://i.gyazo.com/35246ab84d3fe02b14b04f2b95c82ad2.png)](https://gyazo.com/35246ab84d3fe02b14b04f2b95c82ad2)

- 作成したノードのサブドメインを確認し、`app.js`内13行目の`<GETHO_SUBDOMAIN>`を書き換える

```
$ node app.js
```

アプリケーションが立ち上がると、http://localhost:3000/ にアクセスできます

## gethoにコントラクトを登録する  
- 自分が作成したコントラクトをgethoにアップロードします
- カレントディレクトリ内ある`getho_<osx|linux>`を使います

```
// gethoにログイン
$ ./getho_osx login
email: // 登録したメールアドレスを入力
password: // 登録したパスワードを入力

// 自分のノード一覧を取得
$ ./getho_osx nodes

// gethoにコントラクトをアップロード
$ ./getho_osx upload ./build/contracts/ToDo.json -s <GETHO_SUBDOMAIN>
```

**getho上でコントラクトの関数を実行できるようになります**

