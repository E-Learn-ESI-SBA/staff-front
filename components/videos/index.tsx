"use client";
import { VideoFooter } from "@/components/videos/footer";
import ReactPlayer from "react-player";
import { Play } from "lucide-react";
import GridLoader from "@/components/icons/grid";
import { IError } from "@/types/errors";
import { useState } from "react";
import AlertError from "@/components/common/error";

type Props = {
  videoId: string;
};
export default function VideoSection({ videoId }: Props) {
  const [error, setError] = useState<IError | null>(null);
  return (
    <section className="flex flex-col gap-4 bg-white  rounded-2xl p-6">
      {!error ? (
        <ReactPlayer
          url="https://www.youtube.com/watch?v=7sDY4m8KNLc"
          controls={true}
          onEnded={() => console.log("Completed")}
          width="100%"
          height="720px"
          playIcon={<Play className="w-12 h-12 text-blue-origin" />}
          fallback={
            <div className="w-full h-full flex justify-center items-center">
              {" "}
              <GridLoader />{" "}
            </div>
          }
          onError={(e) => {
            console.error(e);
            setError(new IError(e));
          }}
          onReady={() => {
            setError(null);
          }}
        />
      ) : (
        <AlertError error={error} />
      )}
      <VideoFooter
        data={{
          views: 820,
          userId: "12",
          avatar: "/store/img.jpg",
          name: "Complete OOP Course ",
          username: "Ameri Ayoub",
        }}
      />
    </section>
  );
}
