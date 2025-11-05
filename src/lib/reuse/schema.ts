import { z } from "zod";
import { SubType } from "./types";

// ReusePayload の外枠をZodで検証
export const ReusePayloadSchema = z.object({
  typeId: z.string().min(1),
  sub: z.custom<SubType>((v) => typeof v === "string").optional(),
  // inputs自体は各ページ固有スキーマで検証するためunknownのまま
  inputs: z.unknown().optional(),
  // ISO 8601文字列（Zod v3.23 は .datetime() 相当APIが doc に記載）
  timestamp: z.string().optional(),
});

export type ReusePayload = z.infer<typeof ReusePayloadSchema>;
