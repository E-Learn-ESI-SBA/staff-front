'use client';
import Landing from "../components/landing";
import useAuth from "../hooks/auth/useAuth";
import { useUserStore } from "../store/user";
import { redirect, useRouter } from 'next/navigation';
import useAxios from "../hooks/axios/useAxios";
import { useEffect } from "react";



export default function Home() {
  const isAuth = useUserStore((state) => state.isAuth);
  const axiosInstance = useAxios();
  const router = useRouter();

  const testAuth = async () => {
    const res = await axiosInstance.get('api/auth-test/');
    const data = await res.data;
    console.log(data);
  }


  if (!isAuth) {
    router.replace('/auth');
  } else {
    testAuth();
  }

  const { logoutHandler } = useAuth();



  const user = useUserStore((state) => state.user);

  
  return (<main>
          <p>Logged in as {user.email}</p>
          <button
          onClick={logoutHandler}
          className=" bg-gray-800 text-white px-4 py-2 rounded-md mt-4"
          >Logout</button>
        </main>);

}
