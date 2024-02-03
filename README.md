# おおさか勉強会サイト（https://osakabenkyokai.vercel.app/）

「学びたい、交流したい」という思いをもった社会人が集まる**[おおさか勉強会](https://osakabenkyokai.vercel.app/)**（以降、「当サークル」）の Web サイトです。

## コンセプト

当サークルを知らない人と、参加したことのある人、それぞれに必要な情報を集めることをコンセプトにしました。
以下の 2 点に絞って情報を集約しています。

1. 当サークルを知る
2. 当サークルに参加する

## ユーザー機能

1. 勉強会の閲覧：ユーザーはイベントページから開催予定の勉強会を一覧で見ることができます。
2. 勉強会の詳細表示：ユーザーは勉強会のカードをクリックすることで、その勉強会の詳細ページにアクセスできます。詳細ページには、勉強会の詳しい説明に加え、**申込みボタン**が表示されます。
3. 勉強会への参加申込み：ユーザーは勉強会の詳細ページから参加申込みを行うことができます。申込みには Stripe を使用した決済と、当日現金払いの仮申込みを選択できます。
4. アーカイブ（過去勉強会）の閲覧：ユーザーはトップページあるいはブログページから、過去に行われた勉強会の内容や感想を閲覧できます。
5. ユーザー登録・ログイン：ユーザーは自身のメールアドレスとパスワードを使用してアカウントを作成し、ログインすることができます。
6. マイページ：ユーザーは自身の予約した勉強会の一覧を確認することができます。また、アカウントに関する情報変更を行うこともできます。

## 管理者機能

1. 勉強会参加者の把握：管理者は管理者ページから勉強会参加者の情報を閲覧することができます。
2. 勉強会の登録・編集・削除：管理者は管理者ページ、あるいは勉強会詳細ページから勉強会の登録・編集・削除を行うことができます。

## テストアカウント

- テストユーザー
  メールアドレス：test@test.com
  パスワード：testtest

- テスト管理者
  メールアドレス：admin@admin.com
  パスワード：adminadmin

## テスト決済

- stripe テスト決済
  カード番号：4242424242424242
  （その他の入力は任意の情報で構いません）

## 技術スタック

- フロントエンド：Next.js 13.5.6
- バックエンド：Firebase Functions
- データベース：Firebase Firestore
- ユーザー認証：Firebase Authentication
- 支払い処理：Stripe
- ホスティング：Vercel
- スタイリング：Tailwind CSS

## 保守・運用

当サイトは CI/CD パイプラインにより保守・運用されており、GitHub にプッシュされたコードは自動的にビルド・テストされ、エラーがなければ本番環境にデプロイされます。

<!-- ## ソースコード

ソースコードは GitHub で公開しています。

- GitHub リポジトリ：https://github.com/tyamauchi90/osakabenkyokai -->

<!--
This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details. -->
