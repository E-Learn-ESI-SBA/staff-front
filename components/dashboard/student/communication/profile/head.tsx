import { Button } from "@/components/ui/button";
import Image from "next/image";
import React from "react";

type Props = {
  image: string;
  first_name: string;
  last_name: string;
  year: string;
  address: string;
  education: {
    school: string;
    location: string;
  };
  previous_education: {
    school: string;
    location: string;
  };
};
export const Head = ({
  image,
  first_name,
  last_name,
  year,
  address,
  education,
  previous_education,
}:Props) => {
  return (
    <div>
      <Image src={image} alt="head" width={1920} height={1080} />
      <div>
        <div className="flex flex-col">
          <h2>
            {first_name} {last_name}
          </h2>
          <p>{year} Student</p>
          <p>{address}</p>
        </div>
        <div className="flex">
          <Button>Connect</Button>
          <Button>Send a message</Button>
          <Button>Follow/Unfllow</Button>
        </div>
      </div>
    </div>
  );
};
