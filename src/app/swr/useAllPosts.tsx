import useSWR from "swr";

export default function useAllPosts() {
  const fetcher = async (url: string) => {
    const res = await fetch(url);
    return res.json();
  };

  const {
    data: posts,
    error,
    isLoading,
  } = useSWR("/circle/schedule/api/allposts", fetcher);

  return {
    data: posts,
    error,
    isLoading,
  };
}
