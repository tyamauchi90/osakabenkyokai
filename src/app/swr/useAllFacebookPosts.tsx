import useSWR from "swr";
import {
  FacebookPostType,
  SelectedFacebookPostType,
} from "../type/facebookPostType";

export default function useAllFacebookPosts() {
  const fetcher = async (url: string) => {
    const res = await fetch(url);
    return res.json();
  };

  const {
    data: posts,
    error,
    isLoading,
  } = useSWR<FacebookPostType[]>("/circle/blog/api", fetcher);

  const getFormattedPosts = () => {
    if (!posts) return [];
    return posts.map((post) => {
      const formattedDate = formatFacebookPostDate(post.created_time);
      const imgUrls = getImageUrls(post);
      return { ...post, formattedDate, imgUrls } as SelectedFacebookPostType;
    });
  };

  // 以下はデータ加工
  const formatFacebookPostDate = (rawDate: Date) => {
    const date = new Date(rawDate);
    return `${date.getFullYear()}年${date.getMonth() + 1}月${date.getDate()}日`;
  };

  const getImageUrls = (post: FacebookPostType) => {
    if (
      // 画像が複数の場合
      post.attachments &&
      post.attachments.data &&
      post.attachments.data.length > 0 &&
      post.attachments.data[0].subattachments
    ) {
      return post.attachments.data[0].subattachments.data.map(
        (subAttachment) => subAttachment.media.image.src
      );
    } else if (
      // 画像が１枚の場合
      post.attachments &&
      post.attachments.data &&
      post.attachments.data[0].media
    ) {
      return [post.attachments.data[0].media.image.src];
    } else {
      // 画像が0枚の場合
      return undefined;
    }
  };

  return {
    data: getFormattedPosts(),
    error,
    isLoading,
  };
}
