"use server";
import { TSectionFormSchema } from "@/types/chapter/zod";
import {
  CREATE_SECTION_URL,
  UPDATE_COMMENT_URL,
} from "@/config/urls/material/mutations";
import { cookies } from "next/headers";
import { IError } from "@/types/errors";
import { IMessage, IResponse } from "@/types/http";
import { TCommentForm } from "@/types/chapter/comments";

export const createComment = async (
  data: TCommentForm,
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
    if (response.status !== 201) {
      return {
        status: response.status,
        data: { message: res.message },
        error: new IError({ message: res.message }),
      };
    }
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
      data: { message: "" },
    };
  }
};

export const updateComment = async (
  data: TCommentForm,
): Promise<IResponse<IMessage>> => {
  try {
    const response = await fetch(UPDATE_COMMENT_URL, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${cookies().get("accessToken")}`,
      },
      body: JSON.stringify(data),
    });

    const res = await response.json();
    if (response.status !== 200) {
      return {
        status: response.status,
        data: { message: res.message },
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
