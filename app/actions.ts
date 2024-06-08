"use server";
import {
  ASSIGNMENT_BASE_URL,
  STAFF_BASE_URL,
} from "@/config/constants";
import {

  TSectionFormSchema,
} from "@/types/chapter/zod";
import { cookies } from "next/headers";
import { TAuthSchema } from "@/components/auth/login";
import { Assignment, TPayload } from "@/types";
import { CREATE_SECTION_URL, UPDATE_SECTION_URL } from "@/config/urls/material/mutations";
import { GET_AUTH_USER_URL } from "@/config/urls/staff/queries";

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
        Authorization: `Bearer ${cookies().get("accessToken")}`,
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
        Authorization: `Bearer ${cookies().get("accessToken")}`,
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

export interface StoreTokenRequest {
  access: string;
  refresh: string;
}

export async function storeToken(request: StoreTokenRequest) {
  "use server";
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
    const res = await fetch(STAFF_BASE_URL + "/auth/login/", {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const response: StoreTokenRequest = await res.json();
    if (!response.access) {
      throw new Error("Invalid email or password");
    }
    await storeToken(response);
    return response;
  } catch (err) {
    console.log(err);
    throw new Error("Something Went Wrong");
  }
}

export async function logout(): Promise<Boolean> {
  "use server"
  try {
    cookies().delete("accessToken");
    cookies().delete("refreshToken");
    cookies().delete("csrftoken");
    return true;
  } catch (e) {
    return false;
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

// export const getAuth = async (
//   refreshAble?: boolean,
// ): Promise<{
//   isAuth: boolean;
//   data?: any;
// }> => {
//   try {
//     const cookie = cookies();
//     const token = cookie.get("accessToken")?.value;
//     console.log("token" + token);
//     if (!token)
//       return {
//         isAuth: false,
//       };

//     const auth = await refreshTokens();
//     console.log("auth" + auth);
//     console.log("hello");
//     if (auth.succes) {
//       return {
//         isAuth: true,
//         data: auth.data,
//       };
//     }
//     return {
//       isAuth: false,
//     };
//   } catch (e) {
//     console.log("Error:", e);
//     return {
//       isAuth: false,
//     };
//   }
// };

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

// start auth service

export const sendOTP = async (email: string) => {
  try {
    const res = await fetch(`${STAFF_BASE_URL}/auth/send-otp/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email }),
    });
    const response = await res.json();
    return true;
  } catch (error) {
    return false;
  }
};

export const resetPassword = async (
  email: string,
  code: string,
  password: string,
) => {
  try {
    const res = await fetch(`${STAFF_BASE_URL}/auth/reset-password/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, code, password }),
    });

    if (res.status != 202) {
      return false;
    }
    return true;
  } catch (error) {
    return false;
  }
};

export const getAuth = async (
  refreshAble?: boolean,
): Promise<{
  isAuth: boolean;
  payload: TPayload | null;
}> => {
  "use server";
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
    // cookies().set("payload", strPayload, {
    //   httpOnly: true,
    //   sameSite: "strict",
    //   secure: true,
    // });
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
};

// end auth service




export const getAssignmentsWithSoonestDeadlines = async () => {
  try {
    const res = await fetch(`${ASSIGNMENT_BASE_URL}/assignments`, {
      headers: {
        Authorization: `Bearer ${cookies().get("accessToken")?.value}`,
      },
    });
    const response = await res.json();

    if (!response.message) {
      return []
    }
    const sortedAssignments = response.message.sort((a: { deadline: string }, b: { deadline: string }) => {
      const deadlineA: number = new Date(a.deadline).getTime();
      const deadlineB: number = new Date(b.deadline).getTime();
      return deadlineA - deadlineB;
    });

    const numAssignments = sortedAssignments.length;
    let assignmentsA = [];

    if (numAssignments <= 2) {
      assignmentsA = sortedAssignments;
    } else {
      assignmentsA = sortedAssignments.slice(0, 3);
    }
    let assignments: [string, string][] = response.map((assignment: Assignment) => ({
      title: assignment.title,
      deadline: assignment.deadline,
    }));
    return assignments
  } catch (error) {
    throw new Error("Failed to fetch assignments");
  }
};


export const getLeaderBoard = async () => {
  try {
    const res = await fetch(`${STAFF_BASE_URL}/evaluations/leaderboard`, {
      headers: {
        Authorization: `Bearer ${cookies().get("accessToken")?.value}`,
      },
    })
    const response = await res.json()
    if (!res.ok) {
      throw new Error("Something went wrong")
    }
    return response?.data
  }
  catch (err: any) {
    throw new Error("Something went wrong")
  }
}

export const getProfile = async () => {
  try {
    const token = cookies().get("accessToken")?.value;
    const body = token?.split(".")[1];
    const payload = JSON.parse(atob(body!)) as TPayload;
    const url = payload.role == "student" ? `${STAFF_BASE_URL}/students/${payload.id}` : `${STAFF_BASE_URL}/teachers/${payload.id}`
    const res = await fetch(url,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        }
      }
    );
    const response = res.json()
    if (!res.ok) {
      throw new Error("Something went wrong")
    }
    return response
  } catch (err: any) {
    throw new Error("Something went wrong")
  }
}