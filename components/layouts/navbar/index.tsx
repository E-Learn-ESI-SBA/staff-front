'use client'
import Image from "next/image"
import Link from "next/link"
import { Links } from "@/static/content/navbar"
import { usePathname } from 'next/navigation'
const Navbar = () => {
  const path = usePathname();
  const isActiveLink = (url:string) => {
    return path.substring(1).toLowerCase().replace(/[^a-z]/g, '') === url.substring(1).toLowerCase() ;
  };
    return <div className={`w-full px-8  `}  >
      <div className={`flex justify-between items-center py-4  ${path.substring(1) ? 'text-courses-main' :  'text-white  border-white border-b border-dashed '  } `} >
     {/* <Image src='' alt='logo' width={0} height={0} sizes="100vw" className="h-12 w-24" /> */}
     <p className="text-2xl font-extrabold" >Madaurus</p>
     <div className="flex justify-between items-center gap-4 " >
      {Links.map((link, index) => (
        <Link key={index} href={link.url}  className={`${isActiveLink(link.url) ? 'font-semibold' : ''}`}>
          {link.name}
        </Link>
  ))}
     </div>
     <Link href='login' className={`px-8 py-2 font-medium border rounded-tl-3xl rounded-br-3xl   ${path.substring(1) ? 'border-courses-main' :  ''  } `}  >
      Login
     </Link>        
      </div>
          </div>
     }
    
    export default Navbar
    
    
    