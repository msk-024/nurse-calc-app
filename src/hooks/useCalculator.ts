"use client";

import { useRef, useEffect, useState } from "react";
import { useForm, UseFormReturn } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ZodTypeAny } from "zod";
import { getTypedReusePayloadOnce } from "@/lib/reuse/reuse";
import { scrollToRef } from "@/lib/scrollToRef";

type SubType = "na" | "k" | "mg";

interface UseCalculatorReturn<TInputs extends Record<string, any>, TResult = any> {
  result: TResult | null;
  setResult: (result: TResult) => void;
  resultRef: React.RefObject<HTMLDivElement | null>;
  register: UseFormReturn<TInputs>["register"];
  handleSubmit: UseFormReturn<TInputs>["handleSubmit"];
  reset: UseFormReturn<TInputs>["reset"];
  watch: UseFormReturn<TInputs>["watch"];
  setError: UseFormReturn<TInputs>["setError"];
  errors: UseFormReturn<TInputs>["formState"]["errors"];
}

/**
 * 計算機コンポーネント用カスタムフック
 *
 * 共通ロジック：
 * - useForm + Zod検証の初期化
 * - 再利用データの復元（reset）
 * - 結果表示時のスクロール管理
 * - エラーハンドリング
 *
 * @param schema - Zod スキーマ（入力値バリデーション）
 * @param typeId - 計算機タイプID（履歴保存キー）
 * @param sub - 電解質計算用サブタイプ（"na" | "k"）
 * @returns useForm が返すメソッドと result 管理 state
 */
export function useCalculator<
  TInputs extends Record<string, any>,
  TResult = any
>(
  schema: ZodTypeAny,
  typeId: string,
  sub?: SubType,
): UseCalculatorReturn<TInputs, TResult> {
  const [result, setResult] = useState<TResult | null>(null);
  const resultRef = useRef<HTMLDivElement>(null);

  const form = useForm<TInputs>({
    resolver: zodResolver(schema),
    defaultValues: undefined,
    shouldUnregister: false, // OxygenCalculator の条件付きフィールド対応
  });

  const { reset } = form;

  // Effect 1: 再利用データの復元
  useEffect(() => {
    const data = getTypedReusePayloadOnce(typeId, schema, sub);
    if (!data) return;
    reset(data as TInputs);
  }, [reset, typeId, schema, sub]);

  // Effect 2: 結果表示時にスクロール
  useEffect(() => {
    if (result) scrollToRef(resultRef);
  }, [result]);

  return {
    result,
    setResult,
    resultRef,
    register: form.register,
    handleSubmit: form.handleSubmit,
    reset: form.reset,
    watch: form.watch,
    setError: form.setError,
    errors: form.formState.errors,
  };
}
