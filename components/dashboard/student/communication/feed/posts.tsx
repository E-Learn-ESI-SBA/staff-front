import { PostProps, PostsProps } from "@/types/communication";
import Post from "./post";

export default function Posts({ data }: { data: PostProps[] }) {
  return (
    <div className="text-black">
      {data.map((post) => (
        <Post key={post.id} data={post} />
      ))}
    </div>
  );
}
