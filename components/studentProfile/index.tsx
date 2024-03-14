'use client'
import Image from "next/image";
import { useState } from "react";
import Quizzes from "./quizzes";
import General from "./general";
const Profile = () => {
const [selected,setSelected] = useState(0)
    return (    
        <div className="bg-blue-500 min-h-screen p-8" >
      <div className="my-4 py-4 mx-auto bg-white rounded-3xl h-fit  ">
<div className="border-b-2 px-8 border-[#F4F5F7] flex justify-start items-center gap-x-8  " >
<a className={selected ? '': 'selected' }  onClick={ () => setSelected(0)} >General</a>
<a className={selected ? 'selected': '' } onClick={ () => setSelected(1)} >Quizzes</a>
</div>

{selected ? <Quizzes/> : <General/> }

    </div>
    </div>
    ) 
     }
export default Profile;
    
    
    




