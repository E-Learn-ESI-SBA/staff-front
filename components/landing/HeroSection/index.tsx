import Image from "next/image";
import Link from "next/link";
const HeroSection = () => {
    return (
      <div className="my-8 pt-8 mx-auto  w-full max-w-screen-lg text-white  flex flex-col items-center justify-center gap-8 relative">
   <p className='text-3xl font-bold' >Madaurus ESI-SBA</p>
   <p className='text-lg ' >Online educational platform of the Higher School of Computer Science of Sidi Bel-Abbés</p>
   <div className='relative w-full flex items-center justify-center' >
   <Link href="/" className="px-8 py-2 mx-auto font-medium border rounded-tr-3xl rounded-bl-3xl opacity-50">
          Join Madaurus
        </Link>
        {/* <Image src="/landing/heroSection/rocket.svg" alt="cs" width={0} height={0} sizes="100vw" className="h-24 w-32 sm:h-10 sm:w-10 absolute -bottom-4 left-[30%]" />
        <Image src="/landing/heroSection/rocket.svg" alt="cs" width={0} height={0} sizes="100vw" className="h-24 w-32 sm:h-10 sm:w-10 absolute -bottom-16 right-4 " />
        <Image src="/landing/heroSection/rocket.svg" alt="cs" width={0} height={0} sizes="100vw" className="h-24 w-32 sm:h-10 sm:w-10 absolute bottom-0 left-[10%]" /> */}
    </div>

        <Image src="/landing/heroSection/rocket.svg" alt="cs" width={0} height={0} sizes="100vw" className="h-24 w-32 sm:h-96 sm:w-96 " />

    </div>
    ) 
     }
export default HeroSection;
    
    
    




