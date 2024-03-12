'use client';
import Landing from "../components/landing";
import useAuth from "../hooks/auth/useAuth";
import { useUserStore } from "../store/user";
import { redirect } from 'next/navigation';



export default function Home() {
  const isAuth = useUserStore((state) => state.isAuth);


  if (!isAuth) {
    redirect('/auth');
  }

  const user = useUserStore((state) => state.user);


  const { logoutHandler } = useAuth(redirect);


  
  return (<main>
          <p>Logged in as {user.email}</p>
          <button
          onClick={logoutHandler}
          className=" bg-gray-800 text-white px-4 py-2 rounded-md mt-4"
          >Logout</button>
        </main>);

}
