"use server";
import { IMessage, IResponse } from "@/types/http";
import { CREATE_CHAPTER_URL } from "@/config/urls/material/mutations";
import { TChapterSchema } from "@/types/chapter/zod";
import { cookies } from "next/headers";
import { IError } from "@/types/errors";

export const createChapter = async (
  data: TChapterSchema,
): Promise<IResponse<IMessage>> => {
  try {
    const response = await fetch(CREATE_CHAPTER_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${cookies().get("accessToken")?.value}`,
      },
      body: JSON.stringify(data),
    });
    const res = (await response.json()) as IMessage;
    if (response.status !== 201 || !response.ok) {
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
export const updateChapter = async (
  data: TChapterSchema,
): Promise<IResponse<object>> => {
  try {
    const response = await fetch(CREATE_CHAPTER_URL, {
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
  } catch (e) {
    console.log(e);
    return {
      status: 500,
      error: new IError(e),
      data: {},
    };
  }
};
export const deleteChapter = async (id: string): Promise<IResponse<object>> => {
  try {
    const response = await fetch(`${CREATE_CHAPTER_URL}/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${cookies().get("accessToken")}`,
      },
    });
    const res = await response.json();
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
      data: {},
    };
  }
};
