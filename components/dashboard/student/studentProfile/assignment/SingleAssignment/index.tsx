import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Details from "./details";
import Submission from "./submission";
const SingleAssignment: React.FC = () => {
  const tabs = ["Details", "Submission"];
  const files = [
    {
      name: "example_file1.txt",
      url: "https://example.com/files/example_file1.txt",
    },
    {
      name: "example_file2.png",
      url: "https://example.com/files/example_file2.png",
    },
  ];
  return (
    <div className="p-4  bg-[#F4F7FE] ">
      <Tabs
        defaultValue={tabs[0]}
        className="w-full border border-[#EAEAEA] bg-white min-h-screen   "
      >
        <TabsList className="grid grid-cols-2 p-4 relative  justify-center  ">
          {tabs.map((t, i) => (
            <TabsTrigger
              value={t}
              className="text-text-GRAY bg-[#eeeff9] p-2 sm:px-16 rounded-sm  data-[state=active]:bg-[#3D70F5] data-[state=active]:text-white "
              key={i}
            >
              {" "}
              {t}
            </TabsTrigger>
          ))}
        </TabsList>
        <div className="p-4 pt-12">
          <TabsContent value="Details">
            <Details
              title="Articulate structure of C++ and Java in Semester 1"
              date="12-01-2023"
              subject="Networking"
              description="The objective of this assignment is to develop students' analytical skills by examining historical documents related to a specific topic or event. Students will engage with primary sources, analyze the content, and draw conclusions based on their understanding"
              files={files}
            />
          </TabsContent>
          <TabsContent value="Submission">
            <Submission />
          </TabsContent>
        </div>
      </Tabs>
    </div>
  );
};

export default SingleAssignment;
