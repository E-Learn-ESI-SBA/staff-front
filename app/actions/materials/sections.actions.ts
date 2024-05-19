"use server";
import { TSectionFormSchema } from "@/types/chapter/zod";
import {
  CREATE_SECTION_URL,
  UPDATE_SECTION_URL,
} from "@/config/urls/material/mutations";
import { cookies } from "next/headers";
import { IError } from "@/types/errors";
import { IResponse } from "@/types/http";

export const createSection = async (
  data: TSectionFormSchema,
): Promise<IResponse<string>> => {
  try {
    const response = await fetch(CREATE_SECTION_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${cookies().get("accessToken")?.value}`,
      },
      body: JSON.stringify(data),
    });
    const res = await response.json();
    return {
      status: response.status,
      data: res,
      error: null,
    };
  } catch (e) {
    const message = (e as IError).message;
    console.log(e);
    return {
      status: 500,
      error: new IError(e),
      data: "",
    };
  }
};

export const updateSection = async (
  data: TSectionFormSchema,
): Promise<IResponse<string>> => {
  try {
    const response = await fetch(UPDATE_SECTION_URL, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${cookies().get("accessToken")}`,
      },
      body: JSON.stringify(data),
    });

    const res = await response.json();
    return {
      status: response.status,
      data: res,
      error: null,
    };
  } catch (e: unknown) {
    const err = new IError(e);
    return {
      status: 500,
      error: err,
      data: "",
    };
  }
};
