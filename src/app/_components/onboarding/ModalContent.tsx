// 中央の白カード
"use client";
type Props = {
  onClose: () => void;
};

export default function ModalContent({ onClose }: Props) {
  return (
    <div className="relative bg-white rounded-2xl shadow-xl p-6 w-11/12 max-w-md text-center z-10">
      <h2 className="text-lg font-semibold mb-3 text-gray-800">ようこそ！</h2>

      <p className="text-sm text-gray-600 mb-6 leading-relaxed">
        このアプリは、看護業務に役立つ計算ツールを
        <br />
        まとめています。
        <br />
        まずは画面上のボタンから計算を選択してみましょう。
      </p>

      <button
        onClick={onClose}
        className="bg-[#F3A696] hover:bg-[#F29C8A] text-gray-800 font-medium px-4 py-2 rounded-lg transition-colors duration-300"
      >
        はじめる
      </button>
    </div>
  );
}
