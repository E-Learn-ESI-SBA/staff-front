import { z } from "zod";
export const SectionFormSchema = z.object({
  name: z.string(),
  id: z.string().optional(),
});
export type TSectionFormSchema = z.infer<typeof SectionFormSchema>;

// File Form
export const FileFormSchema = z.object({
  name: z.string(),
  id: z.string().optional(),
  section_id: z.string().optional(),
  groups: z
    .array(
      z.object({
        label: z.string(),
        value: z.string().default(""),
        disabled: z.boolean().default(false).optional(),
      }),
    )
    .min(1, "Please Select at least one group "),
});

export type TFileFormSchema = z.infer<typeof FileFormSchema>;
export type TFileFormSchemaWithFile = TFileFormSchema & {
  file: File | null;
};

export const ChapterSchema = z.object({
  name: z.string().min(5, "name is required"),
  id: z.string().optional(),
  description: z.string().min(30, "description is required"),
});
export type TChapterSchema = z.infer<typeof ChapterSchema>;

export const VideoSchema = z.object({
  name: z.string().min(5, "name is required"),
  id: z.string().optional(),
  groups: z
    .array(
      z.object({
        label: z.string(),
        value: z.string().default(""),
        disabled: z.boolean().default(false).optional(),
      }),
    )
    .min(1, "Please Select at least one group "),
  url: z.string().optional().default(""),
  section_id: z.string().optional(),
});

export type TVideoSchema = z.infer<typeof VideoSchema>;

export const LectureSchema = z.object({
  id: z.string().optional(),
  sectionId: z.string().optional(),
  groups: z
    .array(
      z.object({
        label: z.string(),
        value: z.string().default(""),
        disabled: z.boolean().default(false).optional(),
      }),
    )
    .min(1, "Please Select at least one group "),
  name: z.string().min(5, "title is required"),
});
export type TLectureSchema = z.infer<typeof LectureSchema>;
