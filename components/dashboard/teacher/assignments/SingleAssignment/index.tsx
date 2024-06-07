import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Details from "./details";
import { AssignmentResultTable } from "./results";
import { ASSIGNMENT_BASE_URL } from "@/config/constants";



const SingleAssignment = async ({ assignment, submissions }: any) => {
  const tabs = ["Details", "Submission"];

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
            <AssignmentResultTable data={submissions} assignmentId={assignment.id}/>
          </TabsContent>
        </div>
      </Tabs>
    </div>
  );
};

export default SingleAssignment;
