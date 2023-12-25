import axios, { AxiosError } from "axios";
import { FacebookPostType } from "../../type/facebookPostType";

export async function getAllFacebookPosts(): Promise<FacebookPostType[]> {
  try {
    const accessToken = process.env.NEXT_PUBLIC_FACEBOOK_ACCESS_TOKEN;
    const pageId = process.env.NEXT_PUBLIC_FACEBOOK_PAGE_ID;
    // const apiEndpoint = `https://graph.facebook.com/v18.0/me/posts?access_token=${accessToken}`;
    const apiEndpoint = `https://graph.facebook.com/v18.0/${pageId}/feed?fields=message,created_time,attachments{media,subattachments,image,src}`;
    let allPosts: FacebookPostType[] = [];
    let next = apiEndpoint;

    while (next) {
      const response = await axios.get(next, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      const { data, paging } = response.data as {
        data: FacebookPostType[];
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
    return [];
  }
}
