"use server";
import { TPayload } from "@/types";
import { jwtVerify } from "jose";
import { cookies } from "next/headers";
import { cache } from "react";

export const getAuth = cache(
  async (
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
      const jwtKey =
        process.env.JWT_SECRET ??
        "aTZ6czFOcTFHekRrZEJHUTB5cFlZZ0M1aXQyR3FiNlltaWx5aDJFUWpIQT0K";
      const claim = await jwtVerify<TPayload>(
        token,
        new TextEncoder().encode(jwtKey),
      );
      const strPayload = JSON.stringify(claim.payload);
      cookies().set("payload", strPayload, {
        httpOnly: true,
        sameSite: "strict",
        secure: true,
      });
      return {
        isAuth: true,
        payload: claim.payload,
      };
    } catch (e) {
      console.log("Error:", e);
      return {
        isAuth: false,
        payload: null,
      };
    }
  },
);