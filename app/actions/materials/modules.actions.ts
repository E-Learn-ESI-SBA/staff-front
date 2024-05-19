"use server";

import { cookies } from "next/headers";
import { GET_ALL_MODULES_URL } from "@/config/urls/material/queries";
import { Module } from "@/types/chapter/courses";
import { IResponse } from "@/types/http";
import { IError } from "@/types/errors";

export const useGetTeacherModules = async (): Promise<IResponse<Module[]>> => {
  try {
    const response = await fetch(GET_ALL_MODULES_URL, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${cookies().get("accessToken")?.value}`,
      },
    });

    const { data, error } = (await response.json()) as {
      data: Module[];
      error: string;
    };
    if (error) {
      return {
        status: response.status,
        data: [],
        error: new IError(error),
      };
    }
    4;
    return {
      status: response.status,
      data: data,
      error: null,
    };
  } catch (e) {
    const err = new IError(e);
    return {
      status: 500,
      error: err,
      data: [],
    };
  }
};
