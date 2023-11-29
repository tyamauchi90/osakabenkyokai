export type FacebookPostType = {
  message: string;
  full_picture?: string;
  created_time: Date;
  attachments?: {
    data: Attachment[];
  };
  id: string;
};

type Attachment = {
  subattachments?: {
    data: SubAttachment[];
  };
  media?: {
    image: {
      src: string;
    };
  };
};

type SubAttachment = {
  media: {
    image: {
      src: string;
    };
  };
};
