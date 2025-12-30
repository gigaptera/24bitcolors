/**
 * フィードバックデータの管理
 * API Route経由でSupabaseに保存（失敗時はlocalStorageにフォールバック）
 */

export interface FeedbackEntry {
  diagnosis_id?: string; // Link to diagnosis
  hex: string;
  hue: number;
  lightness: number;
  chroma: number;
  rating?: number;
  agreement_score?: number;
  expected_color?: string;
  actual_impression?: string;
  comment?: string;
  reason_tags?: string[];

  timestamp?: string;
  userAgent?: string;
}

const STORAGE_KEY = "24bitcolors_feedback";

/**
 * フィードバックを保存（API Route経由、フォールバックでlocalStorage）
 */
export async function saveFeedback(
  entry: Omit<FeedbackEntry, "timestamp" | "userAgent">
): Promise<{ success: boolean; error?: string }> {
  const userAgent =
    typeof navigator !== "undefined" ? navigator.userAgent : "unknown";

  try {
    const res = await fetch("/api/feedback", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        diagnosis_id: entry.diagnosis_id,
        rating: entry.rating,
        agreement_score: entry.agreement_score,
        expected_color: entry.expected_color,
        actual_impression: entry.actual_impression,
        comment: entry.comment,
        reason_tags: entry.reason_tags,
      }),
    });

    const data = await res.json();

    if (!data.success) {
      console.error("API error:", data.error);
      saveToLocalStorage(entry, userAgent);
      return {
        success: true,
        error: "Saved to localStorage (API error)",
      };
    }

    return { success: true };
  } catch (err) {
    console.error("API connection error:", err);
    saveToLocalStorage(entry, userAgent);
    return {
      success: true,
      error: "Saved to localStorage (connection error)",
    };
  }
}

/**
 * localStorageに保存（フォールバック用）
 */
function saveToLocalStorage(
  entry: Omit<FeedbackEntry, "timestamp" | "userAgent">,
  userAgent: string
): void {
  const existing = getFeedbackEntriesFromLocalStorage();
  const newEntry: FeedbackEntry = {
    ...entry,
    timestamp: new Date().toISOString(),
    userAgent,
  };

  existing.push(newEntry);

  if (typeof window !== "undefined") {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(existing));
  }
}

/**
 * localStorageからフィードバックを取得
 */
export function getFeedbackEntriesFromLocalStorage(): FeedbackEntry[] {
  if (typeof window === "undefined") return [];

  try {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
}

/**
 * フィードバック数を取得（localStorage）
 */
export function getFeedbackCount(): number {
  return getFeedbackEntriesFromLocalStorage().length;
}

/**
 * フィードバックをCSV形式でエクスポート（localStorage）
 */
export function exportFeedbackAsCSV(): string {
  const entries = getFeedbackEntriesFromLocalStorage();

  if (entries.length === 0) {
    return "No feedback data available";
  }

  const headers = [
    "hex",
    "hue",
    "lightness",
    "chroma",
    "rating",
    "agreement_score",
    "expected_color",
    "actual_impression",
    "comment",
    "timestamp",
    "userAgent",
  ];
  const csvRows = [headers.join(",")];

  entries.forEach((entry) => {
    const row = [
      entry.hex,
      entry.hue.toFixed(2),
      entry.lightness.toFixed(3),
      entry.chroma.toFixed(3),
      (entry.rating || "").toString(),
      (entry.agreement_score || "").toString(),
      entry.expected_color || "",
      entry.actual_impression || "",
      `"${(entry.comment || "").replace(/"/g, '""')}"`,
      entry.timestamp || "",
      `"${(entry.userAgent || "").replace(/"/g, '""')}"`,
    ];
    csvRows.push(row.join(","));
  });

  return csvRows.join("\n");
}

/**
 * CSVをダウンロード（開発者向け）
 */
export function downloadFeedbackCSV(): void {
  const csv = exportFeedbackAsCSV();
  const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);

  const link = document.createElement("a");
  link.href = url;
  link.download = `24bitcolors_feedback_${
    new Date().toISOString().split("T")[0]
  }.csv`;
  link.click();

  URL.revokeObjectURL(url);
}

/**
 * localStorageのフィードバックデータをクリア（開発用）
 */
export function clearFeedback(): void {
  if (typeof window !== "undefined") {
    localStorage.removeItem(STORAGE_KEY);
  }
}

// 開発者向け: グローバルに公開
if (typeof window !== "undefined") {
  (window as unknown as Record<string, unknown>).__24bitcolors = {
    getFeedbackEntries: getFeedbackEntriesFromLocalStorage,
    getFeedbackCount,
    exportFeedbackAsCSV,
    downloadFeedbackCSV,
    clearFeedback,
  };
}
