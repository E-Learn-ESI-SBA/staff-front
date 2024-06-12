import { PostProps } from "@/types/communication";
import PostDetails from "./post-details";
import { TPayload } from "@/types";
import PostImages from "./post-images";
import Votes from "./votes";
import PostSaveComponent from "./save";
import PostHeader from "./post-header";
import {fakeUser} from '@/static/dummy-data/communication/posts'

export default function Post({ data, user }: { data: PostProps, user: TPayload | null }) {

  return (
    <div className="text-black feed_border flex flex-row gap-6">
      <Votes
      upvotes_count={data.upvotes_count}
      downvotes_count={data.downvotes_count}
      postId={data.id}
      user={user}
      votes={data.votes}
      />
      <div className="flex flex-col gap-8 w-full">
        <PostHeader
        avatar={data.user?.avatar ?? fakeUser!.avatar }
        username={data.user?.username ?? fakeUser!.username }
        created_at={data.created_at}
        />
        <div className="flex flex-col gap-3">
          {/* caption section probably markdown */}
          {data.header && (<p className="font-bold text-lg">{data.header}</p>)}
          {data.text}
        </div>
        <div>
          {/* contains post's images (optional) */}
          <PostImages images={data.images}/>
        </div>
        <div className="flex flex-row justify-end font-semibold">
          {/* this section is for comments/share/save/more */}
          <div className="flex flex-row gap-6 items-center">
            <PostDetails data={data} user={user}/>
            <PostSaveComponent
              saved={data.isSaved}
              user={user}
              postId={data.id}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
