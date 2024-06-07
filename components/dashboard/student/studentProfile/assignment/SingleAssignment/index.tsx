import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Details from "./details";
import Submission from "./submission";
const SingleAssignment = ({ assignment, submission }: any) => {
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
              title={assignment.title}
              date={assignment.deadline}
              subject={assignment.module_id}
              description={assignment.description}
              file={assignment.file}
            />
          </TabsContent>
          <TabsContent value="Submission">
            <Submission submission={submission} />
          </TabsContent>
        </div>
      </Tabs>
    </div>
  );
};

export default SingleAssignment;
