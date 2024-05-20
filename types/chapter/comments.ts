import { z } from "zod";

export interface Comment {
  id?: string;
  content: string;
  user_id: string;
  course_id: string;
  is_edited: boolean;
  created_at: Date;
  updated_at: Date;
  replays?: Reply[];
  user: LightUser;
}

export interface Reply {
  id?: string;
  content: string;
  user_id: string;
  is_edited: boolean;
  created_at: Date;
  updated_at: Date;
  user: LightUser;
}

export interface LightUser {
  userId: string;
  avatar: string;
  email: string;
  group: string;
  role: string;
  username: string;
  id?: string;
}

export const CommentSchema = z.object({
  id: z.string().optional(),
  content: z.string(),
  course_id: z.string().optional(),
});
export type TCommentForm = z.infer<typeof CommentSchema>;
