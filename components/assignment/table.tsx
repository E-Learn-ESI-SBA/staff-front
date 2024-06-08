'use client'
import { IAssignment } from "@/types/assignment";
import { DataTable } from "../common/table";
import { CustomColumns } from "@/components/assignment/collomns";
import { useState } from "react";
import { ASSIGNMENT_BASE_URL, FRONT_BASE_URL } from "@/config/constants";
export function AssignmentTable({ show, assignments }: { show: Boolean, assignments: any }) {

  const [localAssignment, setLocalAssignment] = useState<any>(assignments);
  const deleteHandler = async (assignment: any) => {
    try {
      const res = await fetch(`${ASSIGNMENT_BASE_URL}/assignments/${assignment.id}`, {
        method: "DELETE",
        headers: {
          "Authorization": `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzE4NTUxMzk3LCJpYXQiOjE3MTU5NTkzOTcsImp0aSI6IjYxN2EwNDU3MzNiNDQxNDlhNjY5Y2ZmMjkzOGQ3ZWFlIiwiaWQiOiIyMjNlYmU5Yi1jMWMyLTQ5M2EtYTdiYS02OThhOTM1NjdkYmUiLCJhdmF0YXIiOiJkZWZhdWx0IiwidXNlcm5hbWUiOiJhZG1pbiIsImVtYWlsIjoiYWRtaW5AaG9zdC5jb20iLCJyb2xlIjoiYWRtaW4iLCJncm91cCI6Ik5vbmUiLCJ5ZWFyIjoiTm9uZSJ9.2UFOb8hOBkfnGpWHgkQdJcnbK6YwqbEtn9aIFA-FNBc`,
        }
      })
      if (res.ok) {
        console.log('fddf')
        //@ts-ignore
        setLocalAssignment(prevAssignment => prevAssignment.filter(a => a.id != assignment.id))
        return res.json()
      } else {
        return res.json()
      }

    } catch (err: any) {
      console.log(err.message)
      throw new Error(err.message)

    }
  }


  return (
    <>
      {show ?
        <DataTable<IAssignment>
          data={localAssignment}
          url={`${FRONT_BASE_URL}/app/student/assignment`}
          headers={
            [
              {
                accessorKey: "title",
                title: "Title",
              },
              {
                accessorKey: "module_id",
                title: "Module Name",
              },
              {
                accessorKey: "deadline",
                title: "deadline",
              },
              {
                accessorKey: "teacher_id",
                title: "Teacher",
              },
            ]
          }
          customColumns={[CustomColumns]}
          defaultFilter="title"
          fuzzyElements={["module_id"]}
        />

        :
        <DataTable<IAssignment>
          data={localAssignment}
          url='/app/teacher/assignment'
          deleteHandler={(assignment) => deleteHandler(assignment)}
          headers={
            [
              {
                accessorKey: "title",
                title: "Title",
              },
              {
                accessorKey: "module_id",
                title: "Module Name",
              },
              {
                accessorKey: "deadline",
                title: "deadline",
              },
            ]
          }
          customColumns={[CustomColumns]}
          defaultFilter="title"
          fuzzyElements={["module_id"]}
        />


      }


    </>
  );
}