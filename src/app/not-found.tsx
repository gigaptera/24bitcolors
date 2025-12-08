import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex flex-grow flex-col items-center justify-center p-6 text-center font-serif">
      <h1 className="mb-4 text-8xl font-thin text-gray-300">404</h1>
      <h2 className="mb-6 text-2xl font-medium tracking-wide text-gray-800">
        Page Not Found
      </h2>
      <p className="mb-10 text-gray-600 leading-relaxed">
        お探しのページは見つかりませんでした。
        <br />
        URLが間違っているか、ページが移動・削除された可能性があります。
      </p>
      <Link
        href="/"
        className="rounded-full border border-gray-400 px-8 py-3 text-sm transition-all hover:bg-black hover:text-white hover:border-black"
      >
        トップページへ戻る
      </Link>
    </div>
  );
}
