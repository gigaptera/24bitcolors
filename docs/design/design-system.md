# 24bitColors Design System

**Version 1.0** | **Theme:** Museum 🏛️

## 1. Design Philosophy

"Universal Beauty & Intellectual Curiosity"
24bitColors は、色彩を探求する美術館のような空間です。静謐でエレガントな「Museum」をテーマとし、コンテンツ（色）が主役となるよう、UI は徹底的にミニマルかつ機能的でなければなりません。また、全てのユーザーに美しい体験を提供するため、最新のアクセシビリティ基準（APCA/WCAG）に準拠します。

### UX 設計原則

| 原則                     | 説明                                                     |
| :----------------------- | :------------------------------------------------------- |
| **気軽さ最優先**         | 30 秒で完了、即座に結果が見える                          |
| **中立性の確保**         | 色の配置はランダム、順序によるバイアスなし               |
| **エンターテイメント性** | 「なんでこんなに当たるの？」という驚き、シェア欲求を刺激 |
| **モバイルファースト**   | シンプルで直感的な操作                                   |

---

## 2. Color System

### Accessibility Standards

- **WCAG 2.1**: AA (4.5:1) 必須、AAA (7:1) 推奨
- **APCA (SAPC)**: Lc 60 (本文), Lc 45 (大きな見出し), Lc 75 (推奨本文)
  - 本システムでは、本文テキストにおいて **Lc 63+** (WCAG 4.5:1 相当以上) を安全圏として採用します。

### Primitive Palette (Museum Custom)

Tailwind のプリセットに依存せず、"Night Museum"の世界観に最適化された独自の無彩色パレットです。

| Token           | Hex       | Usage                                    |
| :-------------- | :-------- | :--------------------------------------- |
| **Neutral-0**   | `#FFFFFF` | Absolute White (Icons, Highlights)       |
| **Neutral-50**  | `#F9F9F9` | **Light: Page Background** (Clean, Airy) |
| **Neutral-100** | `#E5E5E5` | Light: Borders                           |
| **Neutral-200** | `#C7C7C7` | Light: Disabled / Placeholder            |
| **Neutral-500** | `#808080` | Muted Text (Lc 60+ safety line)          |
| **Neutral-800** | `#1A1A1A` | **Light: Primary Text** (Soft Black)     |
| **Neutral-900** | `#080808` | **Dark: Page Background** (Deep Ink)     |
| **Neutral-950** | `#000000` | Absolute Black                           |

### Semantic Tokens

コンテキストに基づいた意味的な変数名（CSS Variables）を使用します。

