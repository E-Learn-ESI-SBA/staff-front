"use client";
import Image from "next/image";
import { useState } from "react";
import Quizzes from "./quizzes";
import General from "./general";
import { STAFF_BASE_URL } from "@/config/constants";
import { useUserStore } from "@/store/user";

const Profile = async () => {
  try {
    const state = useUserStore()
    const profile = await fetch(`${STAFF_BASE_URL}/api/students/${state?.user?.id}`,
      {
        headers: {
          Authorization: `Bearer ${state?.user?.accessToken}`,
        }
      }
    );
    console.log("profile start")
    console.log(profile)
    console.log("profile end")
  } catch (err: any) {
    console.log(err)
  }
  return (
    <div className="bg-blue-500 min-h-screen p-8">
      <div className="my-4 py-4 mx-auto bg-white rounded-3xl h-fit">
        {/* <General /> */}
        hello
      </div>
    </div>
  );
};
export default Profile;
