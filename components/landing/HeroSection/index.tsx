import Image from "next/image";
import Link from "next/link";
const HeroSection = () => {
  return (
    <div className="grid grid-cols-5  sm:grid-cols-4  my-8 pt-8 px-4 mx-auto  w-full max-w-screen-lg text-white   relative">
      <div className="col-span-1 border-l-4 border-t-4 border-b-4 h-3/4 sm:h-2/3 border-dashed opacity-50 relative">
        <div className="absolute -top-2 right-0 h-2 w-2/3 bg-[#002979]"></div>
        <Image
          src="/landing/heroSection/icon1.svg"
          alt="cs"
          width={0}
          height={0}
          sizes="100vw"
          className="  absolute h-12 w-12 top-[30%] left-8 "
        />
        <Image
          src="/landing/heroSection/icon2.svg"
          alt="cs"
          width={0}
          height={0}
          sizes="100vw"
          className=" absolute h-16 w-16 top-[50%] right-4 "
        />
      </div>
      <div className="flex flex-col items-center justify-center gap-8  col-span-3 sm:col-span-2 ">
        <div className="flex flex-col text-center gap-4 sm:gap-12">
          <p className="text-lg sm:text-3xl font-bold -mt-4   ">
            Madaurus ESI-SBA
          </p>
          <p className="text-sm sm:text-lg ">
            Online educational platform of the Higher School of Computer Science
            of Sidi Bel-Abbés
          </p>
          <div className="relative w-full flex items-center justify-center">
            <Link
              href="/"
              className=" max-sm:text-sm px-4 sm:px-8 py-2 mx-auto font-medium border rounded-tr-3xl rounded-bl-3xl opacity-50"
            >
              Join Madaurus
            </Link>
          </div>
        </div>
        <Image
          src="/landing/heroSection/rocket.svg"
          alt="cs"
          width={0}
          height={0}
          sizes="100vw"
          className="  w-full sm:h-[400px]  -mt-12   "
        />
      </div>
      <div className="col-span-1 border-r-4 border-t-4 border-b-4 rounded-br-[120px] border-dashed h-3/4 sm:h-2/3 opacity-50 relative">
        <div className="absolute -top-2 left-0 h-2 w-2/3 bg-[#002979]"></div>
        <Image
          src="/landing/heroSection/icon3.svg"
          alt="cs"
          width={0}
          height={0}
          sizes="100vw"
          className=" absolute h-16 w-16 top-[50%] right-4  "
        />
      </div>

      <Image
        src="/landing/heroSection/icon4.svg"
        alt="cs"
        width={0}
        height={0}
        sizes="100vw"
        className=" absolute h-8 w-8  bottom-8 left-4 "
      />
    </div>
  );
};
export default HeroSection;
