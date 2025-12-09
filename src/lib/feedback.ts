/**
 * フィードバックデータの管理
 * Supabase に保存（設定されていない場合はlocalStorageにフォールバック）
 */
import { supabase, isSupabaseConfigured } from "./supabase";

export interface FeedbackEntry {
  diagnosis_id?: string; // New Link
  hex: string;
  hue: number;
  lightness: number;
  chroma: number;
  rating?: number;
  agreement_score?: number;
  expected_color?: string;
  actual_impression?: string;
  comment?: string;
  timestamp?: string;
  userAgent?: string;
}

const STORAGE_KEY = "24bitcolors_feedback";

/**
 * フィードバックを保存（Supabase優先、フォールバックでlocalStorage）
 */
export async function saveFeedback(
  entry: Omit<FeedbackEntry, "timestamp" | "userAgent">
): Promise<{ success: boolean; error?: string }> {
  const userAgent =
    typeof navigator !== "undefined" ? navigator.userAgent : "unknown";

  // Supabaseが設定されている場合はSupabaseに保存
  if (isSupabaseConfigured() && supabase) {
    try {
      const { error } = await supabase.from("feedback").insert({
        diagnosis_id: entry.diagnosis_id, // Link to diagnosis
        rating: entry.rating,
        agreement_score: entry.agreement_score,
        expected_color: entry.expected_color,
        actual_impression: entry.actual_impression,
        comment: entry.comment,
      });

      // Note: hex/hue/etc are now in 'diagnoses' table, so 'feedback' doesn't need them,
      // but for localStorage fallback we might still want them or for debugging.
      // The SQL definition for 'feedback' REMOVED hex/hue columns.
      // So I must NOT remove them from the Interface (used by UI to pass data),
      // but I should NOT send them to Supabase 'feedback' table insert if they don't exist.

      if (error) {
        console.error("Supabase error:", error);
        saveToLocalStorage(entry, userAgent);
        return {
          success: true,
          error: "Saved to localStorage (Supabase error)",
        };
      }

      return { success: true };
    } catch (err) {
      console.error("Supabase connection error:", err);
      saveToLocalStorage(entry, userAgent);
      return {
        success: true,
        error: "Saved to localStorage (connection error)",
      };
    }
  }

  // Supabase未設定の場合はlocalStorageに保存
  saveToLocalStorage(entry, userAgent);
  return { success: true };
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
