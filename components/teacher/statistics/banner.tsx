import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Progress } from "@radix-ui/react-progress";
import { Button } from "@/components/ui/button";
import ArrowDown from "@/components/icons/courses/arrowDown";

type Props = {
  image: string;
  username: string;
  email: string;
  data: {
    progress_percent: number;
    progress_steps: number;
    steps: number;
  };
};
export function Banner({ username, data, email, image }: Props) {
  return (
    <div className="flex gap-2 items-center bg-blue-origin p-4">
      <div className="flex gap-1 items-center">
        <Avatar className="w-14 h-14 rounded-xl">
          <AvatarImage src={image} alt={username} />
          <AvatarFallback>Dr</AvatarFallback>
        </Avatar>
        <div className="flex flex-col gap-1">
          <h4 className="text-lg font-semibold">{username}</h4>
          <p className="text-sm text-gray-400">{email}</p>
        </div>
      </div>
      <div className="flex gap-2 items-center flex-3 ">
        <p>
          {data.progress_steps}/{data.steps}
        </p>
        <Progress
          value={data.progress_percent}
          max={100}
          className="h-4 flex-1 rounded-none"
        />
        {data.progress_percent} % Completed
      </div>
      <div className="flex gap-1">
        <Button className="bg-blue-font-dark w-fit">Edit Biography</Button>
        <Button className="bg-transparent w-fit">
          <ArrowDown className="text-white w-6 h-6" />
        </Button>
      </div>
    </div>
  );
}
