# 24bitColors Design System

**Version 1.0** | **Theme:** Night Museum 🏛️

## 1. Design Philosophy

"Universal Beauty & Intellectual Curiosity"
24bitColors は、色彩を探求する美術館のような空間です。静謐でエレガントな「Night Museum」をテーマとし、コンテンツ（色）が主役となるよう、UI は徹底的にミニマルかつ機能的でなければなりません。また、全てのユーザーに美しい体験を提供するため、最新のアクセシビリティ基準（APCA/WCAG）に準拠します。

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
- **Shadow**: `shadow-sm` の代わりに `floating-shadow` を使用。
