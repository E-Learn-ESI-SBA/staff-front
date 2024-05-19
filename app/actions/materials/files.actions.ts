"use server";
import { TFileFormSchemaWithFile } from "@/types/chapter/zod";
import { CREATE_FILE_URL } from "@/config/urls/material/mutations";
import { cookies } from "next/headers";
import { IError } from "@/types/errors";
import { IResponse } from "@/types/http";
export const createFile = async (
  data: TFileFormSchemaWithFile,
): Promise<IResponse<Object>> => {
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
      data: {},
    };
  }
};

export const updateFile = async (data: TFileFormSchemaWithFile) => {
  try {
    const formData = new FormData();
    // append the file
    // make the file as blob
    const blob = new Blob([data.file as BlobPart], {
      type: data.file?.type,
    });
    formData.append("file", blob);
    formData.append("name", data.name);
    formData.append("section_id", data.section_id);
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
