import useSWR from "swr";

export default function usePostById(id: string) {
  const fetcher = async (url: string) => {
    const res = await fetch(url);
    return res.json();
  };

  const {
    data: post,
    error,
    isLoading,
    mutate,
  } = useSWR(`/circle/event/api/${id}`, fetcher);

  return {
    data: post,
    error,
    isLoading,
    mutate,
  };
}
