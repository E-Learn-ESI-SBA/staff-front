import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import {
  AccordionOneContent,
  AccordionOneContentProps,
} from "./accordion-content";
import { AccordionContentProps } from "@radix-ui/react-accordion";
import { AccordionOneTitle } from "./accordion-title";
import { CourseInfosTtile, CourseInfosTtileProps } from "./course-infos";

type ContentType = {
  title: { title: string; count: number; time: string };
  content: AccordionOneContentProps[];
};
const info: CourseInfosTtileProps = {
  title:
    "Complete Website Responsive Design: from Figma to Webflow to Website Design",
  sections: 10,
  lectures: 20,
  time: "10h 30m",
};
const content: ContentType[] = [
  {
    title: {
      title: "Getting started",
      count: 70,
      time: "2h 30m",
    },
    content: [
      { type: "video", content: "What's webflow" },
      { type: "video", content: "Crash course about webflow" },
      { type: "lecture", content: "Read the docs" },
      { type: "video", content: "Test video" },
      { type: "lecture", content: "Introduction to HTML" },
      { type: "video", content: "Introduction to CSS" },
      { type: "lecture", content: "Basic JavaScript concepts" },
      { type: "video", content: "Responsive design fundamentals" },
    ],
  },
  {
    title: {
      title: "Secrets of good design",
      count: 80,
      time: "2h 30m",
    },
    content: [
      { type: "lecture", content: "Introduction to design principles" },
      { type: "video", content: "Color theory basics" },
      { type: "lecture", content: "Typography essentials" },
      { type: "video", content: "Grid layout techniques" },
      { type: "lecture", content: "User experience fundamentals" },
      { type: "video", content: "Interaction design principles" },
      { type: "lecture", content: "Visual hierarchy concepts" },
      { type: "video", content: "Accessibility guidelines" },
      { type: "lecture", content: "Responsive design best practices" },
      { type: "video", content: "Introduction to Adobe XD" },
    ],
  },
  {
    title: {
      title: "Advanced topics",
      count: 10,
      time: "2h 30m",
    },
    content: [
      { type: "lecture", content: "Advanced CSS techniques" },
      { type: "video", content: "Animation principles" },
      { type: "lecture", content: "JavaScript frameworks overview" },
      { type: "video", content: "SASS preprocessor guide" },
      { type: "lecture", content: "Introduction to React.js" },
      { type: "video", content: "State management with Redux" },
      { type: "lecture", content: "Node.js and Express fundamentals" },
      { type: "video", content: "Database design basics" },
      { type: "lecture", content: "RESTful API development" },
      { type: "video", content: "Authentication and authorization techniques" },
    ],
  },
];

export default function ResourcesAccordion() {
  return (
    <div>
      <CourseInfosTtile {...info} />
      <div className="bg-white mx-8 p-8 rounded-2xl my-4">
        <Accordion
          type="single"
          collapsible
          className="w-full text-black px-14"
        >
          {content.map((item, index) => (
            <AccordionItem key={index} value={`item-${index}`}>
              <AccordionTrigger
                dir="rtl"
                className="hover:no-underline hover:text-primary"
              >
                <AccordionOneTitle {...item.title} />
              </AccordionTrigger>
              <AccordionContent>
                <div className="flex gap-6 flex-col ml-12 my-4">
                  {item.content.map((content, index) => (
                    <AccordionOneContent key={index} {...content} />
                  ))}
                </div>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </div>
  );
}
