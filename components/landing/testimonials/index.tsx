import { useState, useEffect } from "react";
import Image from "next/image";
import Card from "./card";
import { testimonialsData } from "@/static/content/testimonials";
import testimonials from "@/static/content/testimonials";

const Testimonilas = () => {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonial((prevIndex) => (prevIndex + 1) % testimonialsData.length);
    }, 5000); 

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="my-16 py-8 mx-auto bg-[#4778EC] text-white rounded-3xl h-fit w-11/12 flex max-md:flex-col max-md:justify-center items-center md:justify-between">
      <div className="md:w-1/2 flex items-center justify-center">
        <Image
          src={testimonials.bigImage}
          alt="cs"
          width={0}
          height={0}
          sizes="100vw"
          className="h-3/4 w-3/4"
        />
      </div>
      <div className="flex flex-col items-center justify-center gap-4 md:w-1/2 px-2">
        <p className="text-[#C4BBFF] font-medium text-xl">{testimonials.title}</p>
        <p className="font-semibold text-2xl">{testimonials.subTitle}</p>
        <div className="flex justify-between items-center gap-2">
          {testimonialsData.map((testimonial, index) => (
            <Image
              key={index}
              src={testimonial.image ?? ''}
              alt="cs"
              width={0}
              height={0}
              sizes="100vw"
              className={`aspect-square w-10 sm:w-16 border-4 border-[#C4BBFF] rounded-full ${
                currentTestimonial === index ? 'opacity-100' : 'opacity-50'
              }`}
            />
          ))}
        </div>
        <Card data={testimonialsData[currentTestimonial]} />
      </div>
    </div>
  );
};

export default Testimonilas;
