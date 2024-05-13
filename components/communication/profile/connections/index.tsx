import Image from "next/image";
import SearchBar from "./searchbar";

type Props = {
  name: string;
  position: string;
  company: string;
  image: string;
};

const people: Props[] = [
  {
    name: "Hakim Maroc",
    position: "Senior Software Engineer",
    company: "Luxery",
    image: "/assets/teacher.jpeg",
  },
  {
    name: "Hakim Hakim",
    position: "Senior Software Engineer",
    company: "Meta",
    image: "/assets/teacher.jpeg",
  },
  {
    name: "Hakim Maroc",
    position: "Senior Software Engineer",
    company: "Google",
    image: "/assets/teacher.jpeg",
  },
  {
    name: "Hakim Maroc",
    position: "Senior Software Engineer",
    company: "apple",
    image: "/assets/teacher.jpeg",
  },
  {
    name: "Hakim Maroc",
    position: "Senior Software Engineer",
    company: "amazon",
    image: "/assets/teacher.jpeg",
  },
  {
    name: "Hakim Maroc",
    position: "Senior Software Engineer",
    company: "netflix",
    image: "/assets/teacher.jpeg",
  },
  {
    name: "Hakim Maroc",
    position: "Senior Software Engineer",
    company: "amazon",
    image: "/assets/teacher.jpeg",
  },
  {
    name: "Hakim Maroc",
    position: "Senior Software Engineer",
    company: "netflix",
    image: "/assets/teacher.jpeg",
  },
];

export default function Connections() {
  return (
    <div className="flex flex-col gap-8">
      <div className="flex justify-between items-center">
        <SearchBar />
        <p className="font-medium">All({people.length})</p>
      </div>
      <div className="flex gap-8 flex-wrap justify-center">
        {people.map((item, i) => (
          <div className="flex flex-col gap-2 items-center" key={i}>
            <Image
              src={item.image}
              alt="profile pic"
              width={0}
              height={0}
              sizes="100vw"
              className="w-20 h-20 rounded-full"
            />
            <p className="font-semibold text-xl ">{item.name} </p>
            <p>{item.position}</p>
            <p>
              {" "}
              at <span>{item.company} </span>{" "}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
