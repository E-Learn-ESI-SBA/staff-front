import Image from "next/image";
const Profile = () => {
    return (    
        <div className="bg-blue-500 min-h-screen p-8" >
      <div className="my-4 py-4 mx-auto bg-white rounded-3xl h-fit  ">
<div className="border-b-2 px-8 border-[#F4F5F7] flex justify-start items-center gap-x-8  " >
<p className="border-b-2 -mb-[2px] border-blue-500 text-blue-500 " >General</p>
<p className="text-[#718EBF]" >Quizzes</p>
</div>
<div className="flex flex-col justify-center items-center gap-2 text-bold py-8" >
<Image src='/landing/testimonials/person.png' alt='cs' width={0} height={0} sizes='100vw' className=" h-24 w-24  sm:h-32 sm:w-32  border-8 border-t-[#0066FF] border-r-[#0066FF] border-b-[#CCCCCC4D] border-l-[#CCCCCC4D] rounded-full p-2 "  />
<p className="text-2xl text-center" >MAROC Abdelhakim Fouad</p>
<p className="text-lg" >1798 Points</p>
</div>
<div className="rounded-3xl  border-2 border-[#DADADA]  my-8 mx-1 flex flex-col px-1 items-center  md:grid md:grid-cols-2  xl:grid-cols-4 p-8  md:gap-x-4 gap-y-8  " >
<div className="flex flex-col items-start gap-4 col-span-2">
<p className="text-xl font-semibold text-[#3C3C3C] " >Personal Informations</p>   
<ul className="flex flex-col gap-4">
<li className="flex justify-start items-baseline gap-2" >
<p className="font-medium" >ID:</p>
<p> 302021</p>
</li>    
<li className="flex justify-start flex-wrap items-baseline gap-1" >
<p className="font-medium">Academic Year:</p>
<p>First year second cycle</p>
</li>    
<li className="flex justify-start items-baseline gap-2" >
<p className="font-medium">Gender:</p>
<p> Male</p>
</li>    
<li className="flex justify-start items-baseline gap-2" >
<p className="font-medium">Country:</p>
<p> Algeria</p>
</li>    
<li className="flex justify-start items-baseline gap-2" >
<p className="font-medium">State:</p>
<p>Sidi Bel Abbés</p>
</li>    
<li className="flex justify-start items-baseline gap-2" >
<p className="font-medium">Adress:</p>
<p className="" >Plot no. 116, Lane number 4, Rathore nagar, Vaishali nagar , Jaipur</p>
</li>    
</ul> 
</div>
<div className="flex flex-col self-start gap-4 col-span-1" >
<p className="text-xl font-semibold text-[#3C3C3C] " >Student Contact</p>   
<ul className="flex flex-col gap-4">
<li className="flex justify-start items-center gap-2" >
<Image src='/dashboard/profile/phone.svg' alt='cs' width={0} height={0} sizes='100vw' className=" h-4 w-4  sm:h-6 sm:w-6  "  />
<p> 302021</p>
</li>    
<li className="flex justify-start items-center gap-1" >
<Image src='/dashboard/profile/email.svg' alt='cs' width={0} height={0} sizes='100vw' className=" h-4 w-4  sm:h-6 sm:w-6  "  />
<p className="text-[12px] ">hanumannagar.center@tipsg.in</p>
</li>       
</ul> 
</div>
<div className="flex flex-col self-start gap-4 col-span-1" >
<p className="text-xl font-semibold text-[#3C3C3C] ">Connexion Informations</p>   
<ul className="flex flex-col gap-4">
<li className="flex justify-start items-baseline gap-2" >
<p className="font-medium">First access:</p>
<p>17 Jan 2023</p>
</li>    
<li className="flex justify-start items-baseline gap-2" >
<p className="font-medium">Latest access:</p>
<p>27 Jan 2023</p>
</li>       
</ul> 
</div>

</div>
    </div>
    </div>
    ) 
     }
export default Profile;
    
    
    




