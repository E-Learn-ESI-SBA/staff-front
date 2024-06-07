import Feed from "@/components/dashboard/student/communication/feed/page";
import { COMMUNICATION_BASE_URL, TEST_TOKEN } from "@/config/constants";
import { posts, suggestions } from "@/static/dummy-data/communication/posts";
import { cookies } from "next/headers";


const fetchPosts = async () => {
  try {
    const accessToken = cookies().get("accessToken");
    const response = await fetch(`${COMMUNICATION_BASE_URL}/posts?page=0&limit=2`, {
      method: 'GET',
      headers: {
        "Authorization": `Bearer ${accessToken?.value}`,
        "Content-Type": "application/json",
      },
      cache: 'no-store',
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
    return [];
  }
}

export default async function CommunityPage() {

  let data = await fetchPosts()
  data = data || posts; 

  return (
    <div className="text-black">
      <Feed suggestions={suggestions} posts={data} />
    </div>
  );
}
