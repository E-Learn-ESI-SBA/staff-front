'use client';
import { PostProps } from "@/types/communication";
import Post from "./post";
import InfiniteScroll from "react-infinite-scroll-component";
import { useState } from "react";
import { COMMUNICATION_BASE_URL, TEST_TOKEN } from "@/config/constants";
import GridLoader from "@/components/icons/grid";
import { TPayload } from "@/types";


export default function Posts({ data, user }: { data: PostProps[], user: TPayload | null}) {
  const [posts, setPosts] = useState<PostProps[]>(data);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const [cursor, setCursor] = useState<{page: number, limit: number}>({page: 0, limit: 2});
  const refreshFunction = async () => {
    try {
      const response = await fetch(`${COMMUNICATION_BASE_URL}/posts?page=0?limit=2`, {
        method: 'GET',
        headers: {
        "Authorization": `Bearer ${user?.accessToken}`,
        },
        cache: 'no-store',
      });
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
       const data = await response.json();
      return data;

    } catch (error) {
      console.log(error);
      return [];
    }
  }

  const next = async () => {
    try {
      // sleep 1s
      await new Promise((resolve) => setTimeout(resolve, 1000));
      const response = await fetch(`${COMMUNICATION_BASE_URL}/posts?page=${cursor.page+1}&limit=${cursor.limit}`, {
        method: 'GET',
        headers: {
          "Authorization": `Bearer ${user?.accessToken}`,
        },
        cache: 'no-store',
        // disable cache in fetch
      });
      const data = await response.json();
      if (data.length === 0) {
        setHasMore(false);
        return;
      }
      setPosts([...posts, ...data]);
      setCursor({...cursor, page: cursor.page+1});
    } catch (error) {
      console.log(error);
      return [];
    }
  }

  return (
    <div className="text-black">
      <InfiniteScroll
        dataLength={posts.length} //This is important field to render the next data
        next={next}
        hasMore={hasMore}
        loader={(
          <div className="flex justify-center items-center h-20">
            <GridLoader />
          </div>
        )}
        endMessage={
          <p style={{textAlign: 'center'}}>
            <b>No more posts</b>
          </p>
        }
        // below props only if you need pull down functionality
        refreshFunction={refreshFunction}
      >
        {posts.map((post) => (
          <Post key={post.id} data={post} user={user}/>
        ))}
      </InfiniteScroll>
    </div>
  );
}
