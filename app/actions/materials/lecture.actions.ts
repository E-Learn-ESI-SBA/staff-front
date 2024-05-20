"use server";

import { TLectureSchema } from "@/types/chapter/zod";
import { IMessage, IResponse } from "@/types/http";
import { UPDATE_LECTURE_URL } from "@/config/urls/material/mutations";
import { cookies } from "next/headers";
import { IError } from "@/types/errors";

export const updateLecture = async (
  data: TLectureSchema,
): Promise<IResponse<IMessage>> => {
  try {
    const body = {
      name: data.name,
      groups: data.groups.map((g) => g.value),
    };

    const response = await fetch(`${UPDATE_LECTURE_URL}/${data.id}`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${cookies().get("accessToken")}`,
      },
      body: JSON.stringify(body),
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
      data: { message: "" },
    };
  }
};
