import {LinksTabs} from "@/components/teacher/courses/tabs";
import appRouter from "@/config/routes";

type Props= {
    params: {
        id:string
        videoId: string
    }
}
export default function VideoPage({params:{videoId,id}}:Props) {
    const path = appRouter.getPath("module")?.concat("/", id);
    const tabs = [
        {
            title: "Overview",
            path: path,
        },
        {
            title: "Resources",
            path: path.concat("/resources"),
        },
        {
            title: "Instructors",
            path: path.concat("/instructors"),
        },
        {
            title: "Discuss",
            path: path.concat("/discuss"),
        },
    ];
    return (
        <main className="w-full min-h-screen bg-secondary-background  p-4">
            <LinksTabs activePath={path?.concat("/resources")} tabs={tabs} />
            <div className="p-4 pt-12">
                Get your video
            </div>
        </main>
    )
}