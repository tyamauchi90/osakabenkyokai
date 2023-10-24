import axios, { AxiosError } from "axios";
import { FacebookPost } from "../../type/facebookPostType";

export async function getFacebookPosts(): Promise<FacebookPost[]> {
  try {
    const accessToken = process.env.NEXT_PUBLIC_FACEBOOK_ACCESS_TOKEN;
    const apiEndpoint = `https://graph.facebook.com/v18.0/me/posts?access_token=${accessToken}`;

    let allPosts: FacebookPost[] = [];
    let next = apiEndpoint;

    while (next) {
      const response = await axios.get(next, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      const { data, paging } = response.data as {
        data: FacebookPost[];
        paging: { next: string };
      };
      allPosts = allPosts.concat(data);
      next = paging && paging.next;

      if (!next) {
        break;
      }
    }

    return allPosts;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      const axiosError = error as AxiosError;
      if (axiosError.response) {
        console.error("Response Error: ", axiosError.response.data);
      } else if (axiosError.request) {
        console.error("Request Error: ", axiosError.request);
      } else {
        console.error("Setting Error: ", axiosError.message);
      }
      console.error("Axios Config: ", axiosError.config);
    } else {
      console.error("Unknown Error: ", error);
    }

    return []; // エラーが発生した場合、空の配列を返すか、適切なエラーハンドリングを行ってください。
  }
}
