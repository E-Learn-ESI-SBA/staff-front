'use client'
import Card from "@/components/dashboard/student/home/card";
import MsgBox from "@/components/dashboard/student/home/msgBox";
import TrialClass from "@/components/dashboard/student/home/trialClass";
import UpcommingCard from "@/components/dashboard/student/home/upcommingCard";
import { IAssignment } from "@/types/assignment";
import { toast } from "sonner";
import { Assignment } from "@/types";
import { getAssignmentsWithSoonestDeadlines } from "@/app/actions";
import { useState } from "react";


type Object = [string, string];


export default function QuizTable() {
  // console.log(user?.role)
  // console.log(user?.accessToken)
  // const [assignments, setAssignments] = useState<Object[]>()
  // try {
  //   const assignments: [string, string][] = await getAssignmentsWithSoonestDeadlines();
  //   setAssignments(assignments)
  // } catch (err) {
  //   console.error(err);
  // }
  // const getAssignmentsWithSoonestDeadlines = async () => {
  //   console.log("ziziz")
  //   try {
  //     const res = await fetch(`${ASSIGNMENT_BASE_URL}assignments`, {
  //       headers: {
  //         Authorization: `Bearer ${user?.accessToken}`,
  //       },
  //     });
  //     const response = await res.json();

  //     if (!response.message) {
  //       return []
  //     }
  //     const sortedAssignments = response.message.sort((a: { deadline: string }, b: { deadline: string }) => {
  //       const deadlineA: number = new Date(a.deadline).getTime();
  //       const deadlineB: number = new Date(b.deadline).getTime();
  //       return deadlineA - deadlineB;
  //     });

  //     const numAssignments = sortedAssignments.length;
  //     let assignmentsA = [];

  //     if (numAssignments <= 2) {
  //       assignmentsA = sortedAssignments;
  //     } else {
  //       assignmentsA = sortedAssignments.slice(0, 3);
  //     }
  //     let assignments: [string, string][] = response.map((assignment: Assignment) => ({
  //       title: assignment.title,
  //       deadline: assignment.deadline,
  //     }));
  //     setAssignments(assignments)
  //   } catch (error) {
  //     setTimeout(() => {
  //       toast.error("Failed to fetch assignments",
  //         {
  //           style: {
  //             backgroundColor: "red",
  //             color: "white",
  //           },
  //         });
  //     }, 1000)
  //     console.log("err in function calling")
  //     throw new Error("Failed to fetch assignments");
  //   }
  // };

  const assignments: [string, string][] = [
    ["Lorem epsssss", "12:00 PM"],
    ["Lorem epsssss", "12:00 PM"],
    ["Lorem epsssss", "12:00 PM"],
  ];


  const quizzes: [string, string][] = [
    ["Lorem epsssss", "12:00 PM"],
    ["Lorem epsssss", "12:00 PM"],
    ["Lorem epsssss", "12:00 PM"],
  ];
  // try {


  //   setAssignments(assignments);
  // } catch (err) {
  //   console.error(err);
  //   setTimeout(() => {
  //   toast.error("Failed to fetch assignments",
  //     {
  //       style: {
  //         backgroundColor: "red",
  //         color: "white",
  //       },
  //     });
  //   },1000)
  // }

  // useEffect(() => {
  //   ;
  // }, []);

  return (
    <div className="bg-secondary-background lg:h-screen">
      <div className="flex justify-between mt-4">
        <div className="w-full lg:w-2/3">
          <div className="px-4">
            <div className="flex justify-between my-4">
              <Card
                title="Learning Time"
                value="2h 37m"
                icon="time"
              />
              <Card
                title="My activities"
                value="21 Tasks"
                icon="activity"
              />
            </div>
            <div className="flex flex-col gap-4">
              <TrialClass
                src="/assets/course.jpeg"
                title="Learn Python in 30 days"
                description="Time to become advance then others with this course"
                />
              <TrialClass
                src="/assets/ninja.png"
                title="Learn Web Development with netninja"
                description="Time to become advance then others with this course" 
              />
            </div>
          </div>
        </div>
        <div className="w-full lg:w-1/3 right">
          <MsgBox />
          {assignments && (
            <UpcommingCard
              title="Upcoming Assignments"
              points={assignments}
            />
          )}
          <UpcommingCard title="Upcoming Quizzes" points={quizzes} />
          <div className=""></div>
        </div>
      </div>
    </div>
  );
}
