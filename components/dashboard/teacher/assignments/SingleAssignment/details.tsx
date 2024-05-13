import Image from "next/image";

interface File {
  url: string;
  name: string;
}

interface QuizDetailsProps {
  title: string;
  date: string;
  subject: string;
  description: string;
  files?: File[];
}

const Details: React.FC<QuizDetailsProps> = ({
  title,
  date,
  subject,
  description,
  files,
}) => {
  return (
    <>
      <div className="flex flex-col gap-4 justify-start text-lg font-medium">
        <div className="flex items-start gap-4">
          <p className="font-semibold">{title}</p>
        </div>
        <div className="flex items-center gap-4">
          <p className="font-semibold">Assignment Schedule</p>
          <div className=" bg-[#ededf5] px-2 py-1 rounded-[10px] flex justify-between items-center gap-2 ">
            <Image
              src="/dashboard/quiz/calendar.svg"
              alt="calendar icon"
              width={0}
              height={0}
              sizes="100vw"
              className="w-4 h-4"
            />
            <p className="text-sm font-light">{date} </p>{" "}
          </div>
        </div>
        <div className="flex items-start gap-4">
          <p className="font-semibold">Subject : </p>
          <p>{subject} </p>
        </div>
        <div className="flex items-start  gap-4">
          <p className="font-semibold">Description: </p>
          <p className="max-w-[70ch]">{description} </p>
        </div>
        <table className="w-full border-collapse border border-gray-300 max-w-96 ">
          <thead>
            <tr>
              <th className="py-2 px-4 bg-gray-100 border border-gray-300">
                File Name
              </th>
              <th className="py-2 px-4 bg-gray-100 border border-gray-300">
                File URL
              </th>
            </tr>
          </thead>
          <tbody>
            {files.map((file, index) => (
              <tr key={index}>
                <td className="py-2 px-4 border border-gray-300">
                  {file.name}
                </td>
                <td className="py-2 px-4 border border-gray-300">
                  <a href={file.url} className="text-blue-500">
                    {file.url}
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Details;
