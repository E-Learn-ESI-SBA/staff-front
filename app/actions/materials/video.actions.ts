"use server";
import { TVideoSchema } from "@/types/chapter/zod";
import {
  CREATE_VIDEO_URL,
  UPDATE_VIDEO_URL,
} from "@/config/urls/material/mutations";
import { cookies } from "next/headers";
import { IError } from "@/types/errors";
import { IMessage, IResponse } from "@/types/http";
export const createVideo = async (
  data: TVideoSchema,
  file: File | null,
): Promise<IResponse<IMessage>> => {
  try {
    const formData = new FormData();
    const blob = new Blob([file as BlobPart], {
      type: file?.type,
    });
    formData.append("video", blob);
    formData.append("name", data.name);
    formData.append("groups", JSON.stringify(data.groups.map((g) => g.value)));
    const response = await fetch(
      `${CREATE_VIDEO_URL}?sectionId=${data.section_id}`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${cookies().get("accessToken")}`,
        },
        body: formData,
      },
    );
    const res = (await response.json()) as IMessage;
    if (!response.ok || response.status != 201) {
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

export const updateVideo = async (
  data: TVideoSchema,
  file: File | null,
): Promise<IResponse<IMessage>> => {
  try {
    const body = {
      name: data.name,
      groups: data.groups.map((g) => g.value),
    };
    const response = await fetch(
      `${UPDATE_VIDEO_URL}?sectionId=${data.section_id}`,
      {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${cookies().get("accessToken")}`,
        },
        body: JSON.stringify(body),
      },
    );
    const res = await response.json();
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
  } catch (e) {
    console.log(e);
    return {
      status: 500,
      error: new IError(e),
      data: { message: "" },
    };
  }
};
