import Image from "next/image";
const Testimonilas = () => {
    return (
        <div className="my-8 py-8 mx-auto bg-[#4778EC] text-white rounded-3xl h-fit w-11/12  flex max-md:flex-col  max-md:justify-center  items-center md:justify-between ">
            <div className="md:w-1/2 flex items-center justify-center " >
            <Image src='/landing/testimonials/rocket.svg' alt='cs' width={0} height={0} sizes='100vw' className=" h-3/4 w-3/4 "  />
            </div>

                    <div className="flex flex-col items-center justify-center gap-4 md:w-1/2" >
                     <p  className=" text-[#C4BBFF] ">Testimonials</p>
                     <p className="font-semibold" >what our students say?</p>
                     <div className="flex justify-between items-center gap-2" >
                     <Image src='/landing/testimonials/person.png' alt='cs' width={0} height={0} sizes='100vw' className=" h-10 w-10  sm:h-16 sm:w-16  border-4 border-[#C4BBFF] rounded-full "  />
                     <Image src='/landing/testimonials/person.png' alt='cs' width={0} height={0} sizes='100vw' className=" h-10 w-10  sm:h-16 sm:w-16  border-4 border-[#C4BBFF] rounded-full "  />
                     <Image src='/landing/testimonials/person.png' alt='cs' width={0} height={0} sizes='100vw' className=" h-10 w-10  sm:h-16 sm:w-16  border-4 border-[#C4BBFF] rounded-full "  />
                     <Image src='/landing/testimonials/person.png' alt='cs' width={0} height={0} sizes='100vw' className=" h-10 w-10  sm:h-16 sm:w-16  border-4 border-[#C4BBFF] rounded-full "  />
                     <Image src='/landing/testimonials/person.png' alt='cs' width={0} height={0} sizes='100vw' className=" h-10 w-10  sm:h-16 sm:w-16  border-4 border-[#C4BBFF] rounded-full "  />
                     </div>
                     <div className="flex flex-col gap-4 items-center justify-center" >
                     <p className="font-semibold text-lg" >Ramjan Ali Anik</p>
                     <p className="font-light" >Bostsolf.co</p>
                     <p className="font-light text-center" >One ipsum dolor sit amet, elit, sed do eiusmod tempor ut labore et
dolore magna aliqua. Quis ipsum ultrices gravida. Risus dolore
magna aliqua. Quis ipsum ultrices gravida.</p>
                     </div>
                    </div>
	</div>
    ) 
     }
export default Testimonilas;
    
    
    




