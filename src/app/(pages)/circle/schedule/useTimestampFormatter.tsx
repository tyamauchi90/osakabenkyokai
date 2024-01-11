import { Timestamp } from "firebase/firestore";

export const useTimestampFormatter = () => {
  const convertTimestampToDate = (timestamp: Timestamp) => {
    const seconds =
      "seconds" in timestamp ? timestamp.seconds : timestamp._seconds; // ToDo:_secondsになる理由がわからない
    // return new Date(seconds * 1000 + timestamp.nanoseconds / 1e6);
    return new Date(seconds * 1000);
  };

  const getDate = (timestamp: Timestamp) => {
    const date = convertTimestampToDate(timestamp);
    return date.toLocaleDateString("ja-JP", {
      year: "numeric",
      month: "numeric",
      day: "numeric",
    });
  };

  const getMonthAndDay = (timestamp: Timestamp) => {
    const date = convertTimestampToDate(timestamp);
    return date.toLocaleDateString("ja-JP", {
      month: "numeric",
      day: "numeric",
    });
  };

  const getMonthAndDayAndWeekday = (timestamp: Timestamp) => {
    const date = convertTimestampToDate(timestamp);
    return date.toLocaleDateString("ja-JP", {
      month: "numeric",
      day: "numeric",
      weekday: "short",
    });
  };

  const getYear = (timestamp: Timestamp) => {
    const date = convertTimestampToDate(timestamp);
    return date.toLocaleDateString("ja-JP", { year: "numeric" });
  };

  const getMonth = (timestamp: Timestamp) => {
    const date = convertTimestampToDate(timestamp);
    return date.toLocaleDateString("ja-JP", { month: "numeric" });
  };

  const getDay = (timestamp: Timestamp) => {
    const date = convertTimestampToDate(timestamp);
    return date.toLocaleDateString("ja-JP", { day: "numeric" });
  };

  const getWeekday = (timestamp: Timestamp) => {
    const date = convertTimestampToDate(timestamp);
    return date.toLocaleDateString("ja-JP", { weekday: "short" });
  };

  return {
    getDate,
    getMonthAndDay,
    getMonthAndDayAndWeekday,
    getYear,
    getMonth,
    getDay,
    getWeekday,
  };
};
