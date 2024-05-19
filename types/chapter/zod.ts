import { z } from "zod";

export const ModuleOverviewSchema = z.object({
  name: z.string(),
  id: z.string().optional(),
  description: z.string().min(120, "description is required"),
  module_id: z.string(),
  chapter_number: z.number().optional(),
  createdAt: z.date().optional().default(new Date()),
  updatedAt: z.date().optional().default(new Date()),
  plan: z
    .array(
      z.object({
        value: z.string(),
      }),
    )
    .min(1, "Chapter must have at least one plan"),
});
export type TModuleOverviewSchema = z.infer<typeof ModuleOverviewSchema>;

export const SectionFormSchema = z.object({
  name: z.string(),
  id: z.string().optional(),
});
export type TSectionFormSchema = z.infer<typeof SectionFormSchema>;

// File Form
export const FileFormSchema = z.object({
  name: z.string(),
  id: z.string().optional(),
  section_id: z.string(),
  groups: z
    .array(
      z.object({
        label: z.string(),
        value: z.string().default(""),
        disabled: z.boolean().default(false).optional(),
      }),
    )
    .min(1, "Please Select at least one group "),
  teacher_id: z.number(),
});

export type TFileFormSchema = z.infer<typeof FileFormSchema>;
export type TFileFormSchemaWithFile = TFileFormSchema & {
  file: File | null;
};

export const ChapterSchema = z.object({
  name: z.string().min(5, "name is required"),
  id: z.string().optional(),
  description: z.string().min(80, "description is required"),
});
export type TChapterSchema = z.infer<typeof ChapterSchema>;

export const VideoSchema = z.object({
  name: z.string(),
  id: z.string().optional(),
  url: z.string().url("url is required"),
  chapter_id: z.string(),
});
