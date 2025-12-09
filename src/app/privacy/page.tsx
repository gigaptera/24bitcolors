export default function PrivacyPage() {
  return (
    <div className="container mx-auto max-w-3xl px-space-5 py-space-6 font-serif">
      <h1 className="mb-space-5 text-[length:var(--text-large)] font-medium tracking-wide text-[var(--foreground)]">
        プライバシーポリシー
      </h1>
      <div className="space-y-space-5 text-[length:var(--text-base)] leading-8 text-[var(--foreground)]">
        <section>
          <h2 className="mb-space-3 text-[length:var(--text-medium)] font-medium text-[var(--foreground)]">
            個人情報の利用目的
          </h2>
          <p>
            当サイトでは、お問い合わせや記事へのコメントの際、名前やメールアドレス等の個人情報を入力いただく場合がございます。
            取得した個人情報は、お問い合わせに対する回答や必要な情報を電子メールなどをでご連絡する場合に利用させていただくものであり、これらの目的以外では利用いたしません。
          </p>
        </section>

        <section>
          <h2 className="mb-space-3 text-[length:var(--text-medium)] font-medium text-[var(--foreground)]">
            広告について
          </h2>
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
              className="text-[var(--foreground)] underline decoration-1 underline-offset-4 hover:text-[var(--muted-foreground)]"
            >
              「広告 – ポリシーと規約 – Google」
            </a>
            をご確認ください。
          </p>
        </section>

        <section>
          <h2 className="mb-space-3 text-[length:var(--text-medium)] font-medium text-[var(--foreground)]">
            アクセス解析ツールについて
          </h2>
          <p>
            当サイトでは、Googleによるアクセス解析ツール「Googleアナリティクス」を利用しています。このGoogleアナリティクスはトラフィックデータの収集のためにクッキー（Cookie）を使用しております。トラフィックデータは匿名で収集されており、個人を特定するものではありません。
          </p>
        </section>

        <div className="mt-space-6 text-right text-[length:var(--text-micro)] text-[var(--muted-foreground)]">
          2025年12月1日 制定
        </div>
      </div>
    </div>
  );
}
