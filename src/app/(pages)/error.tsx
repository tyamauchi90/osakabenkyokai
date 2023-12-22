"use client";
import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  useEffect(() => {
    console.log("エラー");
    console.error(error);
  }, [error]);

  return (
    <div className="text-center">
      <p className="mb-4">予期せぬエラーが発生しました。</p>
      <button
        onClick={() => reset()}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        更新する
      </button>
    </div>
  );
}
