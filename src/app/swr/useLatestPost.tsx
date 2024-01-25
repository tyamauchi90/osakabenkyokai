import useSWR from "swr";

export default function useLatestPost() {
  const fetcher = async (url: string) => {
    const res = await fetch(url);
    return res.json();
  };

  const {
    data: latestPost,
    error,
    isLoading,
    mutate,
  } = useSWR(`/circle/event/api/latestpost`, fetcher);

  return {
    data: latestPost,
    error,
    isLoading,
    mutate,
  };
}
