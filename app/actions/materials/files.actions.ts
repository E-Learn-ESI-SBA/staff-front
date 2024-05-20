"use server";
import { TFileFormSchemaWithFile } from "@/types/chapter/zod";
import {
  CREATE_FILE_URL,
  UPDATE_FILE_URL,
} from "@/config/urls/material/mutations";
import { cookies } from "next/headers";
import { IError } from "@/types/errors";
import { IMessage, IResponse } from "@/types/http";
export const createFile = async (
  data: TFileFormSchemaWithFile,
): Promise<IResponse<IMessage>> => {
  try {
    const formData = new FormData();
    const blob = new Blob([data.file as BlobPart], {
      type: data.file?.type,
    });
    formData.append("file", blob);
    formData.append("name", data.name);
    //  formData.append("section_id", data.section_id);
    formData.append("groups", JSON.stringify(data.groups.map((g) => g.value)));
    const response = await fetch(
      `${CREATE_FILE_URL}?sectionId=${data.section_id}`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${cookies().get("accessToken")}`,
        },
        body: formData,
      },
    );
    const res = await response.json();
    if (response.status != 201 || !response.ok) {
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
    const message = (e as IError).message;

    console.log(e);
    return {
      status: 500,
      error: new IError(e),
      data: { message: "" },
    };
  }
};

export const updateFile = async (
  data: TFileFormSchemaWithFile,
): Promise<IResponse<IMessage>> => {
  try {
    const body = {
      name: data.name,
      groups: data.groups.map((g) => g.value),
    };

    const response = await fetch(
      `${UPDATE_FILE_URL}?sectionId=${data.section_id}`,
      {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${cookies().get("accessToken")}`,
        },
        body: JSON.stringify(body),
      },
    );
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
