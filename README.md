# nextjs-auth-straddle-different

<a href="https://nextjs-auth-straddle-different.vercel.app">https://nextjs-auth-straddle-different.vercel.app</a><br />

## 仕様

user/とadmin/でログインを個別に実装（next-auth）<br />
ログインセッションがない場合は各ディレクトリの/loginへリダイレクトする<br />
ログイン後は各ルートに遷移する

## 機能を実装するうえで重要なこと
- 各ディレクトリのrootで必ずSessionProviderでwrapしbasePathを指定すること
- 上記を行わないとnext-authのデフォルトのapiパスを読みに行ってしまう
- 各ディレクトリごとにNEXT_AUTH_SECRET_***を発行すること
- 発行したenv情報を元にnext-authのoptionsの設定を行う
- middlewareも各ディレクトリごとに設定が必要
