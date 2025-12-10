import { describe, it, expect, vi } from "vitest";
import { POST } from "./route";
import { NextRequest } from "next/server";

// Mock Supabase
vi.mock("@supabase/supabase-js", () => ({
  createClient: vi.fn(() => ({
    from: vi.fn(() => ({
      insert: vi.fn(() => ({
        select: vi.fn(() => ({
          single: vi.fn(() =>
            Promise.resolve({
              data: { id: "test-uuid-123" },
              error: null,
            })
          ),
        })),
      })),
    })),
  })),
}));

// Mock environment variables
vi.stubEnv("NEXT_PUBLIC_SUPABASE_URL", "https://test.supabase.co");
vi.stubEnv("SUPABASE_SERVICE_ROLE_KEY", "test-key");

describe("POST /api/diagnosis", () => {
  const validBody = {
    hex: "#FF0000",
    hue: 29.2,
    lightness: 0.627,
    chroma: 0.258,
    theme: "light",
    duration_seconds: 45,
    algorithm_version: "v1.0.0",
    locale: "ja-JP",
    anonymous_id: "test-user-uuid",
  };

  const createRequest = (body: object) => {
    return new NextRequest("http://localhost:3000/api/diagnosis", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
  };

  it("正常なリクエストで success: true を返す", async () => {
    const response = await POST(createRequest(validBody));
    const data = await response.json();

    expect(response.status).toBe(200);
    expect(data.success).toBe(true);
    expect(data.id).toBe("test-uuid-123");
  });

  it("hex がない場合 400 エラー", async () => {
    const body = { ...validBody };
    delete (body as Record<string, unknown>).hex;

    const response = await POST(createRequest(body));
    const data = await response.json();

    expect(response.status).toBe(400);
    expect(data.success).toBe(false);
    expect(data.error).toContain("hex");
  });

  it("anonymous_id がない場合 400 エラー", async () => {
    const body = { ...validBody };
    delete (body as Record<string, unknown>).anonymous_id;

    const response = await POST(createRequest(body));
    const data = await response.json();

    expect(response.status).toBe(400);
    expect(data.success).toBe(false);
    expect(data.error).toContain("anonymous_id");
  });

  it("hue, lightness, chroma がない場合 400 エラー", async () => {
    const body = {
      hex: "#FF0000",
      anonymous_id: "test-user",
    };

    const response = await POST(createRequest(body));
    const data = await response.json();

    expect(response.status).toBe(400);
    expect(data.success).toBe(false);
  });
});