| Variable             | Light (`#F9F9F9`)     | Dark (`#080808`)      | Role                     |
| :------------------- | :-------------------- | :-------------------- | :----------------------- |
| `--background`       | Neutral-50 (#F9F9F9)  | Neutral-900 (#080808) | ページの背景。           |
| `--foreground`       | Neutral-800 (#1A1A1A) | Neutral-100 (#E5E5E5) | 主要テキスト。           |
| `--muted-foreground` | Neutral-500 (#808080) | Neutral-500 (#808080) | 補足情報。               |
| `--card`             | `#FFFFFF`             | `#121212`             | コンテンツカードの背景。 |
| `--border`           | Neutral-100 (#E5E5E5) | `#2A2A2A`             | 区切り線。               |
| `--accent`           | Neutral-950 (#000000) | Neutral-0 (#FFFFFF)   | ロゴ、アイコン。         |

---

## 3. Typography

### Font Stack

"Tradition meets Modernity"
見出しには格調高いセリフ体を、UI には可読性の高いシステムフォントを使用します。

- **Serif (Headings / Brand)**: `Georgia`, `"Times New Roman"`, `Times`, `serif`
- **Sans (UI / Body)**: System UI (`-apple-system`, `BlinkMacSystemFont`), `Inter`, `sans-serif`
- **Mono (Data / Codes)**: `SFMono-Regular`, `Consolas`, `Liberation Mono`, `Menlo`, `monospace`

## 3. Typography (Golden Ratio Scale)

### Concept: Modular Scale 1.618 (φ)

自然界で最も美しいとされる「黄金比」をフォントサイズに適用し、リズミカルで有機的な階層構造を作ります。
Base Size: **16px (1rem)**

| Token       | Calculation       | Size (approx) | Usage                           |
| :---------- | :---------------- | :------------ | :------------------------------ |
| **Micro**   | $16 \div 1.618$   | **10px**      | Disclaimer, Copyright           |
| **Base**    | $16$              | **16px**      | Body Text, UI Elements          |
| **Medium**  | $16 \times 1.618$ | **26px**      | Subheadings (H3), Large Buttons |
| **Large**   | $26 \times 1.618$ | **42px**      | Section Headings (H2)           |
| **XLarge**  | $42 \times 1.618$ | **68px**      | Page Title (H1)                 |
| **Display** | $68 \times 1.618$ | **110px**     | Hero Numbers / Art Text         |

---

## 4. Spacing (Fibonacci Sequence)

### Concept: Fibonacci & Golden Ratio

余白も黄金比に近い「フィボナッチ数列」を採用することで、心地よい「間」を生み出します。

| Token     | Size      | Role                     |
| :-------- | :-------- | :----------------------- |
| `space-1` | **5px**   | 微調整                   |
| `space-2` | **8px**   | アイコンとテキスト       |
| `space-3` | **13px**  | 密接な関係               |
| `space-4` | **21px**  | コンポーネント内余白     |
| `space-5` | **34px**  | セクション内区切り       |
| `space-6` | **55px**  | 大きな区切り             |
| `space-7` | **89px**  | セクション間（広大）     |
| `space-8` | **144px** | ヒーローエリア前後の余白 |

---

### Interactive Targets

- **Minimum Size**: 44x44px (W3C 推奨)
  - ボタンやリンクは、タップ領域として最低 44px 四方を確保する。
  - _ThemeToggle の実装もタッチ領域は h-10(40px)以上を維持すること。_

---

## 5. UI Components

### Buttons (Museum Style)

- **Shape**: 角丸なし（Sharp）または完全な丸（Pill、コンパクトなアクション用）。
- **Interaction**: ホバー時に不透明度変化 (`opacity-80`) や、反転 (`bg-black` -> `bg-white`) ではなく、背景色の微細な変化 (`zinc-800`) を基本とする。

### Cards & Shadows

- **Floating Shadow** (`--shadow-floating`): `0 30px 60px -10px`
  - 浮遊感を演出する広範囲のドロップシャドウ。
  - **Light Mode**: `rgba(0, 0, 0, 0.2)` (Black Shadow)
  - **Dark Mode**: `rgba(255, 255, 255, 0.15)` (White Glow) - 黒背景でも視認性を確保するため、白い光彩を使用する。
- **Glow Shadow** (`--shadow-glow`) _New_
  - 全方向（上下左右）に広がるソフトな影。色選択ボタンの視認性向上に使用。
  - **Light Mode**: `rgba(0, 0, 0, 0.1)` (Soft Dark)
  - **Dark Mode**: `rgba(255, 255, 255, 0.2)` (Soft Light)
- **Standard Card**: `shadow-md` は控えめに。Dark モードでは `border` (`zinc-800`) で境界を表現し、よりフラットな質感を保つ。

---

## 6. UI Component Architecture (shadcn/ui "Museum Theme")

開発効率とデザインの一貫性を両立するため、ヘッドレス UI ライブラリ（Radix UI）をベースにした **shadcn/ui** を採用しますが、そのスタイルは**「Museum Theme」で完全に上書き**します。

### Strategy: "Museum Overwrite"

shadcn の標準スタイル（`default`）をそのまま使うのではなく、本デザインシステムの定義（セリフ体、角丸なし、特殊なシャドウ）をデフォルトとして適用します。
これにより、開発者は `class` 指定を意識することなく、コンポーネントを配置するだけで美術館の世界観を再現できます。

### Technologies

- **Core**: Radix UI (Accessibility & Logic)
- **Styling**: Tailwind CSS v4 (Alpha)
- **Utils**: `cva` (Class Variance Authority), `clsx`, `tailwind-merge`

### Component Rules

> [!NOTE] > **On-Demand Strategy**:
> `Button` や `Card` 以外のコンポーネント（Dialog, Input, Select 等）が必要になった際は、shadcn のコードをコピーし、必ず **Museum Theme に適合するようにスタイルを書き換えてから** `src/components/ui/` に追加すること。
> デザインシステムに適合しない生の shadcn コンポーネントをそのまま使用しない。

#### Buttons

- **Shape**: Always `rounded-none` (Sharp) to match the framed aesthetic.
- **Font**: Always `serif` (Georgia).
- **Variants**:
  - `default`: **Primary Action**. Solid Black (Light) / White (Dark). `.btn-museum` equivalent.
  - `secondary`: **Alternative Action**. Solid White (Light) / dark Gray (Dark) with delicate border.
  - `destructive`: **Danger**. Deep Red text, borders, or background depending on importance.
  - `outline`: **Bordered**. Transparent background with `foreground` border. `.btn-museum-outline` equivalent.
  - `ghost`: **Subtle**. Hover effect only. Used for icon buttons or less prominent actions.
  - `link`: **Hyperlink**. Underline on hover, `serif`.

#### Cards

- **Default Variant**: 額縁スタイル（Black Border / White Border）を適用。
- **Default Variant**: 額縁スタイル（Black Border / White Border）を適用。
- **Shadow**: `shadow-sm` の代わりに `floating-shadow` を使用。

#### Modals (Dialogs) _New_

- **Shape**: Always `rounded-none` (Sharp).
- **Alignment**: **Left-aligned** text and actions. Avoid centering unless for specific alert types.
- **Padding**: Spacious padding (`p-8` to `p-12`) to frame the content like an artwork.
- **Typography**: Headings in **Serif** (Georgia), Body in **Serif** or **Sans** depending on content type.

### Mobile Optimized Components

- **Sticky CTA**:

  - モバイルビューポート下部に固定される「診断開始」ボタン。
  - スクロールを促すため、コンテンツと重なるが `z-index` で最前面に配置。
  - 背景への干渉を避けるため、適切なシャドウと境界線を持つ。

- **Mobile Navigation (Sheet)**:
  - ハンバーガーメニューから展開されるドロワー。
  - 画面の右側からスライドインし、主要なナビゲーションリンクを提供する。

---

## 7. Page Templates

サイト内のページを一貫性のある 3 つのタイプに分類し、それぞれのレイアウトとタイポグラフィのルールを定義します。

### A. Immersive Article (Narrative)

_Target: About, Philosophy, Logic, Concept pages_

**Concept**: "The Coffee Table Book" - 美的体験と没入感を重視し、ゆっくりと読ませるデザイン。

- **Layout**:
  - **Hero**: 中央揃え、XLarge Serif Heading (68px+)、Monospace Tagline、区切り線。
  - **Body**: シングルカラム、中央寄せ (`max-w-3xl`)、余白 (`space-8` / 144px) を多用した垂直リズム。
  - **Decorations**: 背景のぼかし効果、セクション番号 (01, 02...)、装飾的な区切り線。
- **Typography**:
  - **Headings**: Serif (Georgia).
  - **Body**: **Serif** (Georgia). 長文の可読性と雰囲気を重視。
  - **Labels**: Monospace (tracking-widest, uppercase).

### B. Standard Document (Legal/Technical)

_Target: Privacy Policy, Terms of Service, Technical Docs_

**Concept**: "The Museum Archives" - 信頼性、明確さ、構造化を重視。

- **Layout**:
  - **Container**: `max-w-3xl`、左揃えまたは両端揃え。
  - **Structure**: 明確な階層構造 (H1 > H2 > P)。装飾は最小限に抑える。
- **Typography**:
  - **Headings**: Serif (Georgia).
  - **Body**: **Serif** (Georgia). 書き言葉としての格調高さを維持するため、Sans ではなく Serif を採用。
  - **Leading**: `leading-relaxed` または `leading-loose`。

### C. Functional App (UI)

_Target: Diagnosis, Results, My Palette, Share_

**Concept**: "The Interactive Exhibit" - 機能性、操作性、レスポンシブな動作。

- **Layout**:
  - **Container**: Fluid (`w-full`) または Grid System。情報は効率的に配置。
  - **Header**: 機能的な配置（左タイトル、右アクション）。
- **Typography**:
  - **Headings**: Serif (Georgia). ブランドの統一感を出すため見出しは Serif。
  - **Body/UI**: **Sans** (System/Inter). 視認性と操作性を優先し、UI 要素や短いテキストは Sans を使用。

---

## 8. Standardization Rules

| Feature          | Immersive / Document                  | Functional App                             |
| :--------------- | :------------------------------------ | :----------------------------------------- |
| **Main Font**    | **Serif** (Georgia)                   | **Sans** (System/Inter)                    |
| **Heading Font** | **Serif**                             | **Serif**                                  |
| **Spacing**      | Fibonacci (34, 55, 89, 144px) - Loose | Grid / Fibonacci (8, 13, 21, 34px) - Tight |
| **Alignment**    | Center (Immersive) / Left (Doc)       | Functional / Grid                          |
| **Colors**       | Muted, High Contrast Text             | Functional colors, Interactive states      |

---

## 9. Content Guidelines

### Writing Style (Tone & Voice)

- **Curator's Voice**: 知識豊富で落ち着いているが、決して尊大ではない。
- **Clarity**: 専門用語は避け、直感的な言葉を選ぶ。ただし、色彩学的な正確さは妥協しない。
- **Politeness**: ユーザーを尊重する丁寧な「です・ます」調。ただし、システムメッセージやラベルは簡潔に体言止めを使用可。

---

**最終更新**: 2025 年 12 月 13 日 (v1.3 Page Templates Added)
