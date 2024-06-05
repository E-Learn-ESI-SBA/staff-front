import { Chapter, Module } from "@/types/chapter/courses";

const chapters: Chapter[] = [
  {
    order: 1,
    name: "Introduction to Programming",
    description:
      "Learn the basics of programming and computer science concepts",
    sections: [
      {
        name: "Variables and Data Types",
        teacher_id: "teacher1",
        videos: [
          {
            url: "https://example.com/videos/variables.mp4",
            name: "Variables and Data Types",
            id: "video1",
            teacher_id: "teacher1",
            groups: ["group1"],
          },
        ],
        lectures: [
          {
            content: "Variables are used to store data in a program...",
            name: "Variables and Data Types Lecture",
            id: "lecture1",
            teacher_id: "teacher1",
            groups: ["group1"],
          },
        ],
        files: [
          {
            url: "https://example.com/files/variables.pdf",
            type: "application/pdf",
            name: "Variables and Data Types PDF",
            id: "file1",
            teacher_id: "teacher1",
            groups: ["group1"],
          },
        ],
        notes: [
          {
            content: "Variables are containers for storing data values...",
            name: "Variables and Data Types Notes",
            id: "note1",
          },
        ],
      },
    ],
  },
  {
    order: 2,
    name: "Control Structures",
    description: "Learn about control structures like loops and conditionals",
    sections: [
      {
        name: "Loops",
        teacher_id: "teacher2",
        videos: [
          {
            url: "https://example.com/videos/loops.mp4",
            name: "Loops",
            id: "video2",
            teacher_id: "teacher2",
            groups: ["group2"],
          },
        ],
        lectures: [],
        files: [],
        notes: [
          {
            content:
              "Loops are used to repeat a block of code multiple times...",
            name: "Loops Notes",
            id: "note2",
          },
        ],
      },
    ],
  },
  {
    order: 1,
    name: "Introduction to Programming",
    description:
      "Learn the basics of programming and computer science concepts",
    sections: [
      {
        name: "Variables and Data Types",
        teacher_id: "teacher1",
        videos: [
          {
            url: "https://example.com/videos/variables.mp4",
            name: "Variables and Data Types",
            id: "video1",
            teacher_id: "teacher1",
            groups: ["group1"],
          },
        ],
        lectures: [
          {
            content: "Variables are used to store data in a program...",
            name: "Variables and Data Types Lecture",
            id: "lecture1",
            teacher_id: "teacher1",
            groups: ["group1"],
          },
        ],
        files: [
          {
            url: "https://example.com/files/variables.pdf",
            type: "application/pdf",
            name: "Variables and Data Types PDF",
            id: "file1",
            teacher_id: "teacher1",
            groups: ["group1"],
          },
        ],
        notes: [
          {
            content: "Variables are containers for storing data values...",
            name: "Variables and Data Types Notes",
            id: "note1",
          },
        ],
      },
    ],
  },
  {
    order: 2,
    name: "Control Structures",
    description: "Learn about control structures like loops and conditionals",
    sections: [
      {
        name: "Loops",
        teacher_id: "teacher2",
        videos: [
          {
            url: "https://example.com/videos/loops.mp4",
            name: "Loops",
            id: "video2",
            teacher_id: "teacher2",
            groups: ["group2"],
          },
        ],
        lectures: [],
        files: [],
        notes: [
          {
            content:
              "Loops are used to repeat a block of code multiple times...",
            name: "Loops Notes",
            id: "note2",
          },
        ],
      },
    ],
  },
  {
    order: 2,
    name: "Introduction to Programming",
    description:
      "Learn the basics of programming and computer science concepts",
    sections: [
      {
        name: "Variables and Data Types",
        teacher_id: "teacher1",
        videos: [
          {
            url: "https://example.com/videos/variables.mp4",
            name: "Variables and Data Types",
            id: "video1",
            teacher_id: "teacher1",
            groups: ["group1"],
          },
        ],
        lectures: [
          {
            content: "Variables are used to store data in a program...",
            name: "Variables and Data Types Lecture",
            id: "lecture1",
            teacher_id: "teacher1",
            groups: ["group1"],
          },
        ],
        files: [
          {
            url: "https://example.com/files/variables.pdf",
            type: "application/pdf",
            name: "Variables and Data Types PDF",
            id: "file1",
            teacher_id: "teacher1",
            groups: ["group1"],
          },
        ],
        notes: [
          {
            content: "Variables are containers for storing data values...",
            name: "Variables and Data Types Notes",
            id: "note1",
          },
        ],
      },
    ],
  },
  {
    order: 3,
    name: "Control Structures",
    description: "Learn about control structures like loops and conditionals",
    sections: [
      {
        name: "Loops",
        teacher_id: "teacher2",
        videos: [
          {
            url: "https://example.com/videos/loops.mp4",
            name: "Loops",
            id: "video2",
            teacher_id: "teacher2",
            groups: ["group2"],
          },
        ],
        lectures: [],
        files: [],
        notes: [
          {
            content:
              "Loops are used to repeat a block of code multiple times...",
            name: "Loops Notes",
            id: "note2",
          },
        ],
      },
    ],
  },
];
export const moduleData: Module = {
  name: "Module 1",
  id: "1",
  courses: chapters,
  teacher_id: "1",
  description: "This is the description of the module",
  coefficient: 1,
  image: "https://example.com/image.jpg",
  instructors: ["1"],
  isPublic: true,
  plan: ["Plan 1", "Plan 2", "Plan 3", "Plan 4"],
  semester: 1,
  speciality: "Speciality 1",
  year: "2021",
  createdAt: new Date(),
  updatedAt: new Date(),
};
