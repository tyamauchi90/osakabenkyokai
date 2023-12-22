import { Timestamp } from "firebase/firestore";

export const useTimestampGetter = () => {
  const convertTimestampToDate = (timestamp: Timestamp) => {
    return new Date(timestamp.seconds * 1000 + timestamp.nanoseconds / 1e6);
  };

  const getMonth = (timestamp: Timestamp) => {
    const date = convertTimestampToDate(timestamp);
    return date.toLocaleDateString("ja-JP", { month: "2-digit" });
  };

  const getDay = (timestamp: Timestamp) => {
    const date = convertTimestampToDate(timestamp);
    return date.toLocaleDateString("ja-JP", { day: "2-digit" });
  };

  const formatTimestampWithWeekday = (timestamp: Timestamp) => {
    const date = convertTimestampToDate(timestamp);
    const options = {
      month: "2-digit",
      day: "2-digit",
      weekday: "short",
    } as Intl.DateTimeFormatOptions;
    return date.toLocaleDateString("ja-JP", options);
  };

  return { getMonth, getDay, formatTimestampWithWeekday };
};
