"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Links } from "@/static/content/navbar";
import { useUserStore } from "@/store/user";
import { UserNav } from "../header/user-menu";

const Navbar = () => {
  const isLoggedIn = useUserStore((state) => state.isAuth);
  const user = useUserStore((state) => state.user);
  const path = usePathname();
  const isActiveLink = (url: string) => {
    return (
      path
        .substring(1)
        .toLowerCase()
        .replace(/[^a-z]/g, "") === url.substring(1).toLowerCase()
    );
  };
  return (
    <div className={`w-full px-4 md:px-8`}>
      <div
        className={`flex justify-between items-center py-4 border-b-2  border-dashed  ${path.substring(1) ? "text-modules-main border-modules-main  " : "text-white  border-white  "} `}
      >
        {/* <Image src='' alt='logo' width={0} height={0} sizes="100vw" className="h-12 w-24" /> */}
        <p className=" text-lg sm:text-2xl font-extrabold">Madaurus</p>
        <div className="flex justify-between items-center gap-4 ">
          {Links.map((link, index) => (
            <Link
              key={index}
              href={link.url}
              className={` max-sm:text-sm ${isActiveLink(link.url) ? "font-bold" : ""}`}
            >
              {link.name}
            </Link>
          ))}
          {isLoggedIn && <Link href={user?.role === "teacher" ? "/app/teacher" : "/app/student"}
          className="font-bold underline underline-offset-8">
            Dashboard
            </Link>}
        </div>
        {isLoggedIn ? <UserNav /> : <Link href="/auth"
          className={` max-sm:text-sm px-8 py-2 font-medium border rounded-tl-3xl rounded-br-3xl ${path.substring(1) ? "border-modules-main" : ""}`}>
          Login
        </Link>}
      </div>
    </div>
  );
};

export default Navbar;
