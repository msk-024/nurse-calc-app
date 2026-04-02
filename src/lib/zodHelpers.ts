/**
 * Zod preprocess helper: 空文字列を undefined に変換する
 *
 * `z.preprocess` と組み合わせて使用することで、空のフォーム入力を
 * `z.coerce.number()` で 0 に変換してしまうバグを防ぐ。
 *
 * @example
 * z.preprocess(prep, z.coerce.number({ invalid_type_error: "..." }))
 */
export const prep = (val: unknown): unknown => (val === "" ? undefined : val);
