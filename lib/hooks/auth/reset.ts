import { toast } from "@/components/ui/use-toast";
import { AuthOption } from "@/components/auth/auth";
import useAxios from "../axios/useAxios";


const useResetPassword = () => {
    const axiosInstance = useAxios();
    const resetPassword = async (email: string, setSelectedAuth: (value: AuthOption) => void) => {
        try {
            
            const response = await axiosInstance.post("api/send-otp/", {
                email
            });

            const data = await response.data;


            if (response.status == 202) {
                toast({
                    color: "success",
                    description: data.message,
                });
                setSelectedAuth('SUBMIT_NEW_PASSWORD');
            } else {
                toast({
                    color: "error",
                    description: data.error,
                });
            }
        } catch (error) {
            console.log({error})
            toast({
                color: "error",
                description: "An error occurred. Please try again.",
            });
        }
    };

    const submitOTP = async (email: string, code: string, password: string) => {
        try {
            const response = await axiosInstance.post("api/reset-password/", {
                email, code, password
            });

            const data = await response.data;

            if (response.status == 202) {
               console.log({message: data.message})
               return {
                    success: true,
               }
            } else {
                console.log({error: data.error})
                return {
                    success: false,
                }
            }
        } catch (error) {
            console.log({error})
            return {
                success: false,
            }
        }
    }

    return {
        resetPassword,
        submitOTP
    };
}
 
export default useResetPassword;