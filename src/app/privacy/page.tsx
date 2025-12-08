export default function PrivacyPage() {
  return (
    <div className="container mx-auto max-w-3xl px-6 py-12 font-serif">
      <h1 className="mb-8 text-3xl font-medium tracking-wide">
        プライバシーポリシー
      </h1>
      <div className="space-y-8 text-sm leading-8 text-gray-800">
        <section>
          <h2 className="mb-3 text-lg font-medium text-black">
            個人情報の利用目的
          </h2>
          <p>
            当サイトでは、お問い合わせや記事へのコメントの際、名前やメールアドレス等の個人情報を入力いただく場合がございます。
            取得した個人情報は、お問い合わせに対する回答や必要な情報を電子メールなどをでご連絡する場合に利用させていただくものであり、これらの目的以外では利用いたしません。
          </p>
        </section>

        <section>
          <h2 className="mb-3 text-lg font-medium text-black">広告について</h2>
          <p>
            当サイトでは、第三者配信の広告サービス（Googleアドセンス）を利用しており、ユーザーの興味に応じた商品やサービスの広告を表示するため、クッキー（Cookie）を使用しております。
            クッキーを使用することで当サイトはお客様のコンピュータを識別できるようになりますが、お客様個人を特定できるものではありません。
          </p>
          <p className="mt-2">
            Cookieを無効にする方法やGoogleアドセンスに関する詳細は
            <a
              href="https://policies.google.com/technologies/ads?hl=ja"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline"
            >
              「広告 – ポリシーと規約 – Google」
            </a>
            をご確認ください。
          </p>
        </section>

        <section>
          <h2 className="mb-3 text-lg font-medium text-black">
            アクセス解析ツールについて
          </h2>
          <p>
            当サイトでは、Googleによるアクセス解析ツール「Googleアナリティクス」を利用しています。このGoogleアナリティクスはトラフィックデータの収集のためにクッキー（Cookie）を使用しております。トラフィックデータは匿名で収集されており、個人を特定するものではありません。
          </p>
        </section>

        <div className="mt-12 text-right text-xs text-gray-400">
          2025年12月1日 制定
        </div>
      </div>
    </div>
  );
}
