export interface PostProps {
  id: string;
  text: string;
  images: string[];
  header: string;
  upvotes_count: number;
  downvotes_count: number;
  comments_count: number;
  created_at: string;
  updated_at: string;
  votes: Vote[];
  isSaved: boolean;
  user: CommunicationUser;
}

export interface CommentLike {
  id: string;
  user: CommunicationUser;
}

export interface CommunicationUser {
  id: string;
  username: string;
  avatar: string;
  email: string;
}

export interface CommentProps {
  id: string;
  text: string;
  created_at: string;
  updated_at: string;
  user: CommunicationUser;
  likes: CommentLike[];
}

export interface Vote {
  id: string;
  vote: 'up' | 'down';
  user: {
    id: string;
  };
}

export interface PostsProps {
  data: PostProps[];
}

export interface PersonType {
  id: string;
  img?: string;
  username: string;
  summary?: string;
}

export interface SuggestionsProps {
  data: PersonType[];
}

export interface PersonProps {
  data: PersonType;
}