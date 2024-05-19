import { assignments } from "@/static/dummy-data/assignment/assignment";
import { z } from "zod";
import { EQuizType, ECourseType } from ".";
import { AssignmentType } from "./assignment";

/* 
Start Zod Schema for Multi step form Quiz form

*/

const timeRegex = /^(?:2[0-3]|[01][0-9]):[0-5][0-9]$/;

export const examSchemaValidator = z.object({
  id: z.string().optional(),
  title: z
    .string()
    .min(2, { message: "must be at least 2 characters long" }),
  image : z.string().optional(),
  file : z.any().optional(),
  instructions: z
    .string()
    .min(12, { message: "must be at least 12 characters long" }),
  module_id: z.nativeEnum(ECourseType).default(ECourseType.OOP),
  duration: z.coerce
    .number()
    .min(15, { message: "must be at least 15 minutes" }),
    max_score: z.coerce
    .number()
    .min(1, { message: "must be at least 1 point" }),
    min_score: z.coerce
    .number()
    .min(2, { message: "must be at least 2 points" }),
  question_count: z.coerce
    .number()
    .min(10, { message: "must be at least 10 questions" }),
  start_date: z.string(),
  end_date: z.string(),
});

export type TExamSchema = z.infer<typeof examSchemaValidator>;

export const QCMSchema = z.object({
  questions: z
    .array(
      z.object({
        body: z.string().min(3, "Question announcement is required"),
        score: z.coerce
        .number()
        .min(1, { message: "must be at least 1 point" })
        .default(30),
        image: z.string().default("").optional(),
        file : z.any(),
        options: z
          .array(
            z.object({
              option: z.string().min(3, "Answer is required"),
              validity: z.boolean().default(false),
              id : z.string(),
            }),
          )
          .min(3, "At least 3 answers must be provided")
          .refine((val) => {
            return val.filter((item) => item.validity).length > 0;
          }, "At least one answer must be selected"),
      }),
    )
    .min(3, "At least 3 questions must be provided"),
});

export type TQCMForm = z.infer<typeof QCMSchema>;

export const GradesSchema = z.object({
  grades: z
    .array(
      z.object({
        min: z.coerce
          .number()
          .min(0, "Minimum marks cannot be negative")
          .max(100, "Maximum marks cannot exceed 100"),

        max: z.coerce
          .number()
          .min(0, "Minimum marks cannot be negative")
          .max(100, "Maximum marks cannot exceed 100"),
        grade: z.string().min(1, "grade is required"),
        // note: z.string().min(5, "min 5 letters"),
      }),
    )
    .min(3, "At least 3 grades must be provided"),
});
export type TGradesForm = z.infer<typeof GradesSchema>;

/* 
End Zod Schema for Multi step form  

/* 
Start Zod Schema for Multi step Assignment form  

*/

export const assignmentSchemaValidator = z.object({
  id: z.string().optional(),
  assignment_title: z
    .string()
    .min(2, { message: "must be at least 2 characters long" }),
  assignment_description: z
    .string()
    .min(12, { message: "must be at least 12 characters long" }),
  assignment_type: z.nativeEnum(AssignmentType).default(AssignmentType.MANUAL),
  course: z.nativeEnum(ECourseType).default(ECourseType.OOP),
  start_date: z.date(),
  end_date: z.date(),
  start_time: z
    .string()
    .regex(timeRegex, { message: "invalid time format. Use HH:MM format." }),
  end_time: z
    .string()
    .regex(timeRegex, { message: "invalid time format. Use HH:MM format." }),
});

export type TAssignmentSchema = z.infer<typeof assignmentSchemaValidator>;

/* Module Form Validator */

export const moduleSchemaValidator = z.object({
  id: z.string().optional(),
  title: z.string().min(2, { message: "must be at least 2 characters long" }),
  description: z
    .string()
    .min(12, { message: "must be at least 12 characters long" }),
  points: z.array(
    z.object({
      value: z.string().min(3, { message: "must be at least 3 points" }),
    }),
  ),
});
export type TModuleSchema = z.infer<typeof moduleSchemaValidator>;




