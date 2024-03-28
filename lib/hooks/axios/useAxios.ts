'use client';
import axios from "axios";
import { decodeJwt } from "@/lib/utils";
import { useUserStore } from "@/store/user";
import { useRouter } from "next/navigation";


const BASE_URL = "http://localhost:8080/";



const useAxios = () => {
    const router = useRouter();
    const access = useUserStore((state) => state.access);
    const refresh = useUserStore((state) => state.refresh);

    let authTokens = {
        access: access,
        refresh: refresh,
    };

    const setUser = useUserStore((state) => state.setUser);
    const setAuth = useUserStore((state) => state.setAuth);
    const setAccess = useUserStore((state) => state.setAccess);
    const setRefresh = useUserStore((state) => state.setRefresh);

    const axiosInstance = axios.create({
        baseURL: BASE_URL,
        headers: {
            "Content-Type": "application/json",
        },
    });

    axiosInstance.interceptors.request.use( async (req) => {

        if (authTokens.access) {
            const { payload } = decodeJwt(authTokens.access);
            // check if the access token's expiration is below 60 seconds from now
            if (payload.exp - (Date.now() / 1000) < 60 ) {
                const res = await axios.post(`${BASE_URL}api/token/refresh/`, {
                    refresh: authTokens.refresh
                });
            
                const data = await res.data;
                if (res.status === 200) {
                    authTokens.access = data.access;
                    setAccess(data.access);
                    setRefresh(data.refresh);
                    const { payload } = decodeJwt(data.access);
                    setUser({
                        email: payload.email,
                    })
                    req.headers.Authorization = `Bearer ${authTokens.access}`;
                    return req;
                } else {
                    setAccess(null);
                    setRefresh(null);
                    setUser(null);
                    setAuth(false);
                    router.replace("/auth");
                }
            }
            req.headers.Authorization = `Bearer ${authTokens.access}`;
        }
        
        
        return req;
    })
    

    return axiosInstance;
}
 
export default useAxios;