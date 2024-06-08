"use server";
import { cookies } from "next/headers";
import {
    GET_MODULE_DETAILS_URL,
    GET_MODULE_OVERVIEW_URL,
    GET_TEACHER_MODULES_URL
} from "@/config/urls/material/mutations";
import { Module } from "@/types/chapter/courses";
import { IResponse } from "@/types/http";
import { IError } from "@/types/errors";

export const useGetTeacherModules = async (): Promise<IResponse<Module[]>> => {
  try {
    const response = await fetch(GET_TEACHER_MODULES_URL, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${cookies().get("accessToken")?.value}`,
      },
    });
    const res = (await response.json()) as {
      data?: Module[];
      message?: string;
    };
    if (!response.ok) {
      return {
        status: response.status,
        data: [],
        error: new IError({
          message: res.message ?? "Error While Getting modules",
        }),
      };
    }
    if (res.data) {
      return {
        status: response.status,
        data: res.data,
        error: null,
      };
    }
    return {
      data: [],
      error: new IError(),
      status: response.status,
    };
  } catch (e) {
    console.log("error", e);
    const err = new IError(e);
    return {
      status: 500,
      error: err,
      data: [],
    };
  }
};


export const useGetModuleOverview = async (id: string): Promise<IResponse<Module>> => {
    try {
        const response = await fetch(GET_MODULE_OVERVIEW_URL.concat(`/${id}`), {
        method: "GET",
        headers: {
            Authorization: `Bearer ${cookies().get("accessToken")?.value}`,
        },
        });
        const res = (await response.json()) as {
        data?: Module;
        message?: string;
        };
        if (!response.ok) {
        return {
            status: response.status,
            data: {} as Module,
            error: new IError({
            message: res.message ?? "Error While Getting modules",
            }),
        };
        }
        if (res.data) {
        return {
            status: response.status,
            data: res.data,
            error: null,
        };
        }
        return {
        data: {} as Module,
        error: new IError(),
        status: response.status,
        };
    } catch (e) {
        console.log("error", e);
        const err = new IError(e);
        return {
        status: 500,
        error: err,
        data: {} as Module,
        };
    }
}
export const useGetModuleDetails = async (id: string): Promise<IResponse<Module>> => {
    try {
        const response = await fetch(GET_MODULE_DETAILS_URL.concat(`/${id}`), {
        method: "GET",
        headers: {
            Authorization: `Bearer ${cookies().get("accessToken")?.value}`,
        },
        });
        const res = (await response.json()) as {
        data?: Module;
        message?: string;
        };
        console.log(res)
        if (!response.ok) {

        return {
            status: response.status,
            data: {} as Module,
            error: new IError({
            message: res.message ?? "Error While Getting modules",
            }),
        };
        }
        if (res.data) {
        return {
            status: response.status,
            data: res.data,
            error: null,
        };
        }
        return {
        data: {} as Module,
        error: new IError(),
        status: response.status,
        };
    } catch (e) {
        console.log("error", e);
        const err = new IError(e);
        return {
        status: 500,
        error: err,
        data: {} as Module,
        };
    }
}