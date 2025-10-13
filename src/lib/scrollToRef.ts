// スムーススクロール
export function scrollToRef<T extends HTMLElement>(
  ref: React.RefObject<T | null>
) {
  if (ref.current) {
    ref.current.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  }
}
