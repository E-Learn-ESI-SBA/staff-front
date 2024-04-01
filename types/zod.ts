import { z } from "zod";
import {EQuizType,ECourseType } from ".";

/* 
Start Zod Schema for Multi step form  

*/

const timeRegex = /^(?:2[0-3]|[01][0-9]):[0-5][0-9]$/; 

export const examSchemaValidator = z.object({
  id: z.string().optional(),
  quiz_title: z.string().min(2, { message: "must be at least 2 characters long" }),
  quiz_instructions: z.string().min(12, { message: "must be at least 12 characters long" }),
  quiz_type: z.nativeEnum(EQuizType).default(EQuizType.DEVOIR),
  course: z.nativeEnum(ECourseType).default(ECourseType.OOP),
  quiz_duration: z.coerce
  .number()
  .min(15, { message: "must be at least 15 minutes" })
  .default(30),
  question_time_limit: z.coerce
    .number()
    .min(1, { message: "must be at least 1 minute" })
    .default(5),
  questions_count: z.coerce
    .number()
    .min(10, { message: "must be at least 10 questions" })
    .default(10),
  start_date: z.date(),
  end_date: z.date(),
  start_time: z.string().regex(timeRegex, { message: "invalid time format. Use HH:MM format." }),
  end_time: z.string().regex(timeRegex, { message: "invalid time format. Use HH:MM format." }),
});

export type TExamSchema = z.infer<typeof examSchemaValidator>;

export const QCMSchema = z.object({
  questions: z
      .array(
          z.object({
              qst_title: z.string().min(3, "Question announcement is required"),
              qst_image: z.string().default("").optional(),
              answers: z
                  .array(
                      z.object({
                          title: z.string().min(3, "Question is required"),
                          validite: z.boolean().default(false),
                      }),
                  )
                  .min(3, "At least 3 questions must be provided")
                  .refine((val) => {
                      return val.filter((item) => item.title).length > 0;
                  }, "At least one answer must be selected"),
          }),
      )
      .min(3, "At least 3 questions must be provided"),
});

export type TQCMForm = z.infer<typeof QCMSchema>;

export const GradesSchema = z.object({
  grade_items: z
    .array(
      z.object({
        minInterval:
        z.coerce
  .number()
  .min(0, "Minimum marks cannot be negative")
  .max(100, "Maximum marks cannot exceed 100"),
        
        maxInterval:        
         z.coerce
        .number()
        .min(0, "Minimum marks cannot be negative")
        .max(100, "Maximum marks cannot exceed 100"),
        grade: z.string().min(1, "grade is required"),
        note: z.string().min(5, "min 5 letters"),
        passed: z.boolean().default(false)
      }),
    )
    .min(3, "At least 3 grades must be provided")
});
export type TGradesForm = z.infer<typeof GradesSchema>;

/* 
End Zod Schema for Multi step form  

*/