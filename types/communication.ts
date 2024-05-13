export interface PostProps {
  id: string;
  body: string;
  img?: string;
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
