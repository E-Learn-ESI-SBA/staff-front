import Image from "next/image";
import Link from "next/link";
import courseCategories from "@/static/content/courses";
const Courses = () => {
  return (
    <div className="my-16 py-8 mx-auto  w-full  text-white  h-fit  bg-[#4778EC] ">
      <p className="text-center font-semibold text-2xl">Courses Categories</p>
      <div className="grid gridview gap-8  max-w-screen-lg mx-auto py-8 px-2 relative">
        {courseCategories.map((category, index) => (
          <div
            key={index}
            className="flex justify-start items-center rounded-3xl border border-white py-2 pl-4 pr-16 gap-2 "
          >
            <div className={` bg-${category.bgColor} rounded-xl p-4`} style={{background : category.bgColor }} >
              {/* <div className={`bg-[${category.bgColor}] rounded-xl p-4`}> */}
              <Image
                src={category.icon}
                alt="category"
                width={0}
                height={0}
                sizes="100vw"
                className="h-10 w-10"
              />
            </div>
            <div className="flex flex-col justify-center gap-2 ">
              <p className="font-semibold text-lg">{category.year}</p>
              <p className="font-semibold text-lg">{category.cycle}</p>
              <p>{category.total} Courses</p>
            </div>
          </div>
        ))}
        <Image
          src="/landing/courses/cs.svg"
          alt="cs"
          width={0}
          height={0}
          sizes="100vw"
          className="h-10 w-10 sm:h-10 sm:w-10 absolute -top-8 left-4 opacity-25"
        />
        <Image
          src="/landing/courses/star.svg"
          alt="cs"
          width={0}
          height={0}
          sizes="100vw"
          className="h-10 w-10 sm:h-8 sm:w-8 absolute -top-2 right-2"
        />
      </div>
      <div className="flex items-center">
        <Link
          href="/courses"
          className="px-8 py-2 mx-auto font-medium border rounded-tl-3xl rounded-br-3xl"
        >
          Learn More
        </Link>
      </div>
    </div>
  );
};
export default Courses;
