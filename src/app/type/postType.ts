import { Timestamp } from "firebase/firestore";

export type postType = {
  id: string;
  title?: string;
  content?: string;
  eventDate?: Timestamp;
  updated_at?: Timestamp;
};
