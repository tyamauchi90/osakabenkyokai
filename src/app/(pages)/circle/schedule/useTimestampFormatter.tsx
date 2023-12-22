// import { Timestamp } from "firebase/firestore";

// export const useTimestampFormatter = () => {
//   const convertTimestampToDate = (timestamp: Timestamp) => {
//     // FirestoreのTimestamp型をJavaScriptのDate型に変換
//     return new Date(timestamp.seconds * 1000 + timestamp.nanoseconds / 1e6);
//   };

//   const formatTimestamp = (timestamp: Timestamp) => {
//     const date = convertTimestampToDate(timestamp);
//     const options = {
//       year: "numeric",
//       month: "2-digit",
//       day: "2-digit",
//       weekday: "short",
//       timeZone: "Asia/Tokyo", // タイムゾーンを設定
//     } as Intl.DateTimeFormatOptions;
//     return date.toLocaleDateString("ja-JP", options);
//   };

//   return { formatTimestamp };
// };

import { format } from "date-fns";
import { ja } from "date-fns/locale";
import { Timestamp } from "firebase/firestore";

export const useTimestampFormatter = () => {
  const convertTimestampToDate = (timestamp: Timestamp) => {
    // FirestoreのTimestamp型をJavaScriptのDate型に変換
    return new Date(timestamp.seconds * 1000 + timestamp.nanoseconds / 1e6);
  };

  const formatTimestamp = (timestamp: Timestamp) => {
    const date = convertTimestampToDate(timestamp);
    // date-fnsを使用して日付をフォーマット
    return format(date, "yyyy/MM/dd EEEE", { locale: ja });
  };

  return { formatTimestamp };
};
