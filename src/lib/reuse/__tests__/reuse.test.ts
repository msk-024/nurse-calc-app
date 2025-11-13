// lib/reuse/__tests__/reuse.test.ts
import { describe, it, expect, beforeEach, vi } from "vitest";
import { z } from "zod";
import {
  setReusePayload,
  getReusePayload,
  // clearReusePayload,
  getTypedReusePayloadOnce,
} from "../reuse";
import { REUSE_STORAGE_KEY, REUSE_CLEAR_DELAY_MS } from "../types";

const SimpleSchema = z.object({
  a: z.number(),
  b: z.string(),
});

describe("reuse (Zod)", () => {
  beforeEach(() => {
    localStorage.clear();
    vi.useFakeTimers();
  });

  it("saves & gets valid payload", () => {
    setReusePayload({
      typeId: "t1",
      inputs: { a: 1, b: "x" },
      timestamp: new Date().toISOString(),
    });
    const got = getReusePayload();
    expect(got?.typeId).toBe("t1");
  });

  it("getTypedReusePayloadOnce returns typed inputs and clears later", () => {
    localStorage.setItem(
      REUSE_STORAGE_KEY,
      JSON.stringify({ typeId: "t1", inputs: { a: 1, b: "x" } })
    );
    const res = getTypedReusePayloadOnce("t1", SimpleSchema);
    expect(res).toEqual({ a: 1, b: "x" });
    expect(localStorage.getItem(REUSE_STORAGE_KEY)).not.toBeNull();
    vi.advanceTimersByTime(REUSE_CLEAR_DELAY_MS + 1);
    expect(localStorage.getItem(REUSE_STORAGE_KEY)).toBeNull();
  });
});
