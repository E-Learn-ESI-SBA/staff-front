"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import link from "@/types/navbar";
type Props = {
  links: link[];
};
const Navbar = ({ links }: Props) => {
  const logoutHandler = () => {
    console.log("logout");
  };
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
    <div className={`w-full px-4 md:px-8  `}>
      <div
        className={`flex justify-between items-center py-4  ${path.substring(1) ? "text-modules-main" : "text-white  border-white border-b-2  border-dashed "} `}
      >
        {/* <Image src='' alt='logo' width={0} height={0} sizes="100vw" className="h-12 w-24" /> */}
        <p className="text-2xl font-extrabold">Madaurus</p>
        <div className="hidden sm:flex justify-between items-center gap-4 ">
          {links.map((link, index) => (
            <Link
              key={index}
              href={link.url}
              className={`${isActiveLink(link.url) ? "font-bold" : ""}`}
            >
              {link.name}
            </Link>
          ))}
        </div>

        <Button
          onClick={logoutHandler}
          className={`px-8 py-2 font-medium border rounded-tl-3xl rounded-br-3xl   ${path.substring(1) ? "border-modules-main" : ""} `}
        >
          Logout
        </Button>
      </div>
    </div>
  );
};

export default Navbar;
