"use server";
import { TSectionFormSchema } from "@/types/chapter/zod";
import {
  CREATE_SECTION_URL,
  UPDATE_SECTION_URL,
} from "@/config/urls/material/mutations";
import { cookies } from "next/headers";
import { IError } from "@/types/errors";
import { IMessage, IResponse } from "@/types/http";

export const createSection = async (
  data: TSectionFormSchema,
): Promise<IResponse<IMessage>> => {
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
    if (!response.ok || response.status !== 201) {
      return {
        status: response.status,
        data: { message: "" },
        error: new IError({ message: res.message }),
      };
    }
    return {
      status: response.status,
      data: res,
      error: null,
    };
  } catch (e) {
    console.log(e);
    return {
      status: 500,
      error: new IError(e),
      data: { message: "" },
    };
  }
};

export const updateSection = async (
  data: TSectionFormSchema,
): Promise<IResponse<IMessage>> => {
  try {
    const response = await fetch(UPDATE_SECTION_URL, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${cookies().get("accessToken")}`,
      },
      body: JSON.stringify(data),
    });
    const res = (await response.json()) as IMessage;
    if (!response.ok) {
      return {
        status: response.status,
        data: { message: "" },
        error: new IError({ message: res.message }),
      };
    }
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
      data: { message: "" },
    };
  }
};
