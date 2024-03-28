import { toast } from "@/components/ui/use-toast";
import { useUserStore } from "@/store/user";
import { decodeJwt } from "@/lib/utils";
import useAxios from "../axios/useAxios";
import { useRouter } from "next/navigation";




const useAuth = () => {
    const router = useRouter();
    const setUser = useUserStore((state) => state.setUser);
    const setAuth = useUserStore((state) => state.setAuth);
    const setAccess = useUserStore((state) => state.setAccess);
    const setRefresh = useUserStore((state) => state.setRefresh);
    const axiosInstance = useAxios();

    const loginHandler = async (email: string, password: string) => {
 
        const res = await axiosInstance.post("api/token/", {
            email,
            password,
        });

        const data = await res.data;

        if (res.status === 200) {
            setAccess(data.access);
            setRefresh(data.refresh);

            const { payload } = decodeJwt(data.access);
            setUser({
                email: payload.email,
            });
            setAuth(true);

            setTimeout(() => {
                router.replace("/");
            }, 3000);
        } else {
            console.log({
                error: data.detail,
            })
        }
    }


    const logoutHandler = () => {
        setAccess(null);
        setRefresh(null);
        setUser(null);
        setAuth(false);
        router.replace("/auth");
    }


    return {
        loginHandler,
        logoutHandler,
    }
}


export default useAuth;