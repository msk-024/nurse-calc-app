// 通知トースト

"use client";

type ToastProps = {
  message: string;
  className?: string;
};

export default function Toast({ message, className = "" }: ToastProps) {
  return (
    <div
      className={`fixed bottom-4 left-1/2 transform -translate-x-1/2 
        bg-gray-800 text-white text-sm px-4 py-2 rounded-lg shadow-md 
        animate-fadeIn z-50 whitespace-nowrap ${className}`}
    >
      {message}
    </div>
  );
}
