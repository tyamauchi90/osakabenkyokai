import axios, { AxiosError } from "axios";
import { NextRequest, NextResponse } from "next/server";
import type { FacebookPostType } from "../../../../type/facebookPostType";

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = params.id;
    const fetchPost = async (id: string) => {
      const accessToken = process.env.NEXT_PUBLIC_FACEBOOK_ACCESS_TOKEN;
      const pageId = process.env.NEXT_PUBLIC_FACEBOOK_PAGE_ID;
      const apiEndpoint = `https://graph.facebook.com/v18.0/${pageId}/${id}/feed?fields=message,created_time,attachments{media,subattachments,image,src}`;
      // const apiEndpoint = `https://graph.facebook.com/v18.0/${id}/feed?fields=message,created_time,attachments{media,subattachments,image,src}`;

      const response = await axios.get(apiEndpoint, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      const post = response.data as FacebookPostType;
      return post;
    };

    // URLのパスを取得し、'/'で分割して最後の部分をIDとして使用します
    // const id = req.nextUrl.pathname.split("/circle/blog/api/").pop() as string;
    console.log(id);
    const post = await fetchPost(id);

    if (post) {
      return NextResponse.json(post);
    } else {
      return NextResponse.json({ error: "Post not found." });
    }
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
    return NextResponse.json({
      error: "An error occurred while fetching the post.",
    });
  }
}
