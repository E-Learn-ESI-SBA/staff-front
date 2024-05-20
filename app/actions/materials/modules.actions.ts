"use server";

import { cookies } from "next/headers";
import { GET_ALL_MODULES_URL } from "@/config/urls/material/mutations";
import { Module } from "@/types/chapter/courses";
import { IResponse} from "@/types/http";
import { IError } from "@/types/errors";

export const useGetTeacherModules = async (): Promise<IResponse<Module[]>> => {
  try {
    const response = await fetch(GET_ALL_MODULES_URL, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${cookies().get("accessToken")?.value}`,
      },
    });

    const res = await response.json() as {data? : Module[], message?:string }
    if (response.status != 200) {
      return {
        status:response.status,
        data:[],
        error:new IError({message:res.message ?? "Error While Getting modules"})
      }

    }
    if (res.data) {
    return {
      status: response.status,
      data: res.data,
      error: null,
    };
    }
    return {
      data:[],
      error:new IError(),
      status:response.status
    }
  } catch (e) {
    const err = new IError(e);
    return {
      status: 500,
      error: err,
      data: [],
    };
  }
};
