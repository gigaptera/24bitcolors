export default function ContactPage() {
  return (
    <div className="container mx-auto max-w-3xl px-6 py-12 text-center font-serif">
      <h1 className="mb-8 text-3xl font-medium tracking-wide">お問い合わせ</h1>
      <div className="leading-8 text-gray-800">
        <p className="mb-6">
          当サイトに関するお問い合わせ、ご意見、バグ報告等は、
          <br />
          以下のGoogleフォーム、またはSNSのダイレクトメッセージよりお願いいたします。
        </p>

        {/* プレースホルダー: ユーザーに後で設定してもらう */}
        <div className="my-12 flex flex-col items-center justify-center gap-4">
          <a
            href="https://forms.google.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex w-64 items-center justify-center rounded-lg bg-blue-600 px-6 py-4 text-white shadow-md transition-all hover:bg-blue-700 hover:shadow-lg"
          >
            Googleフォームで問い合わせる
          </a>

          <a
            href="https://twitter.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex w-64 items-center justify-center rounded-lg bg-black px-6 py-4 text-white shadow-md transition-all hover:bg-gray-800 hover:shadow-lg"
          >
            X (Twitter) で連絡する
          </a>
        </div>

        <p className="text-sm text-gray-500">
          ※
          お問い合わせの内容によっては、返信にお時間をいただく場合や返信できない場合がございますので、あらかじめご了承ください。
        </p>
      </div>
    </div>
  );
}
