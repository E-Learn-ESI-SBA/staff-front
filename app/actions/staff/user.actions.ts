import { GET_GROUPS, GET_TEACHERS } from "@/config/urls/staff/queries";
import { cookies } from "next/headers";
import { IResponse } from "@/types/http";
import { IError } from "@/types/errors";

type Users = {
  id: string;
  email: string;
};
export const getUsers = async (): Promise<IResponse<Users[]>> => {
  try {
    const response = await fetch(GET_TEACHERS, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${cookies().get("accessToken")?.value}`,
      },
    });
    const res = (await response.json()) as Users[];
    return {
      status: response.status,
      data: res,
      error: null,
    };
  } catch (e) {
    return {
      status: 500,
      error: new IError(e),
      data: [],
    };
  }
};
type Groups = {
  groups: string[];
};
export const getGroups = async (year: string): Promise<IResponse<Groups>> => {
  try {
    const response = await fetch(`${GET_GROUPS}?year=${year}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${cookies().get("accessToken")?.value}`,
      },
    });
    const res = (await response.json()) as Groups;
    return {
      status: response.status,
      data: res,
      error: null,
    };
  } catch (e) {
    return {
      status: 500,
      error: new IError(e),
      data: { groups: [] },
    };
  }
};