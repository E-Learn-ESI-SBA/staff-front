import Image from "next/image";
import {useState} from "react";

type TData = {
    title: string;
    description: string;
    points: string[];
}
interface OverviewProps  {
    withEdit?: boolean;
    data :TData
 options?: {
            withEdit?: boolean;
            editHandler?: (data:TData) => void;
 }
};

export  const  Overview = ({withEdit,  data: {
    title, description, points
}
}: OverviewProps)  =>  {
     const [edit, setEdit] = useState(false);
     const OverviewComp = () => {
         return (
             <div className="w-full flex flex-col justify-center">
                 <div className="flex justify-between flex-wrap">
                     <h1 className="text-black text-lg xl:text-2xl lg:text-xl font-medium p-4">
                         {title}
                     </h1>
                     {withEdit && (
                         <button
                             className="bg-primary text-white rounded-3xl p-2"
                             onClick={() => setEdit(!edit)}
                         >
                             Edit
                         </button>
                     )}
                 </div>
                 <div className="text-text-GRAY rounded-3xl p-4">
                     <h5 className="text-secondary text-lg xl:text-3xl lg:text-xl font-medium my-4">
                         Description
                     </h5>
                     <p
                         className="min-h-96 p-8 text-xs sm:text-sm text-black rounded-3xl"
                         dangerouslySetInnerHTML={{__html: description}}
                     />
                 </div>
                 <div className="p-8 lg:p-12">
                     <div className="bg-white rounded-2xl p-6 flex flex-col gap-6">
                         <h5 className="text-secondary text-lg xl:text-3xl lg:text-xl font-medium">
                             What you will learn in this course :
                         </h5>
                         <div className="grid grid-cols-2  gap-4">
                             {points.map((p, i) => (
                                 <div className="flex items-center w-full   gap-1" key={i}>
                                     <Image
                                         src="/assets/icons/courses/check.svg"
                                         width={30}
                                         height={30}
                                         alt="overview"
                                     />
                                     <p className=" text-sm md:text-base ">{p}</p>
                                 </div>
                             ))}
                         </div>
                     </div>
                 </div>
             </div>
         )
     }
     return (
            <OverviewComp />
     );
 }
