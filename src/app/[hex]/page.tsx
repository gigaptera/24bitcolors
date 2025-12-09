import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { getColorInfo, isValidHex } from "@/lib/color-utils";
import { ShareActions } from "@/components/ShareActions";

type Params = Promise<{ hex: string }>;

interface PageProps {
  params: Params;
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { hex } = await params;
  if (!isValidHex(hex)) return {};

  const info = getColorInfo(`#${hex}`);
  if (!info) return {};

  return {
    title: `${info.hex} - Your Color | 24bitColors`,
    description: `Color details for ${info.hex}. RGB: ${info.rgb.r}, ${
      info.rgb.g
    }, ${info.rgb.b} | OKLCH: L:${Math.round(
      info.oklch.l * 100
    )} C:${Math.round(info.oklch.c * 100)} H:${Math.round(info.oklch.h)}`,
    openGraph: {
      title: `${info.hex} - Your Color`,
      description: `I found my color on 24bitColors!`,
      images: [
        {
          url: `https://api.clrs.page/${hex}`, // 外部APIまたは将来的なOGP生成APIへのプレースホルダー
          // 実装初期はデフォルトOGPでも可。今回は簡易的に外部の単色画像サービスや、色自体は見せられないがテキストで表現
        },
      ],
    },
  };
}

export default async function ColorDetailPage({ params }: PageProps) {
  const { hex } = await params;

  if (!isValidHex(hex)) {
    notFound();
  }

  const colorInfo = getColorInfo(`#${hex}`);
  if (!colorInfo) {
    notFound();
  }

  // 背景色の明るさに応じてテキスト色を決定（簡易YIQ）
  const yiq =
    (colorInfo.rgb.r * 299 + colorInfo.rgb.g * 587 + colorInfo.rgb.b * 114) /
    1000;
  const textColor = yiq >= 128 ? "black" : "white";

  return (
    <>
      {/* メインコンテンツ */}
      <div className="flex flex-col items-center justify-center px-space-4 py-space-6 md:py-space-7">
        <div className="w-full max-w-3xl">
          {/* 色見本カード */}
          <div className="mb-space-6 overflow-hidden rounded-none bg-[var(--card)] shadow-2xl">
            {/* カラーブロック */}
            <div
              className="h-64 w-full transition-colors duration-500 md:h-80"
              style={{ backgroundColor: colorInfo.hex }}
            >
              <div className="flex h-full items-center justify-center opacity-0 transition-opacity duration-300 hover:opacity-100">
                <span
                  className="text-[length:var(--text-medium)] font-light tracking-widest"
                  style={{ color: textColor, fontFamily: "Georgia, serif" }}
                >
                  {colorInfo.hex}
                </span>
              </div>
            </div>

            {/* 情報エリア */}
            <div className="p-space-5 md:p-space-6">
              <h1
                className="mb-space-5 text-center text-[length:var(--text-large)] font-normal text-[var(--foreground)] md:text-[length:var(--text-xlarge)]"
                style={{ fontFamily: "Georgia, serif" }}
              >
                {colorInfo.hex}
              </h1>

              <div className="grid grid-cols-2 gap-space-5 md:grid-cols-4">
                {/* RGB */}
                <div className="text-center">
                  <h3 className="mb-space-2 text-[length:var(--text-micro)] font-bold tracking-widest text-[var(--muted-foreground)]">
                    RGB
                  </h3>
                  <p className="font-mono text-[length:var(--text-base)] text-[var(--foreground)]">
                    {colorInfo.rgb.r}
                    <br />
                    {colorInfo.rgb.g}
                    <br />
                    {colorInfo.rgb.b}
                  </p>
                </div>

                {/* CMYK */}
                <div className="text-center">
                  <h3 className="mb-space-2 text-[length:var(--text-micro)] font-bold tracking-widest text-[var(--muted-foreground)]">
                    CMYK
                  </h3>
                  <p className="font-mono text-[length:var(--text-base)] text-[var(--foreground)]">
                    {colorInfo.cmyk.c}%<br />
                    {colorInfo.cmyk.m}%<br />
                    {colorInfo.cmyk.y}%<br />
                    {colorInfo.cmyk.k}%
                  </p>
                </div>

                {/* HSV */}
                <div className="text-center">
                  <h3 className="mb-space-2 text-[length:var(--text-micro)] font-bold tracking-widest text-[var(--muted-foreground)]">
                    HSV
                  </h3>
                  <p className="font-mono text-[length:var(--text-base)] text-[var(--foreground)]">
                    {Math.round(colorInfo.hsv.h)}°<br />
                    {Math.round(colorInfo.hsv.s * 100)}%<br />
                    {Math.round(colorInfo.hsv.v * 100)}%
                  </p>
                </div>

                {/* OKLCH */}
                <div className="text-center">
                  <h3 className="mb-space-2 text-[length:var(--text-micro)] font-bold tracking-widest text-[var(--muted-foreground)]">
                    OKLCH
                  </h3>
                  <p className="font-mono text-[length:var(--text-base)] text-[var(--foreground)]">
                    {Math.round(colorInfo.oklch.l * 100)}%<br />
                    {Math.round(colorInfo.oklch.c * 100)}%<br />
                    {Math.round(colorInfo.oklch.h)}°
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* シェアアクション */}
          <div className="mb-space-6">
            <h3
              className="mb-space-4 text-center text-[length:var(--text-base)] text-[var(--muted-foreground)]"
              style={{ fontFamily: "Georgia, serif" }}
            >
              Share This Color
            </h3>
            {/* URLはクライアントサイドで取得するか、サーバーサイドで組み立てる。
                今回は簡易的に固定ドメイン + hex で生成 */}
            <ShareActions
              url={`https://24bitcolors.com/${hex}`}
              colors={{ name: colorInfo.hex, code: colorInfo.hex }}
            />
          </div>

          {/* 別のアクション */}
          <div className="flex flex-col items-center justify-center gap-space-4">
            <Link href="/" className="btn-museum">
              新しい色を探す（最初から）
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
