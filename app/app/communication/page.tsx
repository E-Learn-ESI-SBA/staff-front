import Feed from "@/components/dashboard/student/communication/feed/page";
import { posts, suggestions } from "@/static/dummy-data/communication/posts";

export default function CommunityPage() {
  return (
    <div className="text-black">
      <Feed suggestions={suggestions} posts={posts} />
    </div>
  );
}
