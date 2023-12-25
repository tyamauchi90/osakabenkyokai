import axios from "axios";

const pageId = process.env.NEXT_PUBLIC_FACEBOOK_PAGE_ID;
const getFacebookPost = async (id: string) => {
  try {
    const response = await axios.get(
      `https://graph.facebook.com/v18.0/${pageId}/122096611946091221_122112095036091221`,
      // `https://graph.facebook.com/v18.0/${pageId}/${id}`,
      {
        params: {
          access_token: process.env.NEXT_PUBLIC_FACEBOOK_ACCESS_TOKEN,
          fields: "id,message,created_time,attachments{media,subattachments}",
        },
      }
    );

    if (response.status === 200) {
      return response.data;
    } else {
      console.error(`Error fetching post: ${response.status}`);
      return null;
    }
  } catch (error) {
    console.error(`Error fetching post: ${error}`);
    return null;
  }
};

export default getFacebookPost;
