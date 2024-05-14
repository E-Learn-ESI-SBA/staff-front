"use server";
import {
  CREATE_FILE_URL,
  CREATE_SECTION_URL,
  GET_AUTH_USER_URL,
  UPDATE_SECTION_URL,
} from "@/config/constants";
import {
  TFileFormSchemaWithFile,
  TSectionFormSchema,
} from "@/types/chapter/zod";
import { cookies } from "next/headers";
import { TAuthSchema } from "@/components/auth/login";
import staffServiceAxiosClient from "@/utils/axiosClient";

type ReturnType = {
  success: boolean;
  message: string;
};
export const createSection = async (
  data: TSectionFormSchema,
): Promise<ReturnType> => {
  try {
    const response = await fetch(CREATE_SECTION_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${cookies().get("token")}`,
      },
      body: JSON.stringify(data),
    });
    const res = await response.json();
    return res;
  } catch (e: any & { message: string }) {
    console.log(e);
    return {
      success: false,
      message: e.message,
    };
  }
};

export const updateSection = async (data: TSectionFormSchema) => {
  try {
    const response = await fetch(UPDATE_SECTION_URL, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${cookies().get("token")}`,
      },
      body: JSON.stringify(data),
    });

    const res = await response.json();
    return res;
  } catch (e: any & { message: string }) {
    console.log(e);
    return {
      success: false,
      message: e.message,
    };
  }
};

export const createFile = async (data: TFileFormSchemaWithFile) => {
  try {
    const formData = new FormData();
    formData.append("file", data.file);
    formData.append("name", data.name);
    formData.append("section_id", data.section_id);
    const response = await fetch(CREATE_FILE_URL, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${cookies().get("token")}`,
      },
      body: formData,
    });
    const res = await response.json();
    return res;
  } catch (e: any & { message: string }) {
    console.log(e);
    return {
      success: false,
      message: e.message,
    };
  }
};

export const updateFile = async (data: TFileFormSchemaWithFile) => {
  try {
    const formData = new FormData();
    formData.append("file", data.file);
    formData.append("name", data.name);
    formData.append("section_id", data.section_id);
    const response = await fetch(CREATE_FILE_URL, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${cookies().get("token")}`,
      },
      body: formData,
    });
    const res = await response.json();
    return res;
  } catch (e: any & { message: string }) {
    console.log(e);
    return {
      success: false,
      message: e.message,
    };
  }
};

export interface StoreTokenRequest {
  access: string;
  refresh: string;
}

export async function storeToken(request: StoreTokenRequest) {
  "use server";
  console.log(request);
  cookies().set({
    name: "accessToken",
    value: request.access,
    httpOnly: true,
    sameSite: "strict",
    secure: true,
  });

  cookies().set({
    name: "refreshToken",
    value: request.refresh,
    httpOnly: true,
    sameSite: "strict",
    secure: true,
  });
}

export async function login(data: TAuthSchema) {
  "use server";
  try {
    const response = await staffServiceAxiosClient.post("auth/login/", data);
    await storeToken(response.data);
    return response.data;
  } catch (err) {
    console.log(err);
    throw new Error("couldn't login");
  }
}

export async function refreshTokens() {
  "use server";
  try {
    const refreshTokenCookie = cookies().get("refreshToken");
    const refreshToken = refreshTokenCookie?.value ?? "";
    const response = await fetch("http://localhost:8000/api/auth/refresh/", {
      method: "POST",
      body: JSON.stringify({ refresh: refreshToken }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    console.log("body" + data);
    if (response.ok) {
      console.log(data);
      cookies().set({
        name: "accessToken",
        value: data.access,
        httpOnly: true,
        sameSite: "strict",
        secure: true,
      });

      cookies().set({
        name: "refreshToken",
        value: data.refresh,
        httpOnly: true,
        sameSite: "strict",
        secure: true,
      });
      return { succes: true, data: data };
    }
    return { succes: false, data: null };
  } catch (error) {
    return { succes: false, data: null };
  }
}

export const getAuth = async (
  refreshAble?: boolean,
): Promise<{
  isAuth: boolean;
  data?: any;
}> => {
  try {
    const cookie = cookies();
    const token = cookie.get("accessToken")?.value;
    console.log("token" + token);
    if (!token)
      return {
        isAuth: false,
      };

    const auth = await refreshTokens();
    console.log("auth" + auth);
    console.log("hello");
    if (auth.succes) {
      return {
        isAuth: true,
        data: auth.data,
      };
    }
    return {
      isAuth: false,
    };
  } catch (e) {
    console.log("Error:", e);
    return {
      isAuth: false,
    };
  }
};

export const getAuthed = async () => {
  const res = await fetch(GET_AUTH_USER_URL);
  if (res.ok) {
    const data = await res.json();
    const token = data.token;
    if (!token) {
      return null;
    }
    // Push the token in the access token cookie
    const cookie = cookies();
    cookie.set("accessToken", token, {
      maxAge: 60 * 60 * 24 * 7,
    });
  }
};
