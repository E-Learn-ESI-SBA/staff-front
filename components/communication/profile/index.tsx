import React from "react";
import Header from "./header";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Background from "./background";
import Connections from "./connections";
import Followers from "./followers";
import Following from "./following";
import { Profile } from "@/types";
export default function ProfilePage({data} : {data: Profile}) {
  const tabs = ["Background", "Connections", "Followers", "Following"];
  return (
    <div className="flex flex-col gap-2 ">
      <Header />
      <div className="p-4  bg-[#F4F7FE] ">
        <Tabs
          defaultValue={tabs[0]}
          className="w-full border border-[#EAEAEA] bg-white min-h-screen   "
        >
          <TabsList className="grid grid-cols-4 p-4 relative  justify-center ">
            {tabs.map((t, i) => (
              <TabsTrigger
                value={t}
                className="text-text-GRAY  data-[state=active]:border-b-4 data-[state=active]:border-[#0BAACA] "
                key={i}
              >
                {" "}
                {t}
              </TabsTrigger>
            ))}
          </TabsList>
          <div className="p-4 pt-12">
            <TabsContent value="Background">
              <Background data={data}  />
            </TabsContent>
            <TabsContent value="Connections">
              <Connections />
            </TabsContent>
            <TabsContent value="Followers">
              <Followers />
            </TabsContent>
            <TabsContent value="Following">
              <Following />
            </TabsContent>
          </div>
        </Tabs>
      </div>
    </div>
  );
}
