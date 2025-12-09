export default function TermsPage() {
  return (
    <div className="container mx-auto max-w-3xl px-space-5 py-space-6 font-serif">
      <h1 className="mb-space-5 text-[length:var(--text-large)] font-medium tracking-wide text-foreground">
        利用規約
      </h1>
      <div className="space-y-space-4 text-[length:var(--text-base)] leading-8 text-foreground">
        <p>
          この利用規約（以下，「本規約」といいます。）は，24bitColors（以下，「当サイト」といいます。）がこのウェブサイト上で提供するサービス（以下，「本サービス」といいます。）の利用条件を定めるものです。登録ユーザーの皆さま（以下，「ユーザー」といいます。）には，本規約に従って，本サービスをご利用いただきます。
        </p>

        <section>
          <h2 className="mb-space-3 text-[length:var(--text-medium)] font-medium text-foreground">
            第1条（適用）
          </h2>
          <p>
            本規約は，ユーザーと当サイトとの間の本サービスの利用に関わる一切の関係に適用されるものとします。
          </p>
        </section>

        <section>
          <h2 className="mb-space-3 text-[length:var(--text-medium)] font-medium text-foreground">
            第2条（禁止事項）
          </h2>
          <p>
            ユーザーは，本サービスの利用にあたり，以下の行為をしてはなりません。
          </p>
          <ul className="list-disc pl-5 mt-2 space-y-1">
            <li>法令または公序良俗に違反する行為</li>
            <li>
              当サイトのサーバーまたはネットワークの機能を破壊したり，妨害したりする行為
            </li>
            <li>当サイトのサービスの運営を妨害するおそれのある行為</li>
            <li>不正アクセスをし，またはこれを試みる行為</li>
          </ul>
        </section>

        <section>
          <h2 className="mb-space-3 text-[length:var(--text-medium)] font-medium text-foreground">
            第3条（免責事項）
          </h2>
          <p>
            当サイトは，本サービスに事実上または法律上の瑕疵（安全性，信頼性，正確性，完全性，有効性，特定の目的への適合性，セキュリティなどに関する欠陥，エラーやバグ，権利侵害などを含みます。）がないことを明示的にも黙示的にも保証しておりません。
          </p>
          <p className="mt-2">
            診断結果は統計的・アルゴリズム的な推測に基づくものであり、その正確性を保証するものではありません。
          </p>
        </section>

        <section>
          <h2 className="mb-space-3 text-[length:var(--text-medium)] font-medium text-foreground">
            第4条（利用規約の変更）
          </h2>
          <p>
            当サイトは，必要と判断した場合には，ユーザーに通知することなくいつでも本規約を変更することができるものとします。
          </p>
        </section>

        <div className="mt-space-6 text-right text-[length:var(--text-micro)] text-muted-foreground">
          2025年12月1日 制定
        </div>
      </div>
    </div>
  );
}
