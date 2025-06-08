"use client";
export default function LoadingDots({ className = "" }) {
  return (
    <div
      className={`bg-gray-200 text-black rounded-xl p-3 flex justify-center w-fit ${className}`}
    >
      <div className="flex space-x-2">
        <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce"></div>
        <div
          className="w-2 h-2 bg-gray-500 rounded-full animate-bounce"
          style={{ animationDelay: "0.2s" }}
        ></div>
        <div
          className="w-2 h-2 bg-gray-500 rounded-full animate-bounce"
          style={{ animationDelay: "0.4s" }}
        ></div>
      </div>
    </div>
  );
}
