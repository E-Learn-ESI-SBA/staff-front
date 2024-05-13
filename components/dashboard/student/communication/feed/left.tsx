import { PostProps } from "@/types/communication";
import CreatePost from "./create_post";
import Filter from "./filter";
import Posts from "./posts";


export default function Left({className, data}: {className?: string, data: PostProps[]}) {
    return (
        <div className={`text-black ${className}`}>
            <CreatePost />
            <Filter/>
            <Posts data={data}/>
        </div>
    );
}