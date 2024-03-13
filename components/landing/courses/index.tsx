import Image from "next/image";
import Link from "next/link";
const Courses = () => {
    return (
        <div className="my-8 py-8 mx-auto flex flex-col items-center w-full  text-white  h-fit  bg-[#4778EC] ">
    <p className="text-center font-semibold text-2xl" >Courses Categories</p>
    <div className="grid gridview gap-8  max-w-screen-lg mx-auto my-8 " >
   <div className="flex justify-start items-center rounded-3xl border border-white py-2 pl-4 pr-16 gap-2 " >
   <div className="bg-[#DF385B] rounded-xl p-4" >
   <Image src='/landing/courses/category.svg' alt='cs' width={0} height={0} sizes='100vw' className=" h-10 w-10  sm:h-10 sm:w-10 "  />
   </div>
   <div className="flex flex-col justify-center gap-2 " >
<p className="font-semibold text-lg" >1 st year</p>
<p className="font-semibold text-lg">preparatory cycle</p>
<p>25 Courses</p>
   </div>
   </div>
   <div className="flex justify-start items-center rounded-3xl border border-white py-2 pl-4 pr-16 gap-2 " >
   <div className="bg-[#DF385B] rounded-xl p-4" >
   <Image src='/landing/courses/category.svg' alt='cs' width={0} height={0} sizes='100vw' className=" h-10 w-10  sm:h-10 sm:w-10 "  />
   </div>
   <div className="flex flex-col justify-center gap-2 " >
<p className="font-semibold text-lg" >1 st year</p>
<p className="font-semibold text-lg">preparatory cycle</p>
<p>25 Courses</p>
   </div>
   </div>
   <div className="flex justify-start items-center rounded-3xl border border-white py-2 pl-4 pr-16 gap-2 " >
   <div className="bg-[#DF385B] rounded-xl p-4" >
   <Image src='/landing/courses/category.svg' alt='cs' width={0} height={0} sizes='100vw' className=" h-10 w-10  sm:h-10 sm:w-10 "  />
   </div>
   <div className="flex flex-col justify-center gap-2 " >
<p className="font-semibold text-lg" >1 st year</p>
<p className="font-semibold text-lg">preparatory cycle</p>
<p>25 Courses</p>
   </div>
   </div>
   <div className="flex justify-start items-center rounded-3xl border border-white py-2 pl-4 pr-16 gap-2 " >
   <div className="bg-[#DF385B] rounded-xl p-4" >
   <Image src='/landing/courses/category.svg' alt='cs' width={0} height={0} sizes='100vw' className=" h-10 w-10  sm:h-10 sm:w-10 "  />
   </div>
   <div className="flex flex-col justify-center gap-2 " >
<p className="font-semibold text-lg" >1 st year</p>
<p className="font-semibold text-lg">preparatory cycle</p>
<p>25 Courses</p>
   </div>
   </div>
   <div className="flex justify-start items-center rounded-3xl border border-white py-2 pl-4 pr-16 gap-2 " >
   <div className="bg-[#DF385B] rounded-xl p-4" >
   <Image src='/landing/courses/category.svg' alt='cs' width={0} height={0} sizes='100vw' className=" h-10 w-10  sm:h-10 sm:w-10 "  />
   </div>
   <div className="flex flex-col justify-center gap-2 " >
<p className="font-semibold text-lg" >1 st year</p>
<p className="font-semibold text-lg">preparatory cycle</p>
<p>25 Courses</p>
   </div>
   </div>
   <div className="flex justify-start items-center rounded-3xl border border-white py-2 pl-4 pr-16 gap-2 " >
   <div className="bg-[#DF385B] rounded-xl p-4" >
   <Image src='/landing/courses/category.svg' alt='cs' width={0} height={0} sizes='100vw' className=" h-10 w-10  sm:h-10 sm:w-10 "  />
   </div>
   <div className="flex flex-col justify-center gap-2 " >
<p className="font-semibold text-lg" >1 st year</p>
<p className="font-semibold text-lg">preparatory cycle</p>
<p>25 Courses</p>
   </div>
   </div>


    </div>
    <Link href='' className='px-8 py-2 font-medium border rounded-tl-3xl rounded-br-3xl'  >
      Learn More
     </Link>  
	</div>
    ) 
     }
export default Courses;
    
    
    




