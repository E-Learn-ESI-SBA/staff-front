"use server";
import {
  CREATE_FILE_URL,
  CREATE_SECTION_URL,
  UPDATE_SECTION_URL,
} from "@/config/constants";
import {
  TFileFormSchema,
  TFileFormSchemaWithFile,
  TSectionFormSchema,
} from "@/types/chapter/zod";
import { cookies } from "next/headers";
import { IError } from "@/types/errors";

type ReturnType = {
  success: boolean;
  message: string;
};
