import Image from "next/image"
import card from "@/types/card"

const Card = () => {
    return <div className="rounded-2xl h-fit p-4  bg-[#0066FF] text-white shadow-xl flex justify-between items-center " >
        <div className="flex items-center justify-start gap-4" >
      <div className="bg-g-crown bg-center relative bg-no-repeat bg-contain p-4 " >
    <p className="text-center" >1</p>
      </div>
      <div className="flex justify-start items-center gap-2" >
      <Image src='/landing/testimonials/person.png' alt='course picture' width={0} height={0} sizes='100vw' className='w-16 h-16 rounded-full border-4 border-transparent '  />
      <div className="flex flex-col" >
   <p>Suraj Khandwal</p>
   <p>Jaipur, Rajsthan</p>
      </div>
      </div>
        </div>
      <div className="flex justify-start items-center gap-2" >
        <div className="rounded-full flex items-center justify-center bg-[#2f80fa] p-2 " >
        <Image src='/dashboard/leaderboard/trophy.svg' alt='course picture' width={0} height={0} sizes='100vw' className='w-12 h-12  '  />
        </div>

      <div className="flex flex-col" >
   <p>₹9300</p>
   <p>Rewards</p>
      </div>
      </div>
      
  


    </div>
     }
    export default Card
    
    
    