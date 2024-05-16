import { Overview } from "@/components/courses/overview";
import { moduleData } from "@/static/dummy-data/modules/chapter";

export default function page() {
  const data = moduleData;
  return (
    <div className="bg-secondary-background h-lvh">
      <Overview
        data={{
          title: data.name,
          description: data.description,
          points: data.plan,
        }}
        withEdit={false}
      />
    </div>
  );
}
