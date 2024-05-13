"use server";
import { STAFF_SERVICE_URL } from "@/config/constants";
import { decodeJwt } from "@/lib/utils";
import axios, { HeadersDefaults, AxiosRequestHeaders } from "axios";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const staffServiceAxiosClient = axios.create({
  withCredentials: true,
  baseURL: STAFF_SERVICE_URL,
});

staffServiceAxiosClient.defaults.headers = Object.assign(
  {},
  staffServiceAxiosClient.defaults.headers,
  {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
);

// staffServiceAxiosClient.interceptors.request.use(async (req) => {
//     const accessToken = cookies().get('accessToken')?.value;
//     const refreshToken = cookies().get('refreshToken')?.value;
// 	if (accessToken) {
// 		const { payload } = decodeJwt(accessToken);
// 		// check if the access token's expiration is below 60 seconds from now
// 		if (payload.exp - Date.now() / 1000 < 60) {
// 			const res = await staffServiceAxiosClient.post(`auth/refresh/`, {
// 				refresh: refreshToken,
// 			});

// 			const data = await res.data;
// 			if (res.status === 200) {
//                 cookies().set({
//                     name: "accessToken",
//                     value: data.access,
//                     httpOnly: true,
//                     sameSite: "strict",
//                     secure: true,
//                 })
//                 cookies().set({
//                     name: "refreshToken",
//                     value: data.refresh,
//                     httpOnly: true,
//                     sameSite: "strict",
//                     secure: true,
//                 })

// 				req.headers.Authorization = `Bearer ${data.access}`;
// 				return req;
// 			} else {
//                 // @ts-ignore
// 				cookies.delete('accessToken')
//                 // @ts-ignore
//                 cookies.delete('refreshToken')
//                 redirect('/auth/login')
// 			}
// 		}
// 		req.headers.Authorization = `Bearer ${accessToken}`;
// 	}

// 	return req;
// });

export default staffServiceAxiosClient;
