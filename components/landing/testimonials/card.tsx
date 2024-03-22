import { Testimonial } from "@/types/testimonials";

interface CardProps {
  data: Testimonial;
}
const Card: React.FC<CardProps> = ({ data }) => {
  return (
    <div className="flex flex-col gap-4 items-center justify-center">
      <p className="font-semibold text-lg">{data.name} </p>
      <p className="font-light">{data.role} </p>
      <p className="font-light text-center">{data.review}</p>
    </div>
  );
};
export default Card;
