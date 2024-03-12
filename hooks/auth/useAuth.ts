import { toast } from "../../@/components/ui/use-toast";
import { useUserStore } from "../../store/user";
import { decodeJwt } from "../../lib/utils/jwt";
import { RedirectType } from "next/navigation";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";





const useAuth = (redirect: (url: string, type?: RedirectType) => never) => {
    const setUser = useUserStore((state) => state.setUser);
    const setAuth = useUserStore((state) => state.setAuth);

    const loginHandler = async (email: string, password: string) => {
        const res = await fetch("http://localhost:8080/api/token/", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                email,
                password
            })
        });

        const data = await res.json();

        if (res.ok) {
            localStorage.setItem("token", data.access);
            localStorage.setItem("refresh", data.refresh);

            toast({
                color:  "success",
                description: "Successfully logged in",
            });
            const { payload } = decodeJwt(data.access);
            setUser({
                email: payload.email,
            });
            setAuth(true);

            setTimeout(() => {
                redirect("/");
            }, 3000);
        } else {
            toast({
                color: "error",
                description: data.detail,
            });
        }
    }


    const logoutHandler = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("refresh");
        setUser(null);
        setAuth(false);
        redirect("/auth");
    }


    return {
        loginHandler,
        logoutHandler,
    }
}


export default useAuth;