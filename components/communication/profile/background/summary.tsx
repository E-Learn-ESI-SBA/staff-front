import { NotebookText } from "lucide-react";

type Props = {
  description: string;
};

const summary: Props = {
  description:
    "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
};

export default function Summary({data}:{data ?: string}) {
  console.log('ss',data)
  // export default function Summary({description}: Props) {
  return (
    <div>
      <div className="flex justify-start gap-2 items-center">
        <NotebookText />
        <h1 className="text-[#121212] font-medium text-xl  ">Summary</h1>
      </div>
      <p className=" text-[#807E7E] p-2">{data}</p>
    </div>
  );
}
