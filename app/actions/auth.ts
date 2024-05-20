"use server";
import { TPayload } from "@/types";
import { jwtVerify } from "jose";
import { cookies } from "next/headers";
import {cache} from "react";

export const getAuth =cache(async (
  refreshAble?: boolean,
): Promise<{
  isAuth: boolean;
  payload: TPayload | null;
}> => {
  try {
    const cookie = cookies();
    const token = cookie.get("accessToken")?.value;
    if (!token)
      return {
        isAuth: false,
        payload: null,
      };
    const body = token.split(".")[1];
    const payload = JSON.parse(atob(body)) as TPayload;

    const strPayload = JSON.stringify(payload);
    cookies().set("payload", strPayload, {
      httpOnly: true,
      sameSite: "strict",
      secure: true,
    });
    return {
      isAuth: true,
      payload: payload,
    };
  } catch (e) {
    console.log("Error:", e);
    return {
      isAuth: false,
      payload: null,
    };
  }
});
