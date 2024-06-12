import { PostProps } from "@/types/communication";
import CreatePost from "./create_post";
import Filter from "./filter";
import Posts from "./posts";
import { useUserStore } from "@/store/user";

export default function Left({
  className,
  data,
}: {
  className?: string;
  data: PostProps[];
}) {
  const { user } = useUserStore()
  return (
    <div className={`text-black ${className}`}>
      <CreatePost user={user!}/>
      <Filter />
      <Posts data={data} user={user}/>
    </div>
  );
}
